import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    // автоматом. открывать стр. с прилож.
    open: {
      app: {
        name: 'chrome',
      }
    },
    
    // при обновлении ошибка:
    // проксировать запрос через индекс page, через корневую стр.
    // тк мы разраб single page application (1 index.html)
    historyApiFallback: true,
    hot: true,
  }
} 