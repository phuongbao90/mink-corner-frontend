import "whatwg-fetch"
import "@testing-library/jest-dom"
import { server } from "@/mocks/server"
import { QueryCache } from "@tanstack/react-query"
import { loadEnvConfig } from "@next/env"

const queryCache = new QueryCache()

export default async () => {
	const projectDir = process.cwd()
	loadEnvConfig(projectDir)
}

// Establish API mocking before all tests.
beforeAll(() => {
	const localStorageMock = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn(),
		clear: jest.fn(),
	}

	global.localStorage = localStorageMock

	server.listen({ onUnhandledRequest: "error" })
})
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	queryCache.clear()
	server.resetHandlers()
})
// Clean up after the tests are finished.
afterAll(() => server.close())
