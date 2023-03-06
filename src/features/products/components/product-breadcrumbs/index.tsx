import { pageRoutes } from "@/constant"
import { Product } from "@/features/products"
import { useBoundStore } from "@/store/useStore"
import { Anchor, Breadcrumbs, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"

export const ProductBreadcrumbs = ({ product }: { product?: Product }) => {
	const router = useRouter()
	const setCategoryFilter = useBoundStore((s) => s.actions.setCategoryFilter)

	if (!product) return null

	return (
		<Breadcrumbs separator="/">
			<Anchor
				fw={500}
				component="button"
				type="button"
				onClick={() => router.push("/")}
			>
				Trang chủ
			</Anchor>
			<Anchor
				fw={500}
				component="button"
				type="button"
				onClick={() => {
					setCategoryFilter(product?.category.category_slug)
					router.push(pageRoutes.collection)
				}}
			>
				{product?.category.category_name}
			</Anchor>
			<Text fw={400} lineClamp={1}>
				{product.name}
			</Text>
		</Breadcrumbs>
	)
}
