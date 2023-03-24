import { Product } from "@/features/products"
import {
	Button,
	CheckIcon,
	ColorSwatch,
	CSSObject,
	Group,
	MantineTheme,
	Stack,
	Text,
} from "@mantine/core"
import isEmpty from "lodash/isEmpty"
import uniqBy from "lodash/uniqBy"
import { useProductContext } from "@/store/context"
import tinycolor from "tinycolor2"
import { X } from "react-feather"

type Props = {
	product: Product | undefined
}

const iconStyles = (theme: MantineTheme): CSSObject => ({
	cursor: "pointer",
	borderRadius: "50%",
	width: 26,
	height: 26,
	[theme.fn.largerThan("xs")]: {
		width: 34,
		height: 34,
	},
})

const labelStyles = (theme: MantineTheme): CSSObject => ({
	fontSize: 13,
	flex: "0 0 21%",
	[theme.fn.largerThan("xs")]: {
		fontSize: 16,
		flex: "0 0 25%",
	},
})

export const OptionSelect = ({ product }: Props) => {
	const selectedOptions = useProductContext((s) => s.selectedOptions)
	const selectedSizeId = selectedOptions?.get("size")
	const selectedColorId = selectedOptions?.get("color")

	const updateSelectedOptions = useProductContext(
		(s) => s.actions.updateSelectedOptions
	)

	function disableColorButtons(colorId: string | undefined) {
		if (!selectedSizeId || !colorId) return false

		return !product?.product_item?.find(
			(item) => item.size?.id === selectedSizeId && item.color?.id === colorId
		)
	}
	function disableSizeButtons(sizeId: string | undefined): boolean {
		if (!selectedColorId || !sizeId) return false

		return !product?.product_item?.find(
			(item) => item.color?.id === selectedColorId && item.size?.id === sizeId
		)
	}

	const uniqColors = uniqBy(
		product?.product_item?.map((el) => el.color),
		"id"
	)
	const uniqSizes = uniqBy(
		product?.product_item?.map((el) => el.size),
		"id"
	)

	if (!product) return null

	return (
		<Stack
			sx={(theme) => ({
				gap: 10,
				[theme.fn.largerThan("xs")]: {
					gap: 20,
				},
			})}
		>
			{!isEmpty(product.filterable_colors) && (
				<Group>
					<Text sx={labelStyles}>Màu</Text>
					<Group>
						{uniqColors?.map((item, index) => {
							const selectedColorId = selectedOptions?.get("color")
							const isActive = selectedColorId === item?.id
							const isDisabled = disableColorButtons(item?.id)
							const colorCode = item?.color_code || "transparent"
							const isColorDark = tinycolor(colorCode).isDark()

							return (
								<ColorSwatch
									key={index}
									color={colorCode}
									component="button"
									onClick={() => {
										if (!item?.id) return
										updateSelectedOptions("color", item?.id)
									}}
									sx={[
										iconStyles,
										{
											color: tinycolor(colorCode).isDark() ? "#fff" : "#000",
										},
									]}
									disabled={isDisabled}
								>
									{isDisabled && (
										<X width={16} color={isColorDark ? "#fff" : "#000"} />
									)}
									{isActive && <CheckIcon width={10} />}
								</ColorSwatch>
							)
						})}
					</Group>
				</Group>
			)}
			{!isEmpty(product.filterable_sizes) && (
				<Group>
					<Text sx={labelStyles}>Kích thước</Text>
					<Group>
						{uniqSizes?.map((item, index) => {
							const isActive = selectedSizeId === item?.id
							return (
								<Button
									key={index}
									compact
									variant={isActive ? "filled" : "subtle"}
									onClick={() => {
										if (!item?.id) return
										updateSelectedOptions("size", item?.id)
									}}
									disabled={disableSizeButtons(item?.id)}
									sx={[iconStyles]}
								>
									{item?.title}
								</Button>
							)
						})}
					</Group>
				</Group>
			)}
		</Stack>
	)
}
