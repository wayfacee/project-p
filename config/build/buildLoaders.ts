import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  // порядок важен
  const { isDev } = options;

  const svgLoader = {
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        // заменяет width / height каким-то кастом value
        icon: true,

        // convert colors:
        // заменяет цвета в файлах, на каррент колор
        svgoConfig:{
          plugins: [{
            name: 'convertColors',
            params: {
              currentColor: true,
            }
          }]
        }
      }
    }],
  }

  const codebabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodebabelLoader = buildBabelLoader({ ...options, isTsx: true });

  const cssLoader = buildCssLoader(isDev);

  // если не исп. ts, то нужен babel-loader
  // новый стандарт жса, в старый (чтобы браузеры перегонялись)
  // {"presets": ["@babel/preset-react"]}
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/, // исключ. нод модули
  // };

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
    codebabelLoader,
    tsxCodebabelLoader,
    // typescriptLoader,
    cssLoader,
  ]
}