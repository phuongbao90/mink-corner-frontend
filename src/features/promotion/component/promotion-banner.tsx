import { CarouselWrapper, DirectusImage } from "@/components"
import { PromotionType } from "@/features/promotion"
import { Box, Stack, Text, Title } from "@mantine/core"

export const PromotionBanner = ({
	promotions,
}: {
	promotions: PromotionType[] | undefined
}) => {
	return (
		<Box>
			{!!promotions && (
				<CarouselWrapper
					carouselOptions={{
						slidesToScroll: 1,
						draggable: promotions.length > 1 ? true : false,
					}}
					slides={promotions?.map((el) => el.cover_image?.id || "")}
					withDots
				>
					{promotions?.map(
						(promotion, index) =>
							!!promotion.cover_image?.id && (
								<Box
									key={index}
									sx={{
										position: "relative",
										height: "60dvh",
										width: "100%",
										flex: "0 0 100%",
									}}
								>
									<DirectusImage
										src={promotion.cover_image?.id}
										alt="promotion-banner-image"
										sizes="100vw"
										style={{
											filter: "brightness(0.65)",
										}}
									/>
									<Box
										sx={{
											position: "absolute",
											transform: "translate(-50%, -50%)",
											top: "43%",
											left: "50%",
											width: "80%",
										}}
									>
										<Stack>
											<Title
												order={2}
												size={"6vw"}
												c="white"
												sx={{ textAlign: "center" }}
											>
												{promotion.title}
											</Title>
											<Text
												c="white"
												sx={{
													fontSize: "3vw",
													textAlign: "center",
												}}
											>
												{promotion.description}
											</Text>
										</Stack>
									</Box>
								</Box>
							)
					)}
				</CarouselWrapper>
			)}
		</Box>
	)
}
