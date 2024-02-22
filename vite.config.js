import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 导入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// import fs from 'fs'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({resolvers: [ElementPlusResolver()],}),
    Components({resolvers: [ElementPlusResolver({importStyle: 'sass'})]})
  ],
  resolve: {
    alias: {  // 别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @use "@/styles/element/index.scss" as *;
                    @use "@/styles/var.scss" as *;
                `,
      }
    }
  },
  server: {  // 配置开发环境中的服务器
    host: true,  // 允许外部访问
    open: true,  // 自动打开浏览器
    // https: {
    //   cert: fs.readFileSync("C:\\Users\\MUGE_TONG\\Documents\\localhost.pem"),
    //   key: fs.readFileSync("C:\\Users\\MUGE_TONG\\Documents\\localhost-key.pem")
    // }
  },
})
