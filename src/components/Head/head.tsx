import NextHead from "next/head"
import React, { ReactNode } from "react"

type HeadProps = {
	title?: string
	description?: string | null
	image?: string | null
	children?: ReactNode
}

export const Head: React.FC<HeadProps> = ({
	title,
	description,
	image,
	children,
}) => {
	return (
		<NextHead>
			<title>{title} | Mink&#39;s Corner</title>
			<meta itemProp="name" content={title} />
			{description && <meta itemProp="description" content={description} />}
			{image && <meta itemProp="image" content={image} />}
			<link rel="icon" href="/favicon.ico" />
			{children}
		</NextHead>
	)
}
