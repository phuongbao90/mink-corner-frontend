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
		}
	}
`
