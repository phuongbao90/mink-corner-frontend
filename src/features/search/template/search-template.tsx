import { ProductList } from "@/components"
import { CollectionTemplate } from "@/features/collections"
import { useGetColors, useGetFilteredProducts } from "@/features/products"
import { SearchInput } from "@/features/search/component"
import { useCollectionStore } from "@/store/use-collection-store"
import {
	Box,
	Center,
	ColorSwatch,
	Container,
	Divider,
	Grid,
	Loader,
	NavLink,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
	rem,
} from "@mantine/core"
import Image from "next/image"

export const SearchTemplate = () => {
	const fetchOptions = useCollectionStore((state) => state.fetchOptions)
	const setColorFilter = useCollectionStore(
		(state) => state.actions.uppdateColorFilter
	)
	const {
		data: products,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetFilteredProducts(!!fetchOptions.search ? fetchOptions : undefined)
	const { data: colors, isSuccess: isColorSuccess } = useGetColors()
	const hasUserInputAnything = !!fetchOptions.search
	const productsFound = !isLoading && products && products?.length > 0

	const renderContent = () => {
		if (isFetching) {
			return (
				<Center mt={{ base: 120, md: 200 }}>
					<Loader size="xl" variant="dots" />
				</Center>
			)
		}

		return (
			<Container size="lg" py="xl">
				<Grid>
					<Grid.Col
						span={0}
						md={3}
						sx={(theme) => ({
							display: "none",
							[theme.fn.largerThan("md")]: {
								display: "block",
							},
						})}
					>
						<Paper pr="xl">
							<Title order={2} size="h3" mb="lg">
								Bộ lọc
							</Title>
							<Divider color="gray.3" />
							<Box mt="xl">
								<Title order={3} size="h5" mb="md">
									Màu sắc
								</Title>
								<Box>
									{isColorSuccess &&
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
													setColorFilter(color.id)
												}}
												icon={
													<ThemeIcon color="tranparent">
														<ColorSwatch
															w={24}
															h={24}
															color={color.color_code}
														/>
													</ThemeIcon>
												}
											/>
										))}
								</Box>
							</Box>
						</Paper>
					</Grid.Col>
					<Grid.Col span={12} md={9}>
						{productsFound ? (
							<ProductList
								products={products}
								isSuccess={isSuccess}
								isLoading={isLoading}
								span={{
									base: 6,
									xs: 4,
									sm: 3,
								}}
								limit={12}
							/>
						) : (
							<Box
								sx={(theme) => ({
									[theme.fn.largerThan("xs")]: {
										width: "70%",
									},
								})}
							>
								<Box
									sx={(theme) => ({
										aspectRatio: "1.4",
										position: "relative",
									})}
								>
									<Image
										src={"/images/no-product-1.png"}
										alt="no-product-found-image"
										fill
									/>
								</Box>
								<Text fw={500} fz="xl" align="center">
									Không tìm thấy sản phẩm
								</Text>
							</Box>
						)}
					</Grid.Col>
				</Grid>
			</Container>
		)
	}

	return (
		<Box>
			<Stack
				py={{ base: 30, xs: 50 }}
				sx={(theme) => ({
					backgroundColor: theme.colors.brown?.[0],
					alignItems: "center",
				})}
			>
				{hasUserInputAnything ? (
					<Title order={1} size="h2" mb="xs" align="center">
						Kết quả cho từ khoá &quot;{fetchOptions.search}&quot;
					</Title>
				) : (
					<Title order={1}>Tìm kiếm</Title>
				)}
				<SearchInput isLoading={isFetching} />
			</Stack>

			<Container my="xl" size="xl">
				{hasUserInputAnything ? <CollectionTemplate /> : null}
			</Container>
		</Box>
	)
}
