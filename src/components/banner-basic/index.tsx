import { DirectusImage } from "@/components/UI"
import { Banner } from "@/features/banners"
import { useBannerLink } from "@/features/banners/banners.hooks"
import { Box, Button, Flex, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { ArrowRight } from "react-feather"

const flexMaps = {
	center: "center",
	left: "flex-start",
	right: "flex-end",
} as const

export const BannerBasic = ({ banner }: { banner?: Banner | undefined }) => {
	const link_url = useBannerLink(banner?.link?.[0])
	const router = useRouter()
	if (!banner) return null

	return (
		<Box w="100%" sx={{ position: "relative" }}>
			{!!banner?.cover_image?.id && (
				<DirectusImage
					src={banner?.cover_image?.id}
					alt="banner image"
					style={{
						filter: "brightness(0.65)",
					}}
				/>
			)}

			<Flex
				px={{
					base: 30,
					xs: 100,
				}}
				sx={{
					height: "100%",
					alignItems: "center",
					justifyContent: flexMaps[banner.text_container_position],
				}}
			>
				<Stack
					sx={{
						zIndex: 9,
						maxWidth: "30rem",
						alignItems: flexMaps[banner.text_container_position],
					}}
				>
					<Title
						order={2}
						size="h3"
						c="gray.4"
						// align={banner.text_container_position}
					>
						{banner.title}
					</Title>
					<Text size="sm" c="gray.4" align={banner.text_container_position}>
						{banner.subtitle}
					</Text>
					{!!link_url && (
						<Button
							size="xs"
							variant="outline"
							color="gray.4"
							w={160}
							compact
							onClick={() => {
								router.push(link_url)
							}}
							rightIcon={<ArrowRight size={13} />}
						>
							Chi tiết
						</Button>
					)}
				</Stack>
			</Flex>
		</Box>
	)
}
