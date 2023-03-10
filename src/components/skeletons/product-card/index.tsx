import { Card, Flex, Skeleton } from "@mantine/core"

export const ProductCardSkeleton = () => {
	return (
		<Card p="sm" radius="lg" withBorder>
			<Card.Section
				component="div"
				sx={{ position: "relative", aspectRatio: "0.9", cursor: "pointer" }}
				p="6%"
			>
				<Skeleton h="100%" w="100%" radius="lg" />
			</Card.Section>
			<Flex direction="column" align="center" mb="xs">
				<Skeleton height={16} width="80%" radius="xl" />
				<Skeleton height={15} width="60%" radius="xl" mt={8} />

				<Skeleton height={13} w="40%" radius="xl" mt="sm" />
			</Flex>
		</Card>
	)
}
