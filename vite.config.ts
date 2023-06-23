import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  //获取各种环境下的变量    procss.cwd() index.html所在路径
  const env = loadEnv(mode, process.cwd());
  console.log(`env: ${env}`);
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve",
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    //代理跨域

    server: {
      proxy: {
        [env.VITE_A]: {
          // VITE_SERVE_USER
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, "");
          },
        },
        [env.VITE_PRODUCT]: {
          target: env.VITE_SERVE_PRO,
          changeOrigin: true,
          rewrite: (path) => {
            console.log(path);
            return path.replace(/^\/api/, "");
          },
        },
        [env.VITE_SERVE_USER]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => {
            console.log(path);
            return path.replace(/^\/api/, "");
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
  };
});
