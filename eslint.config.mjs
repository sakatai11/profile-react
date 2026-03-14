import { defineConfig } from 'eslint/config';
import nextConfig from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import tailwindcss from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      'functions/**',
      'package-lock.json',
      'next.config.mjs',
      'tsconfig.json',
      'next-env.d.ts',
      'postcss.config.mjs',
      '*.cjs',
      '.firebaserc',
      'firebase.json',
      'firestore.indexes.json',
      'firestore.rules',
    ],
  },
  ...nextConfig,
  ...tseslint.configs.recommended,
  ...tailwindcss.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/classnames-order': ['error', { officialSorting: true, prependCustom: true }],
    },
  },
  prettier,
]);
