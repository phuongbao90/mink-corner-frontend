import { pageRoutes } from "@/constant"
import { Product } from "@/features/products"
import { useBoundStore } from "@/store/useStore"
import {
	Anchor,
	Breadcrumbs,
	CSSObject,
	MantineTheme,
	rem,
	Text,
} from "@mantine/core"
import { useRouter } from "next/router"

export const ProductBreadcrumbs = ({ product }: { product?: Product }) => {
	const router = useRouter()
	const setCategoryFilter = useBoundStore((s) => s.actions.setCategoryFilter)

	const textStyles = (theme: MantineTheme): CSSObject => ({
		fontSize: rem(12),
		textTransform: "capitalize",
		color: theme.colors.dark,
		fontWeight: 500,
	})

	if (!product) return null

	return (
		<Breadcrumbs
			styles={{
				separator: {
					marginLeft: 2,
					marginRight: 2,
				},
				root: {
					width: "83vw",
				},
			}}
			separator={
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
						fill="currentColor"
					></path>
				</svg>
			}
		>
			<Anchor
				component="button"
				type="button"
				sx={textStyles}
				onClick={() => router.push("/")}
			>
				Trang chủ
			</Anchor>
			<Anchor
				component="button"
				type="button"
				sx={textStyles}
				onClick={() => {
					setCategoryFilter(product?.category.category_slug)
					router.push(pageRoutes.collection)
				}}
			>
				{product?.category.category_name}
			</Anchor>

			<Text sx={[textStyles]} fw={400} truncate>
				{product.name}
			</Text>
		</Breadcrumbs>
	)
}
