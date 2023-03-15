import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "react-feather"
import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import { useRouter } from "next/router"
import { useGetCart } from "@/features/cart"
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
import { CollectionDropdown } from "@/components/Header/collection-dropdown"
import { useCartSidebar, useMobileNavbar } from "@/store/use-ui-store"
import { pageRoutes } from "@/constant"

export const Header = () => {
	const router = useRouter()
	const { data: cart } = useGetCart()
	const cartBadgeCount = cart?.items_func?.count || 0

	const [, { open: openCartSidebar }] = useCartSidebar()
	const [isMobileNavbarOpened, { open: openMobileNavbar }] = useMobileNavbar()

	return (
		<MantineHeader height="auto" sx={{ overflow: "hidden" }}>
			<AnnouncementBar />

			<Container size="lg">
				<Group>
					<Box
						sx={hiddenAboveXs}
						onClick={() => {
							openMobileNavbar()
						}}
					>
						<Burger size="md" opened={isMobileNavbarOpened} />
					</Box>
					<Group sx={hiddenOnXs}>
						<CollectionDropdown />
						<Text
							mx="xs"
							onClick={() => router.push(pageRoutes.promotion)}
							sx={[linkStyles, { color: "red", fontWeight: 600 }]}
						>
							SALE!
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
								onClick={openCartSidebar}
							>
								<UnstyledButton aria-label="cart">
									<ShoppingCart />
								</UnstyledButton>
							</Indicator>
						</Flex>

						<UnstyledButton mx="xs" aria-label="search" sx={hiddenOnXs}>
							<Search />
						</UnstyledButton>
					</Group>
				</Group>
			</Container>
		</MantineHeader>
	)
}
