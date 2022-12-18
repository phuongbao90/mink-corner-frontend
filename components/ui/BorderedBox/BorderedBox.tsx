import clsx from "clsx"
import React from "react"

type Props<C extends React.ElementType> = {
	children: React.ReactNode
	className?: string
	as?: C
}

export const Box = <C extends React.ElementType = "div">({
	children,
	className,
	as,
}: Props<C>) => {
	const Component = as || "div"

	return <Component className={clsx(className, "")}>{children}</Component>
}
