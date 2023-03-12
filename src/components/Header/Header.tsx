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
import { hiddenAboveXs, hiddenOnXs, linkStyles } from "@/components/utils"

export const Header = () => {
	const router = useRouter()
	const { data: cart } = useGetCart()
	const cartBadgeCount = cart?.items_func?.count || 0

	const { toggleIsSidebarCartVisible, toggleIsNavbarOpened } = useBoundStore(
		(s) => s.actions
	)
	const isNavbarOpened = useBoundStore((s) => s.isNavbarOpened)

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
					<Box sx={hiddenAboveXs} onClick={() => toggleIsNavbarOpened(true)}>
						<Burger size="md" opened={isNavbarOpened} />
					</Box>
					<Group sx={hiddenOnXs}>
						<Text
							mx="xs"
							onClick={() => router.push("/collection")}
							sx={linkStyles}
						>
							Bộ sưu tập
						</Text>
						<Text
							mx="xs"
							onClick={() => router.push("/promotion")}
							sx={[linkStyles, { color: "red", fontWeight: 600 }]}
						>
							SALE!
						</Text>
						{/* <Text
							mx="xs"
							onClick={() => router.push("/lien-he")}
							sx={linkStyles}
						>
							Liên hệ
						</Text> */}
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
								fill
								src={MinkCornerLogo}
								alt="Mink Corner logo"
								priority
								sizes="10vw"
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
							sx={hiddenOnXs}
						>
							<Search />
						</UnstyledButton>
					</Group>
				</Box>
			</Container>
		</MantineHeader>
	)
}
