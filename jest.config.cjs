module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.polyfill.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  moduleNameMapper: {
    '^../../lib/projects$': '<rootDir>/tests/unit/__mocks__/projects.ts',
    '^../../lib/publications$': '<rootDir>/tests/unit/__mocks__/publications.ts',
  },
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Polyshape Unit Test Report',
      outputPath: 'unit-test-report.html',
      theme: 'darkTheme',
      dateFormat: 'yyyy-mm-dd HH:MM:ss',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
};
