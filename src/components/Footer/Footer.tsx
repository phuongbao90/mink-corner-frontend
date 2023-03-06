import { IconImage } from "@/components/UI"
import { pageRoutes } from "@/constant"
import { useGetAppConfigs } from "@/features/app"
import { useFetchCategories } from "@/features/categories"
import { useBoundStore } from "@/store/useStore"
import {
	ActionIcon,
	AspectRatio,
	Box,
	Container,
	Grid,
	Group,
	List,
	NavLink,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Facebook, Instagram, Mail, MapPin, PhoneCall } from "react-feather"
import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"

export const Footer = () => {
	const { data: appConfigs, isSuccess } = useGetAppConfigs()
	const router = useRouter()
	const { data: categories, isSuccess: isCategoriesSuccess } =
		useFetchCategories()
	const setCategoryFilter = useBoundStore(
		(state) => state.actions.setCategoryFilter
	)

	return (
		<footer>
			<Container size="lg" py={48} sx={{}}>
				<Grid gutter="xl">
					<Grid.Col span={12} sm={6} lg={4} order={2} orderXs={1}>
						<Box>
							<AspectRatio ratio={1} sx={{ position: "relative" }} w="50%">
								<Image
									src={MinkCornerLogo}
									alt="Mink Corner logo"
									priority
									quality={100}
									sizes="20vw"
								/>
							</AspectRatio>
							<List my="xl" ml="md">
								{isSuccess && appConfigs.owner_phone_number && (
									<List.Item icon={<PhoneCall color="gray" />} my="lg">
										{appConfigs.owner_phone_number}
									</List.Item>
								)}
								{isSuccess && appConfigs.owner_email && (
									<List.Item icon={<Mail color="gray" />} my="lg">
										{appConfigs.owner_email}
									</List.Item>
								)}
								{isSuccess && appConfigs.store_address && (
									<List.Item icon={<MapPin color="gray" />} my="lg">
										{appConfigs.store_address}
									</List.Item>
								)}

								<Group>
									{isSuccess && appConfigs.facebook_url && (
										<ActionIcon
											component="a"
											href={appConfigs.facebook_url}
											target="_blank"
										>
											<Facebook />
										</ActionIcon>
									)}
									{isSuccess && appConfigs.instagram_url && (
										<ActionIcon
											component="a"
											href={appConfigs.instagram_url}
											target="_blank"
										>
											<Instagram />
										</ActionIcon>
									)}
								</Group>
							</List>
						</Box>
					</Grid.Col>
					<Grid.Col span={12} sm={6} lg={4} order={1} orderXs={2}>
						<Box>
							<Title order={3} fw={400} size="h3" ml={{ base: "xs" }}>
								Danh mục
							</Title>
							<SimpleGrid mt="lg" cols={2}>
								{categories
									?.filter((el) => !!el.parent_category_id)
									.map((cat) => (
										<NavLink
											key={cat.id}
											variant="subtle"
											label={
												<Text fw={300} fz="md">
													{cat.category_name}
												</Text>
											}
											onClick={() => {
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
									))}
							</SimpleGrid>
						</Box>
					</Grid.Col>

					<Grid.Col span={12} sm={6} lg={4} order={3} orderXs={3}>
						<Stack>
							<Title order={3} fw={400} size="h3" ml={{ base: "xs" }}>
								FACEBOOK FEEDS
							</Title>
							{/* <Heading content="FANPAGE" /> */}
							<div>FACEBOOK Banner here</div>
						</Stack>
					</Grid.Col>
				</Grid>
			</Container>
		</footer>
	)
}
