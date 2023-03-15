import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import { IconImage } from "@/components/UI"
import { pageRoutes } from "@/constant"
import { useFetchCategories } from "@/features/categories"
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
import { useRouter } from "next/router"
import { Fragment } from "react"
import { useMobileNavbar } from "@/store/use-ui-store"
import { useCollectionStore } from "@/store/use-collection-store"

const useStyles = createStyles((theme) => ({
	root: {},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "8px 16px",
		zIndex: 9,
		borderBottom: 1,
		borderBottomColor: "#eaeaea",
		borderBottomStyle: "solid",
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
	const router = useRouter()
	const { classes } = useStyles()
	const [isMobileNavbarOpened, { close: closeMobileNavbar }] = useMobileNavbar()

	const setCategoryFilter = useCollectionStore(
		(s) => s.actions.setCategoryFilter
	)

	const { data: categories, isSuccess: isCategoriesSuccess } =
		useFetchCategories()

	return (
		<Drawer
			opened={isMobileNavbarOpened}
			classNames={{ ...classes }}
			onClose={() => closeMobileNavbar()}
			position="left"
			overlayProps={{
				opacity: 0.55,
				blur: 2,
			}}
			size={"100%"}
			title={
				<Group>
					<Image
						src={MinkCornerLogo}
						alt="Mink Corner logo"
						priority
						quality={100}
						sizes="10vw"
						width={80}
					/>

					<Title order={2} size="h3">
						Mink Corner
					</Title>
				</Group>
			}
		>
			<Box>
				<Box>
					<Title
						order={3}
						my="md"
						ml="xl"
						c="red"
						onClick={() => {
							router.push(pageRoutes.promotion)
							closeMobileNavbar()
						}}
					>
						SALE!
					</Title>
				</Box>
				{/* <Divider my="sm" /> */}
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
											closeMobileNavbar()
											setCategoryFilter(cat.category_slug)
											router.push(pageRoutes.collection)
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
