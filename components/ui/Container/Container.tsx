import clsx from "clsx"

interface ContainerProps {
	className?: string
	children: React.ReactNode
	el?: React.ElementType
}

export const Container: React.FC<ContainerProps> = ({
	children,
	className,
	el = "div",
}) => {
	const rootClassName = clsx(className, "mx-auto max-w-7xl w-full")

	const Component = el

	return <Component className={rootClassName}>{children}</Component>
}
