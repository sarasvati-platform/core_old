module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: [
    '<rootDir>/tests/**/*.feature.ts'
  ],
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
  }
};
