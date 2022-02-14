module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@emotion',
        '@typescript-eslint',
        'jest',
        'deprecation',
        'react',
        'react-hooks',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'next/core-web-vitals',
    ],
    rules: {
        '@emotion/jsx-import': 'off',
        '@emotion/pkg-renaming': 'error',
        'deprecation/deprecation': 'warn',
        //"no-unused-vars": "warn"
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
        },
    ],
    parserOptions: {
        //tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
        },
    },
}
