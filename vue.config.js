const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require("path");

module.exports = {
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
