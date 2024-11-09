// vite.config.js

export default {
	// config options
	publicDir: "./src/assets",
	build: {
		minify: false,
		rollupOptions: {
			input: "./src/js/main.js",
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`
			}
		}
	}
}
