import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import VueRouter from 'vue-router/vite'

const apiPrefixRE = /^\/api/

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    base: isDev ? '/' : './',
    plugins: [
      VueRouter({ dts: 'src/route-map.d.ts' }),
      AutoImport({
        imports: ['vue', 'vue-router']
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: true,
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true,
          rewrite: (path) => path.replace(apiPrefixRE, '')
        }
      }
    },
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false
    }
  }
})
