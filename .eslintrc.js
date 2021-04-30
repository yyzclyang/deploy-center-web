module.exports = {
  extends: ['react-app'],
  rules: {},
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json'
      },
      extends: ['airbnb-typescript'],
      rules: {
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/indent': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
        'no-console': 'warn',
        'object-curly-newline': 'off',
        'implicit-arrow-linebreak': 'off',
        'arrow-parens': 'off',
        'arrow-body-style': 'off',
        'consistent-return': 'off',
        'class-methods-use-this': 'off',
        'function-paren-newline': 'off',
        'react/prop-types': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-nested-ternary': 'warn',
        'react/jsx-wrap-multilines': [
          'error',
          { arrow: true, return: true, declaration: true }
        ]
      }
    }
  ]
};
