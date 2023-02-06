import { ProductItem } from "@/features"

type Data = {
	product_item: ProductItem[]
}

export const placeholder_product_item = {
	product_item: [
		{
			id: "1",
			SKU: "AO-00001",
			cover_image: null,
			images: [],
			price: "200000",
			quantity: 20,

			status: "published",
			variant: {
				slug: "s",
				value: "s",
				variation: {
					name: "kích thước",
					slug: "kich-thuoc",
				},
			},
		},
		{
			id: "2",
			SKU: "AO-00002",
			cover_image: null,
			images: [],
			price: "300000",
			quantity: 10,

			status: "published",
			variant: {
				slug: "m",
				value: "m",
				variation: {
					name: "kích thước",
					slug: "kich-thuoc",
				},
			},
		},
		{
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
		{
			id: "4",
			SKU: "NHAN-00002",
			cover_image: {
				id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
			},
			images: [
				{
					directus_files_id: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
				{
					directus_files_id: {
						id: "85df3660-6e97-4105-bc05-8b96fd4c1500",
					},
				},
				{
					directus_files_id: {
						id: "6c7c31af-1f23-4a7a-be43-9bc301b9fd6a",
					},
				},
				{
					directus_files_id: {
						id: "6626647c-b4f3-4de0-97cf-bda09e82a010",
					},
				},
				{
					directus_files_id: {
						id: "15211f83-d451-4710-b7ee-e2cd91e34fca",
					},
				},
				{
					directus_files_id: {
						id: "8b0e0dae-0f03-4e1a-b48c-340476963f34",
					},
				},
			],
			price: "120000",
			quantity: 20,

			status: "published",
			variant: {
				slug: "vang",
				value: "vàng",
				variation: {
					name: "màu",
					slug: "mau",
				},
			},
		},
		{
			id: "7",
			SKU: "DC-00002",
			cover_image: null,
			images: [],
			price: "87000",
			quantity: 12,

			status: "published",
			variant: null,
		},
		{
			id: "8",
			SKU: "NON-00001",
			cover_image: null,
			images: [],
			price: "79000",
			quantity: 50,

			status: "published",
			variant: null,
		},
	],
} as Data
