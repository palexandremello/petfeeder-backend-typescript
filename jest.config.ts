export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,

  collectCoverageForm: ['<rootDir>/src/**/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
