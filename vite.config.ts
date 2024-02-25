import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "./runtimeConfig",
				replacement: "./runtimeConfig.browser", // ensures browser compatible version of AWS JS SDK is used
			},
		],
	},
	define: {
		"process.env": loadEnv(mode, process.cwd(), "VITE"),
	},
}));
