import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, WebpackPluginInstance } from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import CopyPlugin from "copy-webpack-plugin";
import CircularDependencyPlugin from 'circular-dependency-plugin';

export function buildPlugins({ paths, isDev, apiUrl, project }: BuildOptions): WebpackPluginInstance[] {
  // порядок не важен

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    // создает css для каждого жс, который трбует css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // можно прокидывать глоб. перем.
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      // чтобы не было лишниз запросов в сторибуке
      __PROJECT__: JSON.stringify(project),
    }),
    new CopyPlugin({
      patterns: [
        // откуда -> куда
        { from: paths.locales, to: paths.buildLocales },
      ],
    }),
    new CircularDependencyPlugin({
      exclude: /node.modules/, // регулярка - без кавычек
      failOnError: true, // при обноруж кольц. завис. - ошибка в консоли
    })
  ];

  if (isDev) {
    // обнолвяет автоматом, некоторые вещи не может обнов.
    plugins.push(new ReactRefreshWebpackPlugin())
    // бесконечно крутится actions:
    plugins.push(new HotModuleReplacementPlugin());

    plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
      // чтобы автоматом. не открывалась, в терминале
      // будет сс
      openAnalyzer: false,
    }));
  }

  return plugins;
}