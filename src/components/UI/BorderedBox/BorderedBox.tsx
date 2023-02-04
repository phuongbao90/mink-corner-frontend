import clsx from "clsx"
import React from "react"
import s from "./BorderedBox.module.css"

type BoxProps<C extends React.ElementType> = {
	className?: string
	as?: C
}

type Props<C extends React.ElementType> = React.PropsWithChildren<BoxProps<C>> &
	Omit<React.ComponentPropsWithoutRef<C>, keyof BoxProps<C>>

export const Box = <C extends React.ElementType = "div">({
	as,
	className,
	children,
	...props
}: Props<C>) => {
	const Component = as || "div"
	const isButton = as === "button"

	return (
		<Component
			{...props}
			className={clsx(s.root, isButton && s.button, className)}
		>
			{children}
		</Component>
	)
}
