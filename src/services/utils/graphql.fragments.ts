import { gql } from "graphql-request"

export const CATEGORY_FRAGMENT = gql`
	fragment CategoryFields on category {
		id
		category_name
		category_slug
		order
		icon {
			id
		}
		parent_category_id {
			id
			category_name
			category_slug
		}
	}
`

export const ADDRESS_FRAGMENT = gql`
	fragment AddressFragment on user_address {
		address
		city
		district
		ward
		note
		is_default
		user {
			id
		}
	}
`

export const COLOR_FRAGMENT = gql`
	fragment ColorFields on color {
		id
		title
		value
		order
		color_code
	}
`
export const SIZE_FRAGMENT = gql`
	fragment SizeFields on size {
		id
		title
		value
		order
	}
`

export const BASIC_PRODUCT_FRAGMENT = gql`
	fragment BasicProductFields on product {
		id
		name
		slug
		cover_image {
			id
		}
	}
`

export const PRODUCT_ITEM_FRAGMENT = gql`
	fragment ProductItemFields on product_item {
		id
		SKU
		price
		quantity
		status
		cover_image {
			id
		}
		images {
			directus_files_id {
				id
			}
		}
		product {
			...BasicProductFields
		}
		promotion_item {
			id
			type
			percentage_rate
			fixed_amount
			promotion_id {
				id
				title
				start_date
				end_date
			}
		}

		size {
			...SizeFields
		}
		color {
			...ColorFields
		}
	}
	${BASIC_PRODUCT_FRAGMENT}
	${SIZE_FRAGMENT}
	${COLOR_FRAGMENT}
`

export const PRODUCT_FRAGMENT = gql`
	fragment ProductFields on product {
		id
		SKU
		name
		slug
		description
		filterable_colors
		filterable_sizes
		share_images
		cover_image {
			id
		}
		images {
			directus_files_id {
				id
			}
		}
		category {
			...CategoryFields
		}
		product_item(filter: { status: { _eq: "published" } }) {
			...ProductItemFields
		}
	}
	${PRODUCT_ITEM_FRAGMENT}
	${CATEGORY_FRAGMENT}
`

export const CART_ITEM_FRAGMENT = gql`
	fragment CartItemFields on shopping_cart_item {
		id
		quantity
		date_created
		date_updated
		product_item_id {
			...ProductItemFields
		}
	}
	${PRODUCT_ITEM_FRAGMENT}
`

export const USER_FRAGMENT = gql`
	fragment UserFragment on shopping_user {
		id
		name
		anonymous
		device_id
		email_address
		phone_number
		status
		cart {
			id
		}
	}
`

export const PAYMENT_TYPE_FRAGMENT = gql`
	fragment PaymentTypeFragment on payment_type {
		id
		name
		value
		detail
		status
	}
`
export const SHIPPING_METHOD_FRAGMENT = gql`
	fragment ShippingMethodFragment on shipping_method {
		id
		name
		price
		applicable_to
		note
		status
	}
`
export const ORDER_ITEM_FRAGMENT = gql`
	fragment OrderItemFragment on order_item {
		id
		product_item_id {
			id
		}
		quantity
		price
	}
`
export const ORDER_FRAGMENT = gql`
	fragment OrderFragment on order {
		id
		total
		status
		date_created
		items {
			...OrderItemFragment
		}
		payment_method {
			...PaymentTypeFragment
		}
		shipping_method {
			...ShippingMethodFragment
		}
		shipping_address {
			...AddressFragment
		}
	}
	${ORDER_ITEM_FRAGMENT}
	${PAYMENT_TYPE_FRAGMENT}
	${SHIPPING_METHOD_FRAGMENT}
	${ADDRESS_FRAGMENT}
`

export const BANNER_ITEM_LINK_FRAGMENT = gql`
	fragment BannerItemLinkFields on banner_item_link {
		id
		collection
		item {
			... on product {
				slug
				cover_image {
					id
				}
			}
			... on category {
				category_slug
				cover_image {
					id
				}
			}
			... on promotion {
				discount_code
			}
		}
	}
`

export const BANNER_ITEM_FRAGMENT = gql`
	fragment BannerItemFields on banner_item {
		id
		name
		order
		title
		subtitle
		start_date
		end_date
		status
		cover_image {
			id
		}
		link {
			...BannerItemLinkFields
		}
	}
	${BANNER_ITEM_LINK_FRAGMENT}
`

export const PROMOTION_ITEM_FRAGMENT = gql`
	fragment PromotionItemFields on promotion_item {
		id
		title
		type
		percentage_rate
		fixed_amount
		product_items(filter: { status: { _eq: "published" } }) {
			...ProductItemFields
		}
		categories(filter: { status: { _eq: "published" } }) {
			...CategoryFields
		}
	}
	${PRODUCT_ITEM_FRAGMENT}
	${CATEGORY_FRAGMENT}
`
