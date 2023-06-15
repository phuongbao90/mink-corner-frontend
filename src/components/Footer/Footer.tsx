import { pageRoutes } from "@/constant"
import { useGetAppConfigs } from "@/features/app"
import { useGetCategories } from "@/features/categories"
import { useCollectionStore } from "@/store/use-collection-store"
import {
	ActionIcon,
	AspectRatio,
	Box,
	Container,
	CSSObject,
	Grid,
	Group,
	List,
	MantineTheme,
	rem,
	SimpleGrid,
	Text,
	Title,
} from "@mantine/core"
import { useRouter } from "next/router"
import { Facebook, Instagram, Mail, MapPin, PhoneCall } from "react-feather"
import { Logo } from "@/components/logos/Logo"

const titleStyles = (theme: MantineTheme): CSSObject => ({
	fontSize: rem(24),
	fontWeight: 600,
	color: "#fff",
})
const textStyles = (theme: MantineTheme): CSSObject => ({
	fontSize: rem(16),
	fontWeight: 400,
	color: "#fff",
})

export const Footer = () => {
	const { data: appConfigs, isSuccess } = useGetAppConfigs()
	const router = useRouter()
	const { data: categories } = useGetCategories()
	const setCategoryFilter = useCollectionStore(
		(state) => state.actions.setCategoryFilter
	)

	return (
		<Box
			component="footer"
			sx={(theme) => ({
				backgroundColor: theme.colors.brown[5],
			})}
		>
			<Container size="lg" py={48} sx={{}}>
				<Grid gutter="xl">
					<Grid.Col span={12} xs={4}>
						<AspectRatio ratio={1} sx={{ position: "relative" }} w="50%">
							<Logo />
						</AspectRatio>
					</Grid.Col>
					<Grid.Col span={12} xs={4} order={2} orderXs={1}>
						<Box>
							<Title order={3} fw={400} size="h3" sx={titleStyles}>
								Liên hệ
							</Title>
							<List my="xl">
								{isSuccess && appConfigs.owner_phone_number && (
									<List.Item
										icon={<PhoneCall color="#fff" size={18} />}
										my="lg"
										sx={textStyles}
									>
										{appConfigs.owner_phone_number}
									</List.Item>
								)}
								{isSuccess && appConfigs.owner_email && (
									<List.Item
										icon={<Mail color="#fff" size={18} />}
										my="lg"
										sx={textStyles}
									>
										{appConfigs.owner_email}
									</List.Item>
								)}
								{isSuccess && appConfigs.store_address && (
									<List.Item
										icon={<MapPin color="#fff" size={18} />}
										my="lg"
										sx={textStyles}
									>
										{appConfigs.store_address}
									</List.Item>
								)}

								<Group>
									{isSuccess && appConfigs.facebook_url && (
										<ActionIcon
											component="a"
											href={appConfigs.facebook_url}
											target="_blank"
											variant="transparent"
										>
											<Facebook size={18} color="#fff" />
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
					<Grid.Col span={12} xs={4} order={1} orderXs={2}>
						<Title order={3} fw={400} size="h3" sx={titleStyles}>
							Danh mục
						</Title>
						<SimpleGrid mt="lg" cols={2}>
							{categories
								?.filter((el) => !!el.parent_category_id)
								.map((cat) => (
									<Text
										key={cat.id}
										variant="subtle"
										fw={400}
										fz="md"
										sx={[textStyles, { cursor: "pointer" }]}
										tt="uppercase"
										onClick={() => {
											setCategoryFilter(cat.category_slug)
											router.push(pageRoutes.collection)
										}}
									>
										{cat.category_name}
									</Text>
								))}
						</SimpleGrid>
					</Grid.Col>
				</Grid>
			</Container>
		</Box>
	)
}
