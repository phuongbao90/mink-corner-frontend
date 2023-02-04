import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "react-feather"
import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import { useRouter } from "next/router"

import { useGetUser, useGetCart } from "@/features"

export const Header = () => {
	const router = useRouter()

	const { data: user } = useGetUser()
	const userId = user?.cart?.[0]?.id
	const { data: cart } = useGetCart(userId)

	const cartBadgeCount = cart?.items_func?.count || 0

	return (
		<header className="">
			<nav className="flex items-center justify-between">
				<ul className="flex align-middle">
					<li className="mr-8" onClick={() => router.push("/collection")}>
						Bộ sưu tập
						{/* <Link href="/collections">Bộ sưu tập</Link> */}
					</li>
					<li>
						<Link href="/lien-he">Liên hệ</Link>
					</li>
				</ul>

				<span className="w-24 aspect-square">
					<Link href="/" aria-label="home-logo">
						<Image src={MinkCornerLogo} alt="Mink Corner logo" />
					</Link>
				</span>

				<ul className="flex align-middle">
					<li className="relative mr-8">
						<button aria-label="cart" onClick={() => router.push("/cart")}>
							<ShoppingCart />
						</button>
						{Boolean(cartBadgeCount) && (
							<span className="absolute w-6 h-6 text-center text-white bg-red-500 rounded-full -right-4 -top-3">
								{cartBadgeCount}
							</span>
						)}
					</li>
					<li>
						<button aria-label="search">
							<Search />
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}
