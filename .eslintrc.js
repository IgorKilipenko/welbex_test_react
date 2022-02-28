module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@emotion',
        //'@typescript-eslint',
        'jest',
        'deprecation',
        'react',
        'react-hooks',
    ],
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'next/core-web-vitals',
        'prettier',
    ],
    rules: {
        '@emotion/jsx-import': 'off',
        '@emotion/pkg-renaming': 'error',
        'deprecation/deprecation': 'warn',
        'no-unused-vars': 'warn',
    },
    overrides: [
        /*{
            files: ['*.js', '*.jsx'],
            extends: ['eslint:recommended'],
            rules: {
                'no-unused-vars': 'warn',
            },
        },*/
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            plugins: ['@typescript-eslint']
        },
    ],
    parserOptions: {
        //tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 10,
        sourceType: 'module',
    },
}