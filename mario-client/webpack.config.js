import path from 'path';

const filename = 'main.js';
const __dirname = path.dirname(filename);

export default {
    entry: './src/main.js',
    mode: 'development',
    output: {
        filename: filename,
        path: path.resolve(__dirname, 'dist'),
    },
    node: false,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-object-assign"],
                    },
                },
            },
            {
                test: /\.js$/,
                loader: "webpack-remove-debug",
            },
        ],
    }
}