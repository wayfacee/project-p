import { BuildOptions } from '../types/config';

export function buildBabelLoader({ isDev }: BuildOptions) {
  return {
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
          // фильтруем если там фалс, + бабел для реактревреша
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      }
    }
  }
}