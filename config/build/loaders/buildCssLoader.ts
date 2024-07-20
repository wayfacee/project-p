import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            // чтобы тока для .module. применилось:
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            // название с хэшом 
            localIdentName: isDev
              ? '[path][name]__[local]-[hash:base64:5]'
              : '[hash:base64:8]'
          }
        }
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };
}