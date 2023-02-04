import React, { forwardRef, ReactNode, useState } from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"

type ReceivedProps = {
	title: string
	description: string
	children?: ReactNode
	onClose?: Function
	actionCallback?: Function
}

export type ToastProps = {
	open: VoidFunction
	close: VoidFunction
}

export const Toast = forwardRef((props: ReceivedProps, forwardedRef) => {
	const { children, title, description, onClose, actionCallback } = props
	const [isOpen, setIsOpen] = useState(false)

	React.useImperativeHandle(forwardedRef, () => ({
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
	}))

	return (
		<ToastPrimitive.Provider>
			<ToastPrimitive.Viewport className="fixed top-0 right-0 z-50 flex flex-col" />
			<ToastPrimitive.Root
				className="bg-white"
				open={isOpen}
				defaultOpen={false}
				onOpenChange={setIsOpen}
				duration={1000}
			>
				{title && (
					<ToastPrimitive.Title className="text-black">
						{title}
					</ToastPrimitive.Title>
				)}
				{description && (
					<ToastPrimitive.Description>{description}</ToastPrimitive.Description>
				)}
				{onClose && <ToastPrimitive.Close>Dismiss</ToastPrimitive.Close>}
				{actionCallback && (
					<ToastPrimitive.Action
						className="ToastAction"
						asChild
						altText="toast-action"
					>
						<button className="Button small green">Undo</button>
					</ToastPrimitive.Action>
				)}
			</ToastPrimitive.Root>
		</ToastPrimitive.Provider>
	)
})
