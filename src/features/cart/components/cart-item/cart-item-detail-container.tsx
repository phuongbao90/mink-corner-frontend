import { Grid } from "@mantine/core"
import { ReactNode } from "react"

export const CartItemDetailContainer = ({
	children,
}: {
	children: ReactNode | ReactNode[]
}) => {
	return <Grid.Col span={9}>{children}</Grid.Col>
}
