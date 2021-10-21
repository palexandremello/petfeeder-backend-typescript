module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!src/*/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
