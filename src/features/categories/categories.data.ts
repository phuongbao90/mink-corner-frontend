import { Category } from "@/features/categories"

export const category_initial_data: Category[] = [
	{
		id: "7",
		category_name: "bông tai",
		category_slug: "bong-tai",
		status: "published",
		order: 1,
		icon: {
			id: "38a8bceb-9196-470b-87a3-3b3c56dae1dd",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			status: "published",
			category_slug: "trang-suc",
		},
	},
	{
		id: "5",
		category_name: "dây chuyền",
		category_slug: "day-chuyen",
		status: "published",
		order: 2,
		icon: {
			id: "6e458666-d4f6-46ee-ab33-20cba8781df6",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			status: "published",
			category_slug: "trang-suc",
		},
	},
	{
		id: "1",
		category_name: "nhẫn",
		category_slug: "nhan",
		status: "published",
		order: 3,
		icon: {
			id: "c2f43376-af72-4b5f-8c68-a893909656a3",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			status: "published",
			category_slug: "trang-suc",
		},
	},
	{
		id: "8",
		category_name: "lắc tay",
		category_slug: "lac-tay",
		status: "published",
		order: 4,
		icon: {
			id: "45457e06-5693-4b86-b0dc-6db51d6c91d5",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			status: "published",
			category_slug: "trang-suc",
		},
	},
	{
		id: "9",
		category_name: "lắc chân",
		category_slug: "lac-chan",
		status: "published",
		order: 5,
		icon: {
			id: "8d5cb123-de28-46af-ad97-3d8532f886bb",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			status: "published",
			category_slug: "trang-suc",
		},
	},
	{
		id: "3",
		category_name: "áo",
		category_slug: "ao",
		status: "published",
		order: 6,
		icon: {
			id: "da30e588-6e91-4370-ae03-ad2dc915ae44",
		},
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			status: "published",
			category_slug: "trang-phuc",
		},
	},
	{
		id: "10",
		category_name: "giày",
		category_slug: "giay",
		status: "published",
		order: 7,
		icon: {
			id: "86e6d02f-194a-4954-b666-8372fe789a5f",
		},
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			status: "published",
			category_slug: "trang-phuc",
		},
	},
	{
		id: "6",
		category_name: "nón",
		category_slug: "non",
		status: "published",
		order: 8,
		icon: {
			id: "a0e78a1d-257a-407d-bb5a-e89a28be7caa",
		},
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			status: "published",
			category_slug: "trang-phuc",
		},
	},
	{
		id: "4",
		category_name: "trang phục",
		category_slug: "trang-phuc",
		status: "published",
		order: null,
		icon: null,
		parent_category_id: null,
	},
	{
		id: "2",
		category_name: "trang sức",
		category_slug: "trang-suc",
		status: "published",
		order: null,
		icon: null,
		parent_category_id: null,
	},
]
