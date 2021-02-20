// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': false,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'quotes': [2, 'single', { 'avoidEscape': false }],
        '@typescript-eslint/no-explicit-any': 'off',
        'semi': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'no-eval': 'error',
        'no-multi-spaces': 'error',
        'no-unused-vars': 'error',
        'func-style': ['error', 'expression'],
        'indent': ['error', 4],
        '@typescript-eslint/no-var-requires': 0,
    }
};
