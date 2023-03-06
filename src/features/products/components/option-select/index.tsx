import { Product } from "@/features/products"
import {
	Button,
	CheckIcon,
	ColorSwatch,
	Group,
	Stack,
	Text,
} from "@mantine/core"
import { isEmpty, uniqBy } from "lodash"
import { useProductContext } from "@/store/context"
import tinycolor from "tinycolor2"
import { X } from "react-feather"

type Props = {
	product: Product | undefined
}

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
	function getLabel(optionLabel: "size" | "color", optionId?: string): string {
		if (!optionLabel || !optionId || !product?.product_item) return ""

		const found = product?.product_item.find(
			(el) => el[optionLabel]?.id === optionId
		)

		if (!found) return ""
		const title = found?.[optionLabel]?.title

		return title || ""
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
		<Stack>
			{!isEmpty(product.filterable_colors) && (
				<Stack>
					<Text>
						Màu:
						<Text ml="md" fw={500} span>
							{getLabel("color", selectedColorId)}
						</Text>
					</Text>
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
										if (item?.id) {
											updateSelectedOptions("color", item?.id)
										}
									}}
									sx={{
										color: tinycolor(colorCode).isDark() ? "#fff" : "#000",
										cursor: "pointer",
									}}
									disabled={isDisabled}
									mr="xs"
								>
									{isDisabled && (
										<X width={16} color={isColorDark ? "#fff" : "#000"} />
									)}
									{isActive && <CheckIcon width={10} />}
								</ColorSwatch>
							)
						})}
					</Group>
				</Stack>
			)}
			{!isEmpty(product.filterable_sizes) && (
				<Stack mt="xs">
					<Text>
						Kích thước:
						<Text ml="md" fw={500} span>
							{getLabel("size", selectedSizeId)}
						</Text>
					</Text>
					<Group>
						{uniqSizes?.map((item, index) => {
							const isActive = selectedSizeId === item?.id
							return (
								<Button
									key={index}
									compact
									variant="subtle"
									color={isActive ? "indigo" : "dark"}
									onClick={() => {
										if (item?.id) {
											updateSelectedOptions("size", item?.id)
										}
									}}
									disabled={disableSizeButtons(item?.id)}
									mr="xs"
								>
									{item?.title}
								</Button>
							)
						})}
					</Group>
				</Stack>
			)}
		</Stack>
	)
}
