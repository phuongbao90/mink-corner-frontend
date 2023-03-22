import { BANNER_ITEM_FRAGMENT } from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

export const GET_APP_CONFIGS = gql`
	query GetAppConfigs {
		app_configs {
			id
			product_detail_policies
			is_freeship_program_on
			freeship_target
			freeship_limit
			momo_phone_number
			owner_name
			owner_phone_number
			is_momo_payment_enabled
			owner_payment_info
			facebook_url
			instagram_url
			owner_email
			store_address
			postal_code
			address_locality
			address_region
			latitude
			longitude
			store_name
			logo_1_1 {
				id
			}
			logo_16_9 {
				id
			}
			logo_og {
				id
			}
		}
	}
`

export const GET_SEO_META_QUERY = gql`
	query GetSeoMetaQuery($page: String!) {
		seo_meta(filter: { status: { _eq: "published" }, page: { _eq: $page } }) {
			title
			description
			keywords
			page
			keywords
			og_images {
				directus_files_id {
					id
					title
					tags
				}
			}
		}
	}
`
