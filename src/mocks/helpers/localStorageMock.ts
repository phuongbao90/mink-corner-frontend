export const localStorageMock = (function () {
	let store = {} as any

	return {
		getItem(key: string) {
			return store[key]
		},

		setItem(key: string, value: string) {
			store[key] = value
		},

		clear() {
			store = {}
		},

		removeItem(key: string) {
			delete store[key]
		},

		getAll() {
			return store
		},
	}
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })
