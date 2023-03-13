import { DirectusImage, IconImage } from "@/components/UI"
import { linkStyles } from "@/components/utils"
import { pageRoutes, PRODUCT_PLACEHOLDER_IMAGE_ID } from "@/constant"
import { useFetchCategories } from "@/features/categories"
import { useBoundStore } from "@/store/useStore"
import {
	Anchor,
	Badge,
	Box,
	Button,
	Center,
	Divider,
	Grid,
	Group,
	HoverCard,
	NavLink,
	Text,
} from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ChevronDown } from "react-feather"

export const CollectionDropdown = () => {
	const [categoryOnView, setCateogryOnView] = useState<string | undefined>(
		undefined
	)
	const router = useRouter()
	const { data: categories, isSuccess } = useFetchCategories()
	const setCategoryFilter = useBoundStore((s) => s.actions.setCategoryFilter)

	useEffect(() => {
		if (!categories) return
		setCateogryOnView(categories[0].cover_image?.id)
	}, [categories])

	return (
		<Box
			sx={(theme) => ({
				[theme.fn.smallerThan("xs")]: {
					display: "none",
				},
			})}
		>
			<HoverCard
				width={530}
				position="bottom-start"
				radius="md"
				shadow="md"
				withinPortal
			>
				<HoverCard.Target>
					<Center
						inline
						onClick={() => router.push("/collection")}
						sx={linkStyles}
					>
						<Text mr={4}>Bộ sưu tập</Text>

						<ChevronDown size={16} />
					</Center>
				</HoverCard.Target>

				<HoverCard.Dropdown sx={{ overflow: "hidden" }}>
					<Group position="apart" px="md">
						<Text fw={500}>Theo danh mục</Text>
						<Anchor
							fz="xs"
							component="button"
							onClick={() => router.push(pageRoutes.collection)}
						>
							Xem tất cả
						</Anchor>
					</Group>

					<Divider my="sm" mx="-md" color={"gray.2"} />

					<Grid gutter={8}>
						<Grid.Col span={5}>
							<Box>
								{isSuccess &&
									categories
										.filter((el) => el.parent_category_id)
										.map((cat) => (
											<NavLink
												onMouseOver={() =>
													setCateogryOnView(cat.cover_image?.id)
												}
												onClick={() => {
													router.push(pageRoutes.collection)
													setCategoryFilter(cat.category_slug)
												}}
												key={cat.id}
												label={
													<Group>
														<Text>{cat.category_name}</Text>
														{cat.promotion_item_id ? (
															<Badge
																color="red"
																c="white"
																variant="filled"
																size="xs"
															>
																SALE
															</Badge>
														) : null}
													</Group>
												}
												icon={
													<IconImage
														src={cat.icon?.id || PRODUCT_PLACEHOLDER_IMAGE_ID}
														alt="category icon image"
														width={20}
														height={20}
													/>
												}
											/>
										))}
							</Box>
						</Grid.Col>
						<Grid.Col span={7}>
							<Box sx={{ position: "relative", width: "100%", height: "100%" }}>
								<DirectusImage
									src={categoryOnView || PRODUCT_PLACEHOLDER_IMAGE_ID}
									alt="category cover image"
									sizes="40vw"
									fill
									style={{
										borderRadius: 8,
									}}
								/>
							</Box>
						</Grid.Col>
					</Grid>
					<Divider my="sm" mx="-md" color={"gray.2"} />
					<div>
						<Group position="apart">
							<div>
								<Text fw={500} fz="sm">
									Get started
								</Text>
								<Text size="xs" color="dimmed">
									Their food sources have decreased, and their numbers
								</Text>
							</div>
							<Button variant="default">Get started</Button>
						</Group>
					</div>
				</HoverCard.Dropdown>
			</HoverCard>
		</Box>
	)
}
