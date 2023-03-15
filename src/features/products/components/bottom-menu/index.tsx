import { DiscountBadge, QuantityInput } from "@/components"
import { OptionSelect } from "@/features/products/components/option-select"
import { useProductPrice } from "@/features/products/hooks"
import { Product, ProductItem } from "@/features/products/products.types"
import { useNotify } from "@/hooks"
import { useIsMobile } from "@/hooks/use-media-query"
import { useProductActions, useProductState } from "@/store/context"
import { useCartSidebar, useOverlayLoader } from "@/store/use-ui-store"
import { formatCurrency } from "@/utils"
import {
	Affix,
	Box,
	Button,
	Center,
	ColorSwatch,
	Group,
	rem,
	Select,
	Stack,
	Text,
	Title,
	Transition,
} from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"
import { forwardRef, useEffect } from "react"
import { ArrowRight } from "react-feather"

type PropsType = {
	product: Product
	selected_product_item: ProductItem | undefined
	handleAddToCart: ({
		callbackOnSettled,
		callbackOnSuccess,
	}: {
		callbackOnSettled?: () => void
		callbackOnSuccess?: () => void
	}) => void
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
	label: string
	value: string
	color_code?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
	({ label, value, color_code, ...other }: ItemProps, ref) => (
		<Center my={rem(10)} ref={ref} {...other}>
			{color_code ? (
				<ColorSwatch color={String(color_code)} size={30} />
			) : (
				<Text size="sm" fw={600}>
					{label}
				</Text>
			)}
		</Center>
	)
)

SelectItem.displayName = "SelectItem"

export const BottomMenu = ({
	product,
	selected_product_item,
	handleAddToCart,
}: PropsType) => {
	const {
		originalPrice,
		effectivePrice,
		isDiscounted,
		discountType,
		discountAmount,
		discountPercent,
	} = useProductPrice(selected_product_item, product.category.promotion_item_id)

	const [scroll] = useWindowScroll()

	const [, { toggle: toggleOverlay }] = useOverlayLoader()
	const notify = useNotify()
	const [, { open }] = useCartSidebar()
	const inStock = useProductState().inStock
	const quantity = useProductState().quantity
	const updateQuantity = useProductActions().updateQuantity
	const maxQuantityMet = useProductState().maxQuantityMet
	const { isMobile } = useIsMobile()

	useEffect(() => {
		if (isMobile && maxQuantityMet) {
			notify({
				type: "warning",
				title: "Đã đạt hạng mức tối đa",
			})
		}
	}, [isMobile, maxQuantityMet, notify])

	return (
		<Affix
			position={{ bottom: 0, right: 10, left: 10 }}
			sx={(theme) => ({
				[theme.fn.largerThan("xs")]: {
					display: "none",
				},
			})}
		>
			<Transition transition="slide-up" mounted={scroll.y < 800}>
				{(transitionStyles) => (
					<Stack
						px="md"
						py="sm"
						mih={rem(149)}
						style={transitionStyles}
						sx={{
							gap: 8,
							backgroundColor: "#fff",
							border: "1px solid #eaeaea",
							borderTopLeftRadius: 8,
							borderTopRightRadius: 8,
							boxShadow: `0px 0px 10px 0px rgba(0,0,0,0.1)`,
						}}
					>
						<Group position="apart">
							<Title order={4} size="h6" tt="uppercase">
								{product?.name}
							</Title>
							<Text c="gray.6" size={10}>
								{selected_product_item?.SKU || product.SKU}
							</Text>
						</Group>

						<Group align="baseline" spacing="xs">
							<Text size={rem(13)} fw="700" mih={22}>
								{formatCurrency(Number(effectivePrice))}
							</Text>

							{isDiscounted && (
								<Text
									size={rem(13)}
									fw="400"
									mih={22}
									td="line-through"
									c="gray.6"
								>
									{formatCurrency(Number(originalPrice))}
								</Text>
							)}

							{isDiscounted && (
								<DiscountBadge
									discountAmount={
										discountType === "percentage"
											? discountPercent + "%"
											: formatCurrency(discountAmount)
									}
								/>
							)}
						</Group>

						{product.product_item && product.product_item?.length > 1 && (
							<Box>
								<OptionSelect product={product} />
							</Box>
						)}

						<Group noWrap mt="auto" sx={{ gap: 0 }} align="center">
							<QuantityInput
								size="md"
								currentValue={quantity}
								handleUpdateQuantity={(nextQuantity: number) => {
									updateQuantity(nextQuantity)
								}}
								containerPropsStyles={{
									flex: "0 0 40%",
								}}
								inputPropStyles={{
									borderWidth: 0,
									padding: 0,
									width: 40,
									backgroundColor: "transparent",
									fontWeight: 600,
								}}
								buttonPropStyles={{
									borderRadius: 10,
									borderWidth: 1,
									marginLeft: 2,
									marginRight: 2,
								}}
							/>

							<Button
								fullWidth
								variant="filled"
								fw={400}
								size="md"
								sx={{ borderRadius: 16 }}
								rightIcon={<ArrowRight size={16} />}
								onClick={() => {
									if (!inStock) {
										notify({
											type: "error",
											title: "Hết hàng rồi bạn ơi",
										})
										return
									}

									toggleOverlay()
									handleAddToCart({
										callbackOnSuccess: () => {
											open()
										},
									})
								}}
								disabled={!selected_product_item}
							>
								{inStock ? "Thêm vào giỏ" : "Hết hàng"}
							</Button>
						</Group>
					</Stack>
				)}
			</Transition>
		</Affix>
	)
}
