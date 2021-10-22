module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,

  preset: '@shelf/jest-mongodb',

  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!src/*/*.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
