import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "react-feather"
import MinkCornerLogo from "public/images/MinkCornerLogo.jpg"
import { useRouter } from "next/router"

const Header = () => {
	const router = useRouter()

	return (
		<header className="">
			<nav className="flex items-center justify-between">
				<ul className="flex align-middle">
					<li className="mr-8" onClick={() => router.push("/collections")}>
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
					<li className="mr-8">
						<button aria-label="cart">
							<ShoppingCart />
						</button>
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

export default Header
