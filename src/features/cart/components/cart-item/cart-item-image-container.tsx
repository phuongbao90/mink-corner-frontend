import { Grid } from "@mantine/core"
import { ReactNode } from "react"

const CartItemImageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Grid.Col sx={{ position: "relative" }} span={3}>
			{children}
		</Grid.Col>
	)
}

export { CartItemImageContainer }
