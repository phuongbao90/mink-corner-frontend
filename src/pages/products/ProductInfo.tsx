import React from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { Product } from "@/features"

type Tab = {
	title: string
	value: string
}

const tabs: Tab[] = [
	{ title: "Mô tả sản phẩm", value: "info" },
	{ title: "Chi tiết", value: "detail" },
]

export const ProductInfo = ({ product }: { product: Product }) => {
	return (
		<Tabs.Root defaultValue="info" orientation="horizontal">
			<Tabs.List aria-label="tabs product-info" className="flex w-full ">
				{tabs.map((el) => (
					<Tabs.Trigger
						className="border-b-2 radix-state-active:border-b-red-700"
						value={el.value}
						key={`tab-trigger-${el.value}`}
					>
						{el.title}
					</Tabs.Trigger>
				))}
			</Tabs.List>

			{tabs.map((tab, index) => (
				<Tabs.Content key={`tab-content-${tab.value}`} value={tab.value}>
					{index === 0 ? (
						product.description
					) : (
						<ul>
							<li>Mã sản phẩm: CG07139</li>
							<li>Kiểu dáng: Giày cao gót</li>
							<li>Chất liệu: Da tổng hợp</li>
							<li>Chất liệu: Da tổng hợp</li>
							<li>Chất liệu: Da tổng hợp</li>
							<li>Chất liệu: Da tổng hợp</li>
							<li>Chất liệu: Da tổng hợp</li>
						</ul>
					)}
				</Tabs.Content>
			))}
		</Tabs.Root>
	)
}
