import { PromotionItemType } from "./../promotion/promotion.types"
import { Category } from "@/features/categories"
import { CoverImage, DirectusImages, Status } from "@/types"

export type Color = {
	id: string
	status: Status
	title: string
	value: string
	color_code: string
	order: number
}

export type Size = {
	id: string
	status: Status
	title: string
	value: string
	order: number
}

export type Variation = {
	id: string
	title: string
	value: string
	option_id: Option
}

export type Option = {
	id: string
	title: string
	value: string
	order: number
}

export type ProductItem = {
	id: string
	SKU: string
	price: string
	quantity: number
	status: Status
	cover_image: CoverImage
	images: DirectusImages
	product: {
		id: string
		name: string
		slug: string
		cover_image: CoverImage
	}
	color: Color | null
	size: Size | null
	promotion_item: Pick<
		PromotionItemType,
		"id" | "fixed_amount" | "type" | "percentage_rate"
	> | null
}

export interface CombinedOption extends Option {
	available_choices: Pick<Variation, "id" | "title" | "value">[]
}

export type Product = {
	id: string
	SKU: string
	name: string
	slug: string
	description: string
	share_images: boolean
	cover_image: CoverImage
	images: DirectusImages
	category: Category
	product_item?: ProductItem[]
	filterable_sizes: string[]
	filterable_colors: string[]
}

export type ProductImage = DirectusImages

export type ProductCount = [
	{
		count: {
			id: number
		}
	}
]

export type TFeaturedProducts = {
	id: string
	enabled: boolean
	cover_image: CoverImage
	products: Product[] | null
}

export type ProductSlice = {
	product: Product | undefined
	selected_product_item: ProductItem | undefined
	quantity: number
	maxQuantityMet: boolean
	inStock: boolean
	selectedOptions?: Map<string, string>
	disabled: boolean
	variantRecord: Map<string, Map<string, string>>
	actions: {
		setProduct: (product: Product) => void
		setVariantRecord: (product_item: ProductItem[]) => void

		initSelectedOptions: (product_item: ProductItem[]) => void
		// updateSelectedOptions: (update: Record<string, string>) => void
		updateSelectedOptions: (
			optionTitle: "color" | "size",
			optionId: string
		) => void
		increaseQuantity: () => void
		decreaseQuantity: () => void
		select_product_item: (item?: ProductItem) => void
		updateQuantity: (nextQuantity: number) => void
	}
	// formattedPrice: string
	// disabled: boolean
	// variant?: ProductItem
	// updateOptions: (options: Record<string, string>) => void
	// increaseQuantity: () => void
	// decreaseQuantity: () => void
	// addToCart: () => void
}
