export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: [
    '**/*.feature.ts'
  ],
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
  }
};
