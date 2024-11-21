import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dns from 'dns'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    vue(),
    checker({ typescript: true }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts'
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      dts: 'src/components.d.ts'
    })
  ],
  server: {
    host: 'localhost',
    port: 4000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variables.scss";`
      }
    }
  }
})
