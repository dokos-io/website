// ESLint 9 flat config. Replaces .eslintrc.cjs, which ESLint 9 ignores.
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append(
  {
    ignores: ['dist/**', '.output/**', '.nuxt/**', '.data/**', 'node_modules/**', 'public/**'],
  },
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      // Content queries are untyped (useAsyncData<any>); keep `any` visible, not blocking.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
