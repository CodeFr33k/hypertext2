const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require("path");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/hypertext2/'
    : '/',
    configureWebpack: {
        plugins: [
            new WasmPackPlugin({
                crateDirectory: __dirname,
                watchDirectories: [
                    path.resolve(__dirname, "rust-src"),
                    path.resolve(__dirname, "../caml-rust/src"),
                ]
            }),
        ]
    }
};
