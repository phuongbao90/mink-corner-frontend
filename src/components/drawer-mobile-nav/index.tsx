import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import { IconImage } from "@/components/UI"
import { pageRoutes } from "@/constant"
import { useFetchCategories } from "@/features/categories"
import { useBoundStore } from "@/store/useStore"
import {
	Badge,
	Box,
	createStyles,
	Divider,
	Drawer,
	Group,
	NavLink,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

const useStyles = createStyles((theme) => ({
	root: {},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "16px 16px",
	},
	closeButton: {},
	title: {
		marginTop: 4,
	},
	body: {
		height: "100%",
	},
}))

export const DrawerMobileNav = () => {
	const isNavbarOpened = useBoundStore((s) => s.isNavbarOpened)
	const router = useRouter()
	const { classes } = useStyles()
	const toggleIsNavbarOpened = useBoundStore(
		(s) => s.actions.toggleIsNavbarOpened
	)
	const setCategoryFilter = useBoundStore((s) => s.actions.setCategoryFilter)

	const { data: categories, isSuccess: isCategoriesSuccess } =
		useFetchCategories()

	return (
		<Drawer
			opened={isNavbarOpened}
			classNames={{ ...classes }}
			onClose={() => toggleIsNavbarOpened(false)}
			position="left"
			overlayProps={{
				opacity: 0.55,
				blur: 2,
			}}
			size={"100%"}
			title={
				<Group>
					<Link href="/" aria-label="home-logo">
						<Image
							src={MinkCornerLogo}
							alt="Mink Corner logo"
							priority
							quality={100}
							sizes="10vw"
							width={80}
						/>
					</Link>

					<Title order={2} size="h3">
						Mink Corner
					</Title>
				</Group>
			}
		>
			<Box>
				<Box>
					<Title order={3} mb="xs" ml="xl">
						Danh mục
					</Title>

					{isCategoriesSuccess &&
						categories
							.filter((el) => !!el.parent_category_id)
							.map((cat, index) => (
								<Fragment key={index}>
									<NavLink
										variant="subtle"
										mb={8}
										ml="md"
										label={
											<Group>
												<Text fw={300} fz="md">
													{cat.category_name}
												</Text>
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
										onClick={() => {
											setCategoryFilter(cat.category_slug)
											router.push(pageRoutes.collection)
											toggleIsNavbarOpened(false)
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
									<Divider sx={{ borderColor: "#eaeaea" }} />
								</Fragment>
							))}
				</Box>
			</Box>
		</Drawer>
	)
}
