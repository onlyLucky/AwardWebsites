import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 忽略未使用的变量，仅检查大写字母开头的变量
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // 仅允许导出 React 组件，常量导出需开启 allowConstantExport
      "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }]
    },
  },
])
