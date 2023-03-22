import {
	BACKEND_URL,
	DEFAULT_SEO_DESCRIPTION,
	LOGO_1_1_FILE_ID,
	SITE_URL,
} from "@/constant"
import { AppConfig } from "@/features/app"
import { LocalBusinessJsonLd, LogoJsonLd, OrganizationJsonLd } from "next-seo"
import { ReactNode } from "react"

type PropsType = {
	children?: ReactNode
	appConfigs: AppConfig | undefined
}

export const BaseHead = ({ children, appConfigs }: PropsType) => {
	const {
		logo_1_1,
		store_address,
		store_name,
		address_locality,
		address_region,
		postal_code,
		owner_phone_number,
		owner_email,
		owner_name,
		latitude,
		longitude,
	} = appConfigs || {}

	return (
		<>
			<LogoJsonLd
				logo={`${BACKEND_URL}/assets/${
					logo_1_1?.id || LOGO_1_1_FILE_ID
				}?quality=80`}
				url={SITE_URL}
			/>
			<OrganizationJsonLd
				type="Corporation"
				name={store_name || "Mink's Corner"}
				id={SITE_URL}
				logo={`${BACKEND_URL}/assets/${
					logo_1_1?.id || LOGO_1_1_FILE_ID
				}?quality=80`}
				url={SITE_URL}
				address={{
					streetAddress:
						store_address ||
						"4 Nguyen Thai Binh street, Ward 4, Tan Binh District",
					addressLocality: address_locality || "Ho Chi Minh",
					addressRegion: address_region || "HCM",
					postalCode: postal_code || "71010",
					addressCountry: "VN",
				}}
				contactPoint={[
					{
						telephone: owner_phone_number || "+84366108404",
						contactType: "customer service",
						email: owner_email || "minkcorner@gmail.com",
						areaServed: "VN",
						availableLanguage: "Vietnamese",
					},
				]}
			/>
			<LocalBusinessJsonLd
				type="Store"
				id={SITE_URL}
				name={store_name || "Mink's Corner"}
				description={DEFAULT_SEO_DESCRIPTION}
				telephone={owner_phone_number || "+84366108404"}
				email={owner_email || "minkcorner@gmail.com"}
				founder={owner_name || "Đặng Thị Minh Thu"}
				address={{
					streetAddress:
						store_address ||
						"4 Nguyen Thai Binh street, Ward 4, Tan Binh District",
					addressLocality: address_locality || "Ho Chi Minh",
					addressRegion: address_region || "HCM",
					postalCode: postal_code || "71010",
					addressCountry: "VN",
				}}
				geo={{
					latitude: latitude || "10.796360",
					longitude: longitude || "106.650429",
				}}
				openingHours={[
					{
						opens: "09:00",
						closes: "21:00",
						dayOfWeek: [
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						],
						validFrom: "2023-03-13",
					},
				]}
				priceRange="$"
				makesOffer={[
					{
						priceSpecification: {
							type: "UnitPriceSpecification",
							priceCurrency: "VND",
							price: "29000-199000",
						},
						itemOffered: {
							name: "Trang sức, phụ kiện nữ",
							description: "Cửa hàng trang sức & phụ kiện giá phải chăng",
						},
					},
				]}
			/>
			{children}
		</>
	)
}
