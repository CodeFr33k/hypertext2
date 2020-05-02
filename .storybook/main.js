const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.ts',
    ],
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
        config.resolve.alias['@/store'] = path.resolve(__dirname, '../src/store/index.ts');
        config.resolve.extensions.push(
            '.ts',
            '.tsx',
            '.vue',
            '.css',
            '.less',
            '.scss',
            '.sass',
            '.html',
        )

        config.module.rules.push({
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true,
                    },
                },
            ],
        })

        //console.dir(config, { depth: null });

        config.module.rules.push({
            test: /\.sass$/,
            use: [
                'style-loader', 
                'css-loader', 
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            indentedSyntax: true,
                        },
                    }
                }
            ],
            include: path.resolve(__dirname, '../'),
        });

        config.plugins.push(new ForkTsCheckerWebpackPlugin())

        return config
    },
}
