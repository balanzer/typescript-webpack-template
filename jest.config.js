const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "scripts/src/**/*.{js,jsx,ts,tsx}",
    "!scripts/src/**/*.d.ts", // Exclude declaration files
  ],
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
};
