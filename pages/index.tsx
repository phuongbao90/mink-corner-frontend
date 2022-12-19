import { GridBanner } from "components/common/GridBanner"
import { ProductView } from "components/product/ProductView"
import { Grid } from "components/ui/Grid"
import { Container } from "components/ui/Container"
import { useGetProducts } from "lib/react-query/queries"

export default function HomePage() {
	const { data, isError, error } = useGetProducts()

	console.log("data", data)

	return (
		<div className="w-full">
			<GridBanner />
			<Container>
				<Grid>xxxx</Grid>
			</Container>
		</div>
	)
}
