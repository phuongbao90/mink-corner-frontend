import { Category } from "@/features/categories"

export const category_initial_data: Category[] = [
	{
		id: "1",
		category_name: "nhẫn",
		category_slug: "nhan",
		order: 3,
		icon: {
			id: "c2f43376-af72-4b5f-8c68-a893909656a3",
		},
		cover_image: {
			id: "399963df-6ed3-4c2a-8379-43328c4b5766",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
		},
		promotion_item_id: null,
	},
	{
		id: "2",
		category_name: "trang sức",
		category_slug: "trang-suc",
		order: null,
		icon: null,
		cover_image: null,
		parent_category_id: null,
		promotion_item_id: null,
	},
	{
		id: "3",
		category_name: "áo",
		category_slug: "ao",
		order: 6,
		icon: {
			id: "da30e588-6e91-4370-ae03-ad2dc915ae44",
		},
		cover_image: null,
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			category_slug: "trang-phuc",
		},
		promotion_item_id: null,
	},
	{
		id: "4",
		category_name: "trang phục",
		category_slug: "trang-phuc",
		order: null,
		icon: null,
		cover_image: null,
		parent_category_id: null,
		promotion_item_id: null,
	},
	{
		id: "5",
		category_name: "dây chuyền",
		category_slug: "day-chuyen",
		order: 2,
		icon: {
			id: "6e458666-d4f6-46ee-ab33-20cba8781df6",
		},
		cover_image: {
			id: "da20cd9a-b1a6-4dfb-aee8-31be07a1bcb4",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
		},
		promotion_item_id: null,
	},
	{
		id: "6",
		category_name: "nón",
		category_slug: "non",
		order: 8,
		icon: {
			id: "a0e78a1d-257a-407d-bb5a-e89a28be7caa",
		},
		cover_image: null,
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			category_slug: "trang-phuc",
		},
		promotion_item_id: null,
	},
	{
		id: "7",
		category_name: "bông tai",
		category_slug: "bong-tai",
		order: 1,
		icon: {
			id: "38a8bceb-9196-470b-87a3-3b3c56dae1dd",
		},
		cover_image: {
			id: "3750f571-dcc4-4d24-b7a5-1557dcffd3d2",
		},
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
		},
		promotion_item_id: null,
	},
	{
		id: "8",
		category_name: "lắc tay",
		category_slug: "lac-tay",
		order: 4,
		icon: {
			id: "45457e06-5693-4b86-b0dc-6db51d6c91d5",
		},
		cover_image: null,
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
		},
		promotion_item_id: null,
	},
	{
		id: "9",
		category_name: "lắc chân",
		category_slug: "lac-chan",
		order: 5,
		icon: {
			id: "8d5cb123-de28-46af-ad97-3d8532f886bb",
		},
		cover_image: null,
		parent_category_id: {
			id: "2",
			category_name: "trang sức",
			category_slug: "trang-suc",
		},
		promotion_item_id: null,
	},
	{
		id: "10",
		category_name: "giày",
		category_slug: "giay",
		order: 7,
		icon: {
			id: "86e6d02f-194a-4954-b666-8372fe789a5f",
		},
		cover_image: null,
		parent_category_id: {
			id: "4",
			category_name: "trang phục",
			category_slug: "trang-phuc",
		},
		promotion_item_id: null,
	},
]
