import { gql } from "graphql-request"

export const GetShoppingUserQuery = gql`
	query GetShoppingUserQuery($user_id: ID!) {
		shopping_user: shopping_user_by_id(id: $user_id) {
			id
			anonymous
			device_id
			email_address
			phone_number
			status
			cart {
				id
				device_id
				# date_created
				# date_updated
				items {
					id
					quantity
					date_created
					date_updated
					sort
					product_item_id {
						id
						SKU
						cover_image {
							id
						}
						id
						images {
							directus_files_id {
								id
							}
						}
						price
						quantity
						sort
						status
						variant {
							slug
							value
							variation {
								name
								slug
							}
						}
					}
				}
				items_func {
					count
				}
			}
		}
	}
`

export const CreateShoppingUserMutation = gql`
	mutation CreateShoppingUserMutation {
		shopping_user: create_shopping_user_item(data: { anonymous: true }) {
			id
			anonymous
			device_id
			email_address
			phone_number
			status
			cart {
				id
				device_id
				date_created
				date_updated
				items {
					id
					quantity
					product_item_id {
						SKU
						cover_image {
							id
						}
						id
						images {
							directus_files_id {
								id
							}
						}
						price
						quantity
						sort
						status
						variant {
							slug
							value
							variation {
								name
								slug
							}
						}
					}
				}
				items_func {
					count
				}
			}
		}
	}
`
