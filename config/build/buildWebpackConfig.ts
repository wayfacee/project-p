import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { paths, mode, isDev } = options;
  return {
    mode,

    // старт точка прилож:
    // dirname - корень
    // нескока точек: {RANDOM:  path.resolve(__dirname, 'src', 'index.js ')}
    entry: paths.entry,

    // куда и как сборка наш. прилож.
    output: {
      // dinamic name:
      filename: '[name].js',
      // dist or build
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      // loader - предназнач. для того чтобы обрабат файлы
      // которые выходят за рамки жс (ts, svg, png, scss, etc.)
      rules: buildLoaders(options),
    },
    // import Component from './Component
    resolve: buildResolvers(options),
    // где произошла ошибка (source-map)
    devtool: isDev ? 'inline-source-map' : undefined,
    // не будет запуск. дев сервер:
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}