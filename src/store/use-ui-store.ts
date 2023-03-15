import { useCallback } from "react"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export type UISliceType = {
	isMobileNavbarVisible: boolean
	isOverlayLoaderVisible: boolean
	isCartSidebarVisible: boolean
	isMobileNotificationOpened: boolean
	mobileNotificationData: {
		type: "success" | "info" | "warning" | "error"
		title?: string
		message?: string
	}
	actions: {
		setIsMobileNavbarVisible: (assignedValue: boolean) => void
		setIsOverlayLoaderVisible: (assignedValue: boolean) => void
		setIsCartSidebarVisible: (assignedValue: boolean) => void
		setIsMobileNotificationOpened: (
			assignedValue: boolean,
			notificationData?: UISliceType["mobileNotificationData"]
		) => void
	}
}

const DEFAULT_STATES = {
	isMobileNavbarVisible: false,
	isOverlayLoaderVisible: false,
	isCartSidebarVisible: false,
}

export const useUIStore = create<UISliceType>()(
	devtools(
		immer((set, get) => ({
			...DEFAULT_STATES,
			isMobileNotificationOpened: false,
			mobileNotificationData: {
				type: "info",
			},

			actions: {
				setIsMobileNavbarVisible: (assignedValue) => {
					set({
						...DEFAULT_STATES,
						isMobileNavbarVisible: assignedValue,
					})
				},
				setIsOverlayLoaderVisible: async (assignedValue) => {
					set({
						...DEFAULT_STATES,
						isOverlayLoaderVisible: assignedValue,
					})
				},
				setIsCartSidebarVisible: (assignedValue) => {
					set({
						...DEFAULT_STATES,
						isCartSidebarVisible: assignedValue,
					})
				},
				setIsMobileNotificationOpened: (
					assignedValue,
					notificationData = { type: "info" }
				) => {
					set(() => ({
						...DEFAULT_STATES,
						isMobileNotificationOpened: assignedValue,
						mobileNotificationData: notificationData,
					}))
				},
			},
		}))
	)
)

type HookOptions = {
	uiName: keyof typeof DEFAULT_STATES
	actionName:
		| "setIsMobileNavbarVisible"
		| "setIsOverlayLoaderVisible"
		| "setIsCartSidebarVisible"

	onOpen?: (data?: unknown) => void
	onClose?: (data?: unknown) => void
}

const createUIHook = <T extends HookOptions>(options: T) => {
	const { uiName, actionName, onOpen, onClose } = options

	return function useHook() {
		const isOpen = useUIStore((s) => s[uiName])
		const setIsOpen = useUIStore((s) => s.actions[actionName])

		const open = useCallback(
			(data?: unknown) => {
				if (isOpen) return

				onOpen?.(data)
				setIsOpen(true)
			},
			[isOpen, setIsOpen]
		)

		const close = useCallback(() => {
			if (!isOpen) return

			onClose?.()
			setIsOpen(false)
		}, [isOpen, setIsOpen])

		const toggle = useCallback(() => {
			isOpen ? close() : open()
		}, [isOpen, open, close])

		return [isOpen, { open, close, toggle }] as const
	}
}

export const useMobileNavbar = createUIHook({
	uiName: "isMobileNavbarVisible",
	actionName: "setIsMobileNavbarVisible",
})
export const useOverlayLoader = createUIHook({
	uiName: "isOverlayLoaderVisible",
	actionName: "setIsOverlayLoaderVisible",
})
export const useCartSidebar = createUIHook({
	uiName: "isCartSidebarVisible",
	actionName: "setIsCartSidebarVisible",
})

export const useMobileNotification = () => {
	const isOpen = useUIStore((s) => s.isMobileNotificationOpened)
	const data = useUIStore((s) => s.mobileNotificationData)
	const setIsOpen = useUIStore((s) => s.actions.setIsMobileNotificationOpened)

	const open = useCallback(
		(data: UISliceType["mobileNotificationData"]) => {
			if (isOpen) return
			setIsOpen(true, data)
		},
		[isOpen, setIsOpen]
	)

	const close = useCallback(() => {
		if (!isOpen) return
		setIsOpen(false)
	}, [isOpen, setIsOpen])

	return [isOpen, { open, close, notificationData: data }] as const
}
