import Link from "next/link"
import { Search, ShoppingCart } from "react-feather"
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
	rem,
} from "@mantine/core"
import { AnnouncementBar } from "@/components/announcement-bar"
import { hiddenAboveXs, hiddenOnXs, linkStyles } from "@/components/utils"
import { CollectionDropdown } from "@/components/Header/collection-dropdown"
import { useCartSidebar, useMobileNavbar } from "@/store/use-ui-store"
import { pageRoutes } from "@/constant"
import { Logo } from "@/components/logos/Logo"

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
				<Group sx={{ position: "relative", minHeight: 65 }}>
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

					<Box mx="auto" />
					<Box
						h={63}
						sx={{
							aspectRatio: "1",
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						<Link href="/" aria-label="home-logo">
							<Logo />
						</Link>
					</Box>

					<Group>
						<UnstyledButton
							aria-label="search"
							onClick={() => router.push(pageRoutes.search)}
						>
							<Search />
						</UnstyledButton>
						<Flex
							ml={{ base: "sm", xs: rem(24) }}
							sx={{ position: "relative" }}
							mt={8}
						>
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
					</Group>
				</Group>
			</Container>
		</MantineHeader>
	)
}
