import { BuildOptions } from '../types/config';
import babelRemovePlugin from '../../babel/babelRemovePropsPlugin';

interface BuildBabelLoaderProps extends BuildOptions {
  // чтобы могли отдел. работать с ткс файлами
  isTsx?: boolean;
}

// [1) сам плагин, 2) опции]
export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  return {
    test: isTsx ? /.(jsx|tsx)$/ : /.(js|ts)$/,
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
          [
            "@babel/plugin-transform-typescript",
            {
              isTsx, // отвечает за парсинг jsx
            }
          ],
          "@babel/plugin-transform-runtime",
          // для тс файлов нет смысла, тока увел. время сборки
          isTsx && [
            babelRemovePlugin,
            {
              props: ['data-testid']
            },
          ],
          // фильтруем если там фалс, + бабел для реактревреша
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      }
    }
  }
}