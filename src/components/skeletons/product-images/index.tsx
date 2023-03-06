import { Box, Grid, MediaQuery, Skeleton } from "@mantine/core"

export const SkeletonProductImages = () => {
	return (
		<>
			<MediaQuery
				largerThan="md"
				styles={{
					display: "none",
				}}
			>
				<Box>
					<Skeleton />
				</Box>
			</MediaQuery>

			<MediaQuery
				smallerThan="md"
				styles={{
					display: "none",
				}}
			>
				<Grid gutter={4}>
					<Grid.Col span={6}>
						<Skeleton sx={{ aspectRatio: "1" }} />
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton sx={{ aspectRatio: "1" }} />
					</Grid.Col>
					<Grid.Col span={4}>
						<Skeleton sx={{ aspectRatio: "1" }} />
					</Grid.Col>
					<Grid.Col span={4}>
						<Skeleton sx={{ aspectRatio: "1" }} />
					</Grid.Col>
					<Grid.Col span={4}>
						<Skeleton sx={{ aspectRatio: "1" }} />
					</Grid.Col>
				</Grid>
			</MediaQuery>
		</>
	)
}
