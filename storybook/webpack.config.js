const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.modules = [
    'node_modules',
    path.resolve(__dirname, "../src")
  ];
  defaultConfig.devServer = {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false
    }
  }
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        loader: "react-docgen-typescript-loader",
        options: {
          skipPropsWithName: [
            'intl',
            'dispatch',
            'theme',
            'innerRef',
            'classes',
            'match'
          ]
        }
      }
    ]
  })

  defaultConfig.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    loaders: [ "style", "css", "less" ] 
  })
  defaultConfig.resolve.alias = {
    'react': 'preact-compat',
    'react-dom': 'preact-compat'
  };
  defaultConfig.resolve.extensions.push('.ts', '.tsx', '.css', '.less');

  return defaultConfig;
};