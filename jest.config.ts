import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  testMatch: ['<rootDir>/tests/**/*.test.{ts,js}'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;