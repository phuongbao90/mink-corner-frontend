export const JWT_SECRET = process.env.JWT_SECRET as string
console.log(
	"/* -------------------------------------------------------------------------- */"
)
console.log("🚀 ~ file: index.ts:2 ~ JWT_SECRET:", JWT_SECRET)
console.log(
	"/* -------------------------------------------------------------------------- */"
)

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const DEFAULT_SEO_TITLE = process.env
	.NEXT_PUBLIC_DEFAULT_SEO_TITLE as string
export const DEFAULT_SEO_DESCRIPTION = process.env
	.NEXT_PUBLIC_DEFAULT_SEO_DESCRIPTION as string

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export const ENABLE_MOCK = process.env.NEXT_PUBLIC_ENABLE_MOCK === "true"
export const PRODUCT_PLACEHOLDER_IMAGE_ID = process.env
	.NEXT_PUBLIC_PRODUCT_PLACEHOLDER_IMAGE_ID as string
export const COLLECTION_PRODUCT_LIMIT = Number(
	process.env.NEXT_PUBLIC_COLLECTION_PRODUCT_LIMIT
)

export const LOGO_1_1_FILE_ID = process.env
	.NEXT_PUBLIC_LOGO_1_1_FILE_ID as string
export const LOGO_16_9_FILE_ID = process.env
	.NEXT_PUBLIC_LOGO_16_9_FILE_ID as string
export const LOGO_OG_FILE_ID = process.env.NEXT_PUBLIC_LOGO_OG_FILE_ID as string

export const NODE_ENV = process.env.NODE_ENV as string
export const IS_DEV = NODE_ENV === "development"
export const IS_BROWSER = typeof window !== "undefined"
export const BREAKPOINT_SM = 768
export const BREAKPOINT_MD = 992
export const BREAKPOINT_LG = 1200
export const BREAKPOINT_XL = 1400

export const apiRoutes = {
	user: "/api/user",
	cart: "/api/cart",
	cartItem: "/api/cart-item",
	checkout: "/api/checkout",
	categories: "/api/categories",
	products: "/api/products",
	featured_products: "/api/featured-products",
	product: "/api/product",
	city: "/api/geography/city",
	district: "/api/geography/district",
	ward: "/api/geography/ward",
	paymentType: "/api/payment-types",
	shippingMethods: "/api/shipping-methods",
	orders: "/api/orders",
	order: "/api/order",
	colors: "/api/colors",
	sizes: "/api/sizes",
	appConfigs: "/api/app-configs",
	product_count: "/api/product-count",
	banner: "/api/banner",
	promotion: "/api/promotion",
	address: "/api/user-address",
	seoMeta: "/api/seo-meta",
} as const

export const pageRoutes = {
	cart: "/cart",
	collection: "/collection",
	checkout: "/checkout",
	products: "/products",
	user: "/user",
	promotion: "/promotion",
	home: "/home",
	search: "/search",
} as const

export const bannerNames = {
	homeTopBanner: "home-top",
	banner_home_mid: "home-mid",
} as const
