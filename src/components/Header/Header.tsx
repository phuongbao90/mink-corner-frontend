import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "react-feather"
import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import { useRouter } from "next/router"
import { useGetCart } from "@/features/cart"
import { useBoundStore } from "@/store/useStore"
import {
	Box,
	Burger,
	Container,
	Flex,
	Group,
	Header as MantineHeader,
	Indicator,
	Text,
	UnstyledButton,
} from "@mantine/core"
import { AnnouncementBar } from "@/components/announcement-bar"

export const Header = () => {
	const router = useRouter()
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)
	const isNavbarOpened = useBoundStore((s) => s.isNavbarOpened)
	const toggleIsNavbarOpened = useBoundStore(
		(s) => s.actions.toggleIsNavbarOpened
	)

	const { data: cart } = useGetCart()
	const cartBadgeCount = cart?.items_func?.count || 0

	return (
		<MantineHeader height="auto">
			<AnnouncementBar />

			<Container size="lg">
				<Box
					component="nav"
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box
						sx={(theme) => ({
							[theme.fn.largerThan("xs")]: {
								display: "none",
							},
						})}
						onClick={() => toggleIsNavbarOpened(true)}
					>
						<Burger size="md" opened={isNavbarOpened} />
					</Box>
					<Group
						sx={(theme) => ({
							[theme.fn.smallerThan("xs")]: {
								display: "none",
							},
						})}
					>
						<Text
							mx="xs"
							onClick={() => router.push("/collection")}
							sx={{
								cursor: "pointer",
								"&:hover": {
									color: "blue",
								},
							}}
						>
							Bộ sưu tập
						</Text>
						<Text
							mx="xs"
							onClick={() => router.push("/lien-he")}
							sx={{
								cursor: "pointer",
								"&:hover": {
									color: "blue",
								},
							}}
						>
							Liên hệ
						</Text>
					</Group>

					<Box
						mx="auto"
						w={60}
						sx={{
							position: "relative",
							aspectRatio: "1",
						}}
					>
						<Link href="/" aria-label="home-logo">
							<Image
								src={MinkCornerLogo}
								alt="Mink Corner logo"
								priority
								quality={100}
								sizes="10vw"
								fill
							/>
						</Link>
					</Box>

					<Group>
						<Flex mx="xs" sx={{ position: "relative" }} mt={8}>
							<Indicator
								label={cartBadgeCount}
								inline
								size={22}
								color="red"
								onClick={() => toggleIsSidebarCartVisible(true)}
							>
								<UnstyledButton aria-label="cart">
									<ShoppingCart />
								</UnstyledButton>
							</Indicator>
						</Flex>

						<UnstyledButton
							mx="xs"
							aria-label="search"
							c="dark"
							sx={(theme) => ({
								[theme.fn.smallerThan("xs")]: {
									display: "none",
								},
							})}
						>
							<Search />
						</UnstyledButton>
					</Group>
				</Box>
			</Container>
		</MantineHeader>
	)
}
