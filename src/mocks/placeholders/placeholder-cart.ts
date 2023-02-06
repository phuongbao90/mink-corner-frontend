import { Cart } from "@/features"

type Data = {
	shopping_cart_by_id: Cart
}

export const placeholder_shopping_cart_by_id = {
	shopping_cart_by_id: {
		id: "ef521bb3-6c08-4f1d-8ff0-54ce5269a6ec",
		device_id: null,
		date_created: "2023-02-04T13:54:16.083Z",
		date_updated: "2023-02-04T16:09:15.981Z",
		items: [
			{
				id: "0e008fd9-2494-4f5f-890c-f2496c98162a",
				quantity: 1,
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
				},
			},
			{
				id: "3592fc65-0f48-4d86-896b-39c08aee823a",
				quantity: 1,
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
				},
			},
		],
		items_func: {
			count: 2,
		},
	},
} as Data
