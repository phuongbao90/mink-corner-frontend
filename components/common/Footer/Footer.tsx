import Link from "next/link"

const Heading = ({ content }: { content: string }) => (
	<h3 className="text-2xl mb-4 text-gray-600">{content}</h3>
)

const Footer = () => {
	return (
		<footer className="grid grid-cols-12 gap-4">
			<div className="col-span-3">
				<Heading content="Về Mink Corner" />
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
					iure, quo obcaecati eaque consequatur deserunt impedit corrupti
					expedita minima excepturi.
				</p>
			</div>
			<div className="col-span-2">
				<Heading content="Thông tin" />
				<ul>
					<li>
						<Link href="/">Bảo hành, đổi trả</Link>
					</li>
					<li>
						<Link href="/">Chính sách bảo hành</Link>
					</li>
					<li>
						<Link href="/">Điều khoản dịch vụ</Link>
					</li>
				</ul>
			</div>
			<div className="col-span-4">
				<Heading content="Liên hệ" />
				<ul>
					<li>Địa chỉ: 090909099</li>
					<li>email: testing@mailac.com</li>
				</ul>
			</div>
			<div className="col-span-3">
				<Heading content="FANPAGE" />
				<div>FACEBOOK Banner here</div>
			</div>
		</footer>
	)
}

export default Footer
