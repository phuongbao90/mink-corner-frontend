interface Storage {
	setItem(key: string, value: any): void
	getItem(key: string): any
	removeItem(key: string): void
}

export const storage: Storage =
	typeof window !== "undefined"
		? window.localStorage
		: {
				setItem: () => {},
				getItem: () => null,
				removeItem: () => {},
		  }

export const setItem = (key: string, value: any) => {
	try {
		storage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error(error)
	}
}

export const getItem = (key: string) => {
	try {
		const item = storage.getItem(key)
		return item ? JSON.parse(item) : null
	} catch (error) {
		console.error(error)
		return null
	}
}

export const removeItem = (key: string) => {
	try {
		storage.removeItem(key)
	} catch (error) {
		console.error(error)
	}
}
