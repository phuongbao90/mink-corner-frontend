import { useCountProducts } from "@/features/products"
import { useBoundStore } from "@/store/useStore"
import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
import { Pagination } from "@mantine/core"
import { useEffect, useMemo, useRef } from "react"

export const CollectionPagination = () => {
	const updatePageOptions = useBoundStore(
		(state) => state.actions.updatePageOptions
	)
	const fetchOptions = useBoundStore((state) => state.fetchOptions)

	const {
		data: productCount,
		isSuccess,
		isError,
	} = useCountProducts(fetchOptions)

	const memoCountRef = useRef<null | number>(null)

	const memoCount = useMemo(() => {
		if (productCount !== undefined) return productCount
		return memoCountRef.current
	}, [productCount])

	useEffect(() => {
		memoCountRef.current = memoCount
	}, [memoCount])

	if (isError) {
		return null
	}

	return (
		<Pagination
			total={Math.ceil(Number(memoCount) / COLLECTION_PRODUCT_LIMIT)}
			value={fetchOptions.page}
			onChange={updatePageOptions}
			disabled={!isSuccess}
			color="dark"
		/>
	)
}
