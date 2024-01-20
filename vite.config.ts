import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/vue-hour-range-picker/',
  publicDir: 'assets',
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueHourRangePicker",
      // the name of the output files when the build is run
      fileName: "hour-range-picker",
    },
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
          },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
