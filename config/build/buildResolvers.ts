import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    
    // чтобы обращаться к срц по абсолют. импорту:
    // node modules too with abs. import
    modules: [options.paths.src, 'node_modules'],
    // для кд. файла, гл. файл индекс:
    mainFiles: ['index'],
    // можно еще "@": paths.src
    alias: {}
  }
}