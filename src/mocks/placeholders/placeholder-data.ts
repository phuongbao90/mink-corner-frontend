//@ts-nocheck
import { Cart, CartItem } from "@/features/cart"
import { Product, ProductItem } from "@/features/products"
import { User } from "@/features/user"

export const placeholder_data = {
	product: [
		{
			id: "2",
			name: "Áo len",
			slug: "ao-len",
			description: "Áo len",
			share_images: true,
			cover_image: {
				id: "af6be75f-17bc-4007-962d-83b766f477e1",
			},
			images: [
				{
					directus_files_id: {
						id: "fdc6ee8c-b676-4d61-9001-37b91720e2d2",
					},
				},
				{
					directus_files_id: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
				{
					directus_files_id: {
						id: "383bbbc8-94a0-4b6e-9513-d58df2bf129f",
					},
				},
				{
					directus_files_id: {
						id: "c3835fc2-184c-46b4-be5f-8474298a5a2f",
					},
				},
			],
			category: {
				id: "3",
				category_name: "áo",
				category_slug: "ao",
			},
			product_item: [
				{
					id: "1",
					SKU: "AO-00001",
					price: "200000",
					quantity: 20,
					status: "published",
					variant: {
						id: "7",
						slug: "s",
						value: "s",
						variation: {
							id: "3",
							name: "kích thước",
							slug: "kich-thuoc",
						},
					},
					cover_image: null,
					images: [],
					product: {
						id: "2",
						name: "Áo len",
						slug: "ao-len",
						cover_image: {
							id: "af6be75f-17bc-4007-962d-83b766f477e1",
						},
					},
				},
				{
					id: "2",
					SKU: "AO-00002",
					price: "300000",
					quantity: 10,
					status: "published",
					variant: {
						id: "8",
						slug: "m",
						value: "m",
						variation: {
							id: "3",
							name: "kích thước",
							slug: "kich-thuoc",
						},
					},
					cover_image: null,
					images: [],
					product: {
						id: "2",
						name: "Áo len",
						slug: "ao-len",
						cover_image: {
							id: "af6be75f-17bc-4007-962d-83b766f477e1",
						},
					},
				},
			],
		},
		{
			id: "3",
			name: "nhẫn cánh hoa",
			slug: "nhan-canh-hoa",
			description: "nhẫn cánh hoa",
			share_images: false,
			cover_image: {
				id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
			},
			images: [],
			category: {
				id: "1",
				category_name: "nhẫn",
				category_slug: "nhan",
			},
			product_item: [
				{
					id: "3",
					SKU: "NHAN-00001",
					price: "97000",
					quantity: 9,
					status: "published",
					variant: {
						id: "5",
						slug: "trang",
						value: "trắng",
						variation: {
							id: "1",
							name: "màu",
							slug: "mau",
						},
					},
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
					product: {
						id: "3",
						name: "nhẫn cánh hoa",
						slug: "nhan-canh-hoa",
						cover_image: {
							id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
						},
					},
				},
				{
					id: "4",
					SKU: "NHAN-00002",
					price: "120000",
					quantity: 20,
					status: "published",
					variant: {
						id: "2",
						slug: "vang",
						value: "vàng",
						variation: {
							id: "1",
							name: "màu",
							slug: "mau",
						},
					},
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
					product: {
						id: "3",
						name: "nhẫn cánh hoa",
						slug: "nhan-canh-hoa",
						cover_image: {
							id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
						},
					},
				},
			],
		},
		{
			id: "4",
			name: "dây chuyền hình trái tim",
			slug: "day-chuyen-hinh-trai-tim",
			description: "dây chuyền hình trái tim",
			share_images: true,
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
			category: {
				id: "5",
				category_name: "dây chuyền",
				category_slug: "day-chuyen",
			},
			product_item: [
				{
					id: "7",
					SKU: "DC-00002",
					price: "87000",
					quantity: 12,
					status: "published",
					variant: null,
					cover_image: null,
					images: [],
					product: {
						id: "4",
						name: "dây chuyền hình trái tim",
						slug: "day-chuyen-hinh-trai-tim",
						cover_image: {
							id: "a62a7d06-c208-4d81-8439-0f5a83714786",
						},
					},
				},
			],
		},
		{
			id: "5",
			name: "nón lưỡi trai",
			slug: "non-luoi-trai",
			description: "sản phảm nón luoi trai",
			share_images: true,
			cover_image: {
				id: "138b5cca-fe43-4f8a-be4a-d242f066f23e",
			},
			images: [
				{
					directus_files_id: {
						id: "138b5cca-fe43-4f8a-be4a-d242f066f23e",
					},
				},
				{
					directus_files_id: {
						id: "6efe4635-7037-40e2-b954-23cc6def6615",
					},
				},
				{
					directus_files_id: {
						id: "d94ac87a-4e62-4263-89a1-ac9a3dd12aa9",
					},
				},
				{
					directus_files_id: {
						id: "a4c706cf-34cc-4312-a6f0-dc7c1b1a4814",
					},
				},
			],
			category: {
				id: "6",
				category_name: "nón",
				category_slug: "non",
			},
			product_item: [
				{
					id: "8",
					SKU: "NON-00001",
					price: "79000",
					quantity: 50,
					status: "published",
					variant: null,
					cover_image: null,
					images: [],
					product: {
						id: "5",
						name: "nón lưỡi trai",
						slug: "non-luoi-trai",
						cover_image: {
							id: "138b5cca-fe43-4f8a-be4a-d242f066f23e",
						},
					},
				},
			],
		},
	] as Product[],
	product_item: [
		{
			id: "1",
			SKU: "AO-00001",
			price: "200000",
			quantity: 20,
			status: "published",
			variant: {
				id: "7",
				slug: "s",
				value: "s",
				variation: {
					id: "3",
					name: "kích thước",
					slug: "kich-thuoc",
				},
			},
			cover_image: null,
			images: [],
			product: {
				id: "2",
				name: "Áo len",
				slug: "ao-len",
				cover_image: {
					id: "af6be75f-17bc-4007-962d-83b766f477e1",
				},
			},
		},
		{
			id: "2",
			SKU: "AO-00002",
			price: "300000",
			quantity: 10,
			status: "published",
			variant: {
				id: "8",
				slug: "m",
				value: "m",
				variation: {
					id: "3",
					name: "kích thước",
					slug: "kich-thuoc",
				},
			},
			cover_image: null,
			images: [],
			product: {
				id: "2",
				name: "Áo len",
				slug: "ao-len",
				cover_image: {
					id: "af6be75f-17bc-4007-962d-83b766f477e1",
				},
			},
		},
		{
			id: "3",
			SKU: "NHAN-00001",
			price: "97000",
			quantity: 9,
			status: "published",
			variant: {
				id: "5",
				slug: "trang",
				value: "trắng",
				variation: {
					id: "1",
					name: "màu",
					slug: "mau",
				},
			},
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
			product: {
				id: "3",
				name: "nhẫn cánh hoa",
				slug: "nhan-canh-hoa",
				cover_image: {
					id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
				},
			},
		},
		{
			id: "4",
			SKU: "NHAN-00002",
			price: "120000",
			quantity: 20,
			status: "published",
			variant: {
				id: "2",
				slug: "vang",
				value: "vàng",
				variation: {
					id: "1",
					name: "màu",
					slug: "mau",
				},
			},
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
			product: {
				id: "3",
				name: "nhẫn cánh hoa",
				slug: "nhan-canh-hoa",
				cover_image: {
					id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
				},
			},
		},
		{
			id: "7",
			SKU: "DC-00002",
			price: "87000",
			quantity: 12,
			status: "published",
			variant: null,
			cover_image: null,
			images: [],
			product: {
				id: "4",
				name: "dây chuyền hình trái tim",
				slug: "day-chuyen-hinh-trai-tim",
				cover_image: {
					id: "a62a7d06-c208-4d81-8439-0f5a83714786",
				},
			},
		},
		{
			id: "8",
			SKU: "NON-00001",
			price: "79000",
			quantity: 50,
			status: "published",
			variant: null,
			cover_image: null,
			images: [],
			product: {
				id: "5",
				name: "nón lưỡi trai",
				slug: "non-luoi-trai",
				cover_image: {
					id: "138b5cca-fe43-4f8a-be4a-d242f066f23e",
				},
			},
		},
	] as ProductItem[],
	shopping_user: {
		id: "19616343-fdd1-4818-afc1-70bbde5edaeb",
		anonymous: true,
		email_address: null,
		phone_number: null,
		status: "published",
		cart: [
			{
				id: "ef521bb3-6c08-4f1d-8ff0-54ce5269a6ec",
			},
		],
	} as User,
	category: [
		{
			id: "1",
			category_name: "nhẫn",
			category_slug: "nhan",
			parent_category_id: {
				id: "2",
				category_name: "trang sức",
				category_slug: "trang-suc",
			},
		},
		{
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
			parent_category_id: null,
		},
		{
			id: "3",
			category_name: "áo",
			category_slug: "ao",
			parent_category_id: {
				id: "4",
				category_name: "trang phục",
				category_slug: "trang-phuc",
			},
		},
		{
			id: "4",
			category_name: "trang phục",
			category_slug: "trang-phuc",
			parent_category_id: null,
		},
		{
			id: "5",
			category_name: "dây chuyền",
			category_slug: "day-chuyen",
			parent_category_id: {
				id: "2",
				category_name: "trang sức",
				category_slug: "trang-suc",
			},
		},
		{
			id: "6",
			category_name: "nón",
			category_slug: "non",
			parent_category_id: {
				id: "4",
				category_name: "trang phục",
				category_slug: "trang-phuc",
			},
		},
	],
	shopping_cart_by_id: {
		id: "ef521bb3-6c08-4f1d-8ff0-54ce5269a6ec",
		device_id: null,
		date_created: "2023-02-04T13:54:16.083Z",
		date_updated: "2023-02-09T04:08:55.044Z",
		items: [
			{
				id: "3a379395-d4cc-4078-8719-71410456304e",
				quantity: 6,
				date_created: "2023-02-04T15:38:53.287Z",
				date_updated: "2023-02-09T05:29:14.840Z",
				product_item_id: {
					id: "3",
					SKU: "NHAN-00001",
					price: "97000",
					quantity: 9,
					status: "published",
					variant: {
						id: "5",
						slug: "trang",
						value: "trắng",
						variation: {
							id: "1",
							name: "màu",
							slug: "mau",
						},
					},
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
					product: {
						id: "3",
						name: "nhẫn cánh hoa",
						slug: "nhan-canh-hoa",
						cover_image: {
							id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
						},
					},
				},
			},
			{
				id: "970da37d-e2fd-40f0-bad0-c2e286a4010c",
				quantity: 1,
				date_created: "2023-02-04T16:26:12.636Z",
				date_updated: "2023-02-09T05:29:10.979Z",
				product_item_id: {
					id: "7",
					SKU: "DC-00002",
					price: "87000",
					quantity: 12,
					status: "published",
					variant: null,
					cover_image: null,
					images: [],
					product: {
						id: "4",
						name: "dây chuyền hình trái tim",
						slug: "day-chuyen-hinh-trai-tim",
						cover_image: {
							id: "a62a7d06-c208-4d81-8439-0f5a83714786",
						},
					},
				},
			},
		],
		items_func: {
			count: 2,
		},
	} as Cart,
	shopping_cart_item: [
		{
			id: "f168f834-0b63-4be7-8e36-6d6c644f4ce6",
			quantity: 1,
			date_created: "2023-02-04T15:45:18.194Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "e0d02b65-7d52-49c7-a5d0-3031804939ec",
			quantity: 1,
			date_created: "2023-02-04T15:48:40.365Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "00b01840-cb3c-4443-8ae4-ba3de0e26d3b",
			quantity: 1,
			date_created: "2023-02-03T13:50:40.001Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "394a68cc-ca0f-43a8-9d49-1f0e118e4b5b",
			quantity: 1,
			date_created: "2023-02-04T15:56:52.338Z",
			date_updated: "2023-02-04T16:09:15.986Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "94495120-d852-4b8c-8813-5fe9b9beb044",
			quantity: 1,
			date_created: "2023-02-04T16:05:28.057Z",
			date_updated: "2023-02-04T16:09:15.986Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "7e0cb33b-1f86-4b94-8b3d-576f73e3a04e",
			quantity: 1,
			date_created: "2023-02-04T16:26:22.902Z",
			date_updated: "2023-02-08T07:08:00.707Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "0e008fd9-2494-4f5f-890c-f2496c98162a",
			quantity: 1,
			date_created: "2023-02-04T16:31:18.175Z",
			date_updated: "2023-02-08T07:08:00.707Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "3a379395-d4cc-4078-8719-71410456304e",
			quantity: 6,
			date_created: "2023-02-04T15:38:53.287Z",
			date_updated: "2023-02-09T05:29:14.840Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "f305e04f-de7b-4361-9cbb-f2b6e384fb92",
			quantity: 1,
			date_created: "2023-01-29T09:14:08.657Z",
			date_updated: "2023-02-01T06:36:37.710Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "3592fc65-0f48-4d86-896b-39c08aee823a",
			quantity: 1,
			date_created: "2023-02-04T16:31:21.057Z",
			date_updated: "2023-02-08T07:08:00.707Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "a197a3d4-021e-4709-b8a8-69c368b43634",
			quantity: 1,
			date_created: "2023-02-04T16:30:34.033Z",
			date_updated: "2023-02-08T07:08:11.747Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "83e95f6f-a1a5-48e3-921c-8a8fec34c18d",
			quantity: 1,
			date_created: "2023-02-06T06:29:15.910Z",
			date_updated: "2023-02-08T07:08:11.747Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "b91787e0-6e04-433f-962a-b103af6f5358",
			quantity: 1,
			date_created: "2023-02-04T16:35:35.075Z",
			date_updated: "2023-02-08T07:08:22.320Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "7b126e2b-f939-4c19-bea2-246aae2a97cc",
			quantity: 2,
			date_created: "2023-01-30T05:05:42.813Z",
			date_updated: "2023-02-02T07:08:57.047Z",
			product_item_id: {
				id: "2",
				SKU: "AO-00002",
				price: "300000",
				quantity: 10,
				status: "published",
				variant: {
					id: "8",
					slug: "m",
					value: "m",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "282aa381-26da-4e84-9b36-f61ed402ff55",
			quantity: 3,
			date_created: "2023-01-29T09:14:20.452Z",
			date_updated: "2023-02-02T07:08:57.061Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "1d9f0f8e-7dc5-4800-8016-5665b1768518",
			quantity: 3,
			date_created: "2023-01-30T05:05:42.809Z",
			date_updated: "2023-02-02T07:09:58.897Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "970da37d-e2fd-40f0-bad0-c2e286a4010c",
			quantity: 1,
			date_created: "2023-02-04T16:26:12.636Z",
			date_updated: "2023-02-09T05:29:10.979Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "e13651bb-07f4-42a7-ac69-2041aa35e215",
			quantity: 1,
			date_created: "2023-02-04T15:48:31.644Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "619ff2fc-ffb8-4756-baba-9a9ac7aeadc5",
			quantity: 1,
			date_created: "2023-02-04T14:56:29.472Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "da67dd80-a736-4fb5-ac66-a447e38f7733",
			quantity: 1,
			date_created: "2023-02-04T15:06:07.700Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "4860dc02-05b5-44ca-8e15-4b9ff82e78ae",
			quantity: 1,
			date_created: "2023-02-04T15:06:50.077Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "af44d9dc-d1c8-4376-9426-a9430f7046a7",
			quantity: 1,
			date_created: "2023-02-04T15:12:48.579Z",
			date_updated: "2023-02-04T15:49:45.031Z",
			product_item_id: {
				id: "1",
				SKU: "AO-00001",
				price: "200000",
				quantity: 20,
				status: "published",
				variant: {
					id: "7",
					slug: "s",
					value: "s",
					variation: {
						id: "3",
						name: "kích thước",
						slug: "kich-thuoc",
					},
				},
				cover_image: null,
				images: [],
				product: {
					id: "2",
					name: "Áo len",
					slug: "ao-len",
					cover_image: {
						id: "af6be75f-17bc-4007-962d-83b766f477e1",
					},
				},
			},
		},
		{
			id: "f05d504f-c924-4d1b-affc-9880a25ff3a1",
			quantity: 1,
			date_created: "2023-02-04T15:55:44.491Z",
			date_updated: "2023-02-04T16:09:15.986Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "b43977fc-3406-4a85-b47a-95e5ef2c9e19",
			quantity: 1,
			date_created: "2023-02-04T15:56:13.237Z",
			date_updated: "2023-02-04T16:09:15.986Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "ab3405d9-0a0b-4e9a-8de3-fca0499b80de",
			quantity: 1,
			date_created: "2023-02-04T16:22:37.801Z",
			date_updated: "2023-02-08T07:08:00.707Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
		{
			id: "d192a473-9c6e-45a2-8329-e8dd75198f2c",
			quantity: 1,
			date_created: "2023-02-04T16:29:55.647Z",
			date_updated: "2023-02-08T07:08:11.747Z",
			product_item_id: {
				id: "3",
				SKU: "NHAN-00001",
				price: "97000",
				quantity: 9,
				status: "published",
				variant: {
					id: "5",
					slug: "trang",
					value: "trắng",
					variation: {
						id: "1",
						name: "màu",
						slug: "mau",
					},
				},
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
				product: {
					id: "3",
					name: "nhẫn cánh hoa",
					slug: "nhan-canh-hoa",
					cover_image: {
						id: "bcfe62ab-24f7-4aa9-9ee9-12a449b6f0d4",
					},
				},
			},
		},
		{
			id: "0349df30-05af-45f7-8b44-13d8b5286cf3",
			quantity: 1,
			date_created: "2023-02-06T06:29:08.794Z",
			date_updated: "2023-02-08T07:08:22.320Z",
			product_item_id: {
				id: "7",
				SKU: "DC-00002",
				price: "87000",
				quantity: 12,
				status: "published",
				variant: null,
				cover_image: null,
				images: [],
				product: {
					id: "4",
					name: "dây chuyền hình trái tim",
					slug: "day-chuyen-hinh-trai-tim",
					cover_image: {
						id: "a62a7d06-c208-4d81-8439-0f5a83714786",
					},
				},
			},
		},
	] as CartItem[],
}
