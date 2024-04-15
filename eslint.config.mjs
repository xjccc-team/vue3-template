import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'path'
import { fileURLToPath } from 'url'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/*',
      'dist/*',
      '.output',
      '.data'
    ]
  },
  ...compat.config({
    root: true,
    extends: [
      'plugin:vue/essential',
      '@vue/eslint-config-typescript/recommended',
      '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
      ecmaVersion: 'latest'
    },
    rules: {
      'vue/multi-word-component-names': 0
    }
  })
]
