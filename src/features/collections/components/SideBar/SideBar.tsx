import { IconImage } from "@/components"
import { useFetchCategories } from "@/features/categories"
import { useGetColors } from "@/features/products"
import { useCollectionStore } from "@/store/use-collection-store"
import {
	Badge,
	Box,
	Button,
	ColorSwatch,
	Divider,
	Flex,
	Group,
	NavLink,
	NumberInput,
	SimpleGrid,
	Skeleton,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core"
import { useState } from "react"

export const SideBar = () => {
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)
	const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined)
	const { data: categories, isSuccess } = useFetchCategories()
	const {
		data: colors,
		isSuccess: isColorsSuccess,
		isLoading: isColorsLoading,
	} = useGetColors()

	const fetchOptions = useCollectionStore((s) => s.fetchOptions)

	const {
		updateCategoryFilter,
		uppdateColorFilter,
		updatePriceFilter,
		clearPriceFilter,
		toggleIsCollectionSidebarOpen,
	} = useCollectionStore((state) => state.actions)

	const handleUpdateSortablePrice = async () => {
		await Promise.resolve()
			.then(validateInputs)
			.then(() => updatePriceFilter(min, max))
			.catch((err) => console.error(err))
	}

	// const validateInputs = (_min: number, _max: number) => {
	const validateInputs = () => {
		if (min < 0 || max < 0 || min > max) {
			setErrorMsg("Giá trị không hợp lệ")
			throw "Giá trị không hợp lệ"
		}
		setErrorMsg(undefined)
	}

	if (isSuccess) {
		return (
			<Box
				sx={{
					backgroundColor: "#ffffff",
					height: "100%",
					borderRadius: 16,
					borderColor: "#eaeaea",
				}}
				px="xs"
				py="xl"
			>
				<Box>
					<Title fw={400} order={4} mb="sm" ml="sm">
						Danh mục
					</Title>
					<Box ml="sm">
						{categories
							?.filter((el) => !!el.parent_category_id)
							.map((cat) => (
								<NavLink
									key={cat.id}
									mb={4}
									variant="subtle"
									label={
										<Group noWrap>
											<Text fw={500} fz="md">
												{cat.category_name}
											</Text>
											{cat.promotion_item_id ? (
												<Badge color="red" c="white" variant="filled" size="xs">
													SALE
												</Badge>
											) : null}
										</Group>
									}
									active={
										fetchOptions.filter?.category?.category_slug._eq ===
										cat.category_slug
									}
									onClick={() => {
										updateCategoryFilter(cat.category_slug)
										toggleIsCollectionSidebarOpen(false)
									}}
									icon={
										<ThemeIcon color="tranparent">
											<IconImage
												alt="category-icon"
												src={String(cat.icon?.id)}
												width={23}
												height={23}
												fill={false}
											/>
										</ThemeIcon>
									}
								/>
							))}
					</Box>
				</Box>

				<Divider my="md" sx={{ borderColor: "#eaeaea" }} />

				<Box>
					<Title fw={400} order={4} mb="sm" ml="sm">
						Màu sắc
					</Title>
					<Box ml="sm">
						{isColorsLoading &&
							Array(4)
								.fill(undefined)
								.map((el, index) => (
									<Box key={index} mb={18} ml="sm" mt={18}>
										<Flex align="center">
											<Skeleton width={26} height={26} radius="xl" mr="sm" />
											<Skeleton width="40%" h={20} radius="md" />
										</Flex>
									</Box>
								))}
						{isColorsSuccess &&
							colors.map((color) => (
								<NavLink
									key={color.id}
									variant="subtle"
									label={
										<Text fw={500} fz="md">
											{color.title}
										</Text>
									}
									active={
										fetchOptions.filter?.filterable_colors?._contains ===
										color.id
									}
									onClick={() => {
										uppdateColorFilter(String(color.id))
										toggleIsCollectionSidebarOpen(false)
									}}
									icon={
										<ThemeIcon color="tranparent">
											<ColorSwatch w={24} h={24} color={color.color_code} />
										</ThemeIcon>
									}
								/>
							))}
					</Box>
				</Box>

				<Divider my="md" sx={{ borderColor: "#eaeaea" }} />

				<Box pb="xl">
					<Group position="apart" align="baseline">
						<Title fw={400} order={4} mb="sm" ml="sm">
							Giá
						</Title>
						<Button
							c="red.4"
							variant="white"
							size="xs"
							onClick={() => {
								clearPriceFilter()
								setMin(0)
								setMax(0)
							}}
						>
							Bỏ lọc
						</Button>
					</Group>
					<SimpleGrid cols={2}>
						<NumberInput
							label="Từ"
							defaultValue={0}
							value={min}
							onChange={(val) => setMin(Number(val))}
							step={1000}
							parser={(value) =>
								value ? value.replace(/\$\s?|(,*)/g, "") : ""
							}
							formatter={(value) =>
								value
									? !Number.isNaN(parseFloat(value))
										? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
										: ""
									: ""
							}
						/>
						<NumberInput
							label="Đến"
							defaultValue={0}
							step={1000}
							value={max}
							onChange={(val) => setMax(Number(val))}
							parser={(value) =>
								value ? value.replace(/\$\s?|(,*)/g, "") : ""
							}
							formatter={(value) =>
								value
									? !Number.isNaN(parseFloat(value))
										? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
										: ""
									: ""
							}
						/>
					</SimpleGrid>
					<Group position="apart" mt={4}>
						<Box>
							{!!errorMsg && (
								<Text c="red.6" size="xs">
									{errorMsg}
								</Text>
							)}
						</Box>
						<Button
							size="xs"
							variant="white"
							onClick={() => {
								handleUpdateSortablePrice()
								toggleIsCollectionSidebarOpen(false)
							}}
						>
							Áp dụng
						</Button>
					</Group>
				</Box>
			</Box>
		)
	}

	return null
}
