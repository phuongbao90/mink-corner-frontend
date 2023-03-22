import { CarouselWrapper } from "@/components/carousel"
import { DirectusImage } from "@/components/UI"
import { bannerNames, pageRoutes } from "@/constant"
import { useGetBanner } from "@/features/banners"
import { Box, Button, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"

export const BannerHome = () => {
	const router = useRouter()
	const { data: banner, isSuccess } = useGetBanner(bannerNames.homeTopBanner)

	if (isSuccess) {
		return (
			<CarouselWrapper
				withDots
				slides={banner.items.map(
					(el) => el?.banner_item_id?.cover_image?.id || ""
				)}
				carouselOptions={{
					slidesToScroll: 1,
				}}
			>
				{banner?.items.map((item, index) => {
					const {
						banner_item_id: { title, subtitle, link, cover_image },
					} = item
					const linkItem = link[0]
					let link_to_url: string | undefined
					let imageId
					if (linkItem.collection === "product") {
						link_to_url = `${pageRoutes.products}/${linkItem.item.slug}`
						imageId = cover_image?.id || linkItem.item.cover_image.id
					}
					if (linkItem.collection === "category") {
						link_to_url = `${pageRoutes.collection}`
						imageId = cover_image?.id || linkItem.item.cover_image.id
					}

					if (imageId) {
						return (
							<Box
								key={index}
								sx={{
									position: "relative",
									minHeight: "75vh",
									maxHeight: "80vh",
									flex: "0 0 100%",
								}}
							>
								<DirectusImage
									src={imageId}
									alt="slideshow"
									style={{
										objectFit: "cover",
										filter: "brightness(0.65)",
									}}
									sizes="100vw"
								/>
								<Box
									sx={{
										position: "absolute",
										transform: "translate(-50%, -50%)",
										top: "65%",
										left: "50%",
										width: "80%",
									}}
								>
									<Stack sx={{ height: 200 }}>
										<Title
											order={2}
											size="h1"
											align="left"
											fw={400}
											sx={{ color: "white" }}
										>
											{title}
										</Title>

										<Text fw={300} sx={{ color: "white" }}>
											{subtitle}
										</Text>

										<Button
											size="xs"
											color="dark"
											maw={120}
											onClick={() => {
												if (link_to_url) router.push(link_to_url)
											}}
										>
											SHOP NOW
										</Button>
									</Stack>
								</Box>
							</Box>
						)
					}
				})}
			</CarouselWrapper>
		)
	}

	return <Box sx={{ minHeight: "75vh" }} />
}
