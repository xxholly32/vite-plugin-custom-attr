import { defineConfig } from 'vite'
// vite.config.ts
import VueMacros from 'unplugin-vue-macros/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vue from '@vitejs/plugin-vue'
// import CustomProps from 'vite-plugin-custom-attr'
import CustomProps from 'vite-plugin-custom-attr/vite'
// import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    Vue(),
    CustomProps({
      tags: {
        'h1': {
          style: 'font-size: 2rem;',
        },
        'el-button': {
          type: 'success',
          plain: true,
        },
        'el-select': {
          'popper-options': {
            modifiers: [
              { name: 'offset', options: { offset: [0, 0] } },
              {
                name: 'applyArrowHide',
                enabled: true,
                phase: 'write',
                fn({ state }) {
                  const { arrow } = state.elements

                  if (arrow)
                    arrow.style.display = 'none'
                },
              },
            ],
          },
        },
      },
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
    VueMacros(),
  ],
})
