import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";
import {buildCssLoader} from './loaders/buildCssLoader';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  // порядок важен
  const { isDev } = options;

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const babelLoader = {
    test: /.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            "i18next-extract",
            {
              locales: ['ru', 'en'],
              // не тока вытаскивать ключи, но и автоматом в качестве знач.
              // вставлять ключ
              keyAsDefaultValue: true,
            }
          ],
        ]
      }
    }
  }

  const cssLoader = buildCssLoader(isDev);

  // если не исп. ts, то нужен babel-loader
  // новый стандарт жса, в старый (чтобы браузеры перегонялись)
  // {"presets": ["@babel/preset-react"]}
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/, // исключ. нод модули
  };

  const fileLoader = {
    // + woff2, woff
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ]
  }

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    cssLoader,
  ]
}