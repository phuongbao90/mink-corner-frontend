// jest.config.js

const nextJest = require("next/jest")

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	// if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
	// setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	preset: "ts-jest",
	testPathIgnorePatterns: ["/node_modules/"],
	setupFilesAfterEnv: ["./jest.setup.js"],
	moduleDirectories: ["node_modules", "<rootDir>"],
	// moduleFileExtensions: ["js", "json", "ts", "tsx"],
	// roots: ["<rootDir>/"],
	moduleNameMapper: {
		// "^@/(.*)": "<rootDir>/src/$1",
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
		"^@/features/(.*)$": "<rootDir>/src/features/$1",
		"^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
		"^@/pages/(.*)$": "<rootDir>/src/pages/$1",
		"^@/lib/(.*)$": "<rootDir>/src/lib/$1",
		"^@/api/(.*)$": "<rootDir>/src/api/$1",
		"^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
		"^@/store/(.*)$": "<rootDir>/src/store/$1",
		"^@/styles/(.*)$": "<rootDir>/src/styles/$1",
		"^@/types/(.*)$": "<rootDir>/src/types/$1",
		"^@/utils/(.*)$": "<rootDir>/src/utils/$1",
		"^@/constant/(.*)$": "<rootDir>/src/constant/$1",
		"^@/providers/(.*)$": "<rootDir>/src/providers/$1",

		// "^@/components/(.*)$": "<rootDir>/src/components/$1",
		// "^@/common/(.*)$": "<rootDir>/src/common/$1",
		// "^@/configs/(.*)$": "<rootDir>/src/configs/$1",
		// "^@/features/(.*)$": "<rootDir>/src/features/$1",
		// "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
		// "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
		// "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
		// "^@/store/(.*)$": "<rootDir>/src/store/$1",
		// "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
		// "^@/types/(.*)$": "<rootDir>/src/types/$1",
		// "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
	},
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

module.exports = createJestConfig(customJestConfig)
