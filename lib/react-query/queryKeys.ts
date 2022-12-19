export const productKeys = {
	all: [{ scope: "product" }],
	list: (options = {}) => [
		{ scope: "product", type: "list", ...(options || {}) },
	],
	detail: (id: number) => [{ scope: "product", type: "detail", id }],
}
