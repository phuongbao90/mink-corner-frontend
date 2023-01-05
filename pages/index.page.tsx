import { GridBanner } from "components/common/GridBanner"
import { Container } from "components/ui/Container"
import { useGetProducts } from "lib/react-query/queries"
import { ProductList } from "components/product/ProductList"

export default function HomePage() {
	const { data, isError, error } = useGetProducts()

	return (
		<div className="w-full">
			<GridBanner />
			<Container>
				<ProductList />
			</Container>
		</div>
	)
}
