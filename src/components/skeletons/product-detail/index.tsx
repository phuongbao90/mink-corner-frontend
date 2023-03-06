import { SkeletonProductImages } from "@/components/skeletons/product-images"
import { Box, Container, Divider, Flex, Grid, Skeleton } from "@mantine/core"

export const SkeletonProductDetail = () => {
	return (
		<Container size="xl" my="xl">
			<Grid gutter="xl">
				<Grid.Col span={12} md={7}>
					<SkeletonProductImages />
				</Grid.Col>
				<Grid.Col span={12} md={5}>
					<Box>
						<Skeleton h={22} w="50%" />
						<Skeleton h={18} w="15%" mt="md" />
						<Skeleton h={14} w="25%" mt="xs" />
						<Divider my="lg" />
						<Skeleton h={36} w={48 * 2.5} />
						<Skeleton h={34} w={48 * 3.2} mt="xl" />
						<Box my="xl">
							<Flex align="center" mb="sm">
								<Skeleton h={28} w={28} radius="xl" mr="sm" />
								<Skeleton h={22} w={200} />
							</Flex>
							<Flex align="center" mb="sm">
								<Skeleton h={28} w={28} radius="xl" mr="sm" />
								<Skeleton h={22} w={200} />
							</Flex>
							<Flex align="center" mb="sm">
								<Skeleton h={28} w={28} radius="xl" mr="sm" />
								<Skeleton h={22} w={200} />
							</Flex>
							<Flex align="center" mb="sm">
								<Skeleton h={28} w={28} radius="xl" mr="sm" />
								<Skeleton h={22} w={200} />
							</Flex>
						</Box>
					</Box>
				</Grid.Col>
			</Grid>
		</Container>
	)
}
