module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,

  preset: '@shelf/jest-mongodb',

  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
