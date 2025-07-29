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
    "!scripts/src/logger/logger.ts", // Exclude logger
    "!scripts/src/index.ts", // Exclude index.ts
    "!scripts/src/dev-env-testing.ts", // Exclude dev-env-testing.ts
    "!scripts/src/common/collect-data.ts", // Exclude collect-data.ts
    "!scripts/src/common/sample-json/test-data-import.ts", // Exclude sample files
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
