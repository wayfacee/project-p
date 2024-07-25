import path from "path";
import { BuildPaths } from "../build/types/config";
import { Configuration, DefinePlugin, RuleSetRule } from "webpack";
import { buildCssLoader } from "../build/loaders/buildCssLoader";

// absolute imports for storybook
export default ({ config }: { config: Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  }
  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      // дефолт лоадер обрабатывать не будет.
      return { ...rule, exclude: /\.svg$/i }
    }

    return rule;
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  // Только на этапе разработки
  config.module.rules.push(buildCssLoader(true));

  // global consts:
  config.plugins.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify(''),
  }))
  return config;
}