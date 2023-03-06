import { Cart } from "@/features/cart"

type Data = {
	shopping_cart_by_id: Cart
}

export const placeholder_shopping_cart_by_id = {
	shopping_cart_by_id: {
		id: "ef521bb3-6c08-4f1d-8ff0-54ce5269a6ec",
		device_id: null,
		date_created: "2023-02-04T13:54:16.083Z",
		date_updated: "2023-02-08T07:08:22.317Z",
		items: [
			{
				id: "3a379395-d4cc-4078-8719-71410456304e",
				quantity: 2,
				product_item_id: {
					id: "3",
					SKU: "NHAN-00001",
					cover_image: {
						id: "19c0d2ea-1e76-4cd8-8b5f-4cb67eb7237f",
					},
					images: [
						{
							directus_files_id: {
								id: "19c0d2ea-1e76-4cd8-8b5f-4cb67eb7237f",
							},
						},
						{
							directus_files_id: {
								id: "72639b43-1aee-48bf-ac3a-9f84828c3312",
							},
						},
						{
							directus_files_id: {
								id: "b5702d59-7f20-460e-9731-4c9f2474b598",
							},
						},
						{
							directus_files_id: {
								id: "8b0e0dae-0f03-4e1a-b48c-340476963f34",
							},
						},
						{
							directus_files_id: {
								id: "15211f83-d451-4710-b7ee-e2cd91e34fca",
							},
						},
					],
					price: "97000",
					quantity: 9,
					status: "published",
					variant: {
						slug: "trang",
						value: "trắng",
						variation: {
							name: "màu",
							slug: "mau",
						},
					},
					product: {
						id: "3",
						cover_image: {
							id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
						},
						images: [],
					},
				},
			},
			{
				id: "970da37d-e2fd-40f0-bad0-c2e286a4010c",
				quantity: 1,
				product_item_id: {
					id: "7",
					SKU: "DC-00002",
					cover_image: null,
					images: [],
					price: "87000",
					quantity: 12,
					status: "published",
					variant: null,
					product: {
						id: "4",
						cover_image: {
							id: "a62a7d06-c208-4d81-8439-0f5a83714786",
						},
						images: [
							{
								directus_files_id: {
									id: "a62a7d06-c208-4d81-8439-0f5a83714786",
								},
							},
							{
								directus_files_id: {
									id: "db4ed6c9-35ac-428f-9d51-c6d992208a12",
								},
							},
							{
								directus_files_id: {
									id: "815d76c0-f857-4066-992d-ceb41a0cf7b1",
								},
							},
						],
					},
				},
			},
		],
		items_func: {
			count: 2,
		},
	},
} as Data
