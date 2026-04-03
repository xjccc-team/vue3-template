// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'

const vueFiles = ['*.vue', '**/*.vue']

const vueRecommended = pluginVue.configs['flat/recommended'].map((config) => {
  if (config.name === 'vue/base/setup' || config.files) return config

  return {
    ...config,
    files: vueFiles
  }
})

export default antfu(
  {
    typescript: true,
    vue: true,
    md: true,
    stylistic: false,
    lessOpinionated: true
  },
  ...vueRecommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': 0,
      'node/prefer-global/process': 0,
      'function-paren-newline': ['error', 'multiline'],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'object-curly-spacing': ['error', 'always'],
      'object-curly-newline': [
        'error',
        {
          multiline: true,
          consistent: true
        }
      ]
    }
  },
  {
    files: vueFiles,
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/block-order': 0
    }
  }
)
