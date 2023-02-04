import clsx from "clsx"
import { FC } from "react"
import s from "./Grid.module.css"

type GridProps = {
	children: React.ReactNode
	className?: string
	layout?: string
	variant?: string
}

export const Grid: FC<GridProps> = ({
	children,
	className,
	layout = "normal",
	variant = "default",
}) => {
	const rootClassName = clsx(s.root)

	return <div className={rootClassName}>{children}</div>
}
