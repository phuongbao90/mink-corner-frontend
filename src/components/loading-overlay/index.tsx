import { useOverlayLoader } from "@/store/use-ui-store"
import { Loader, LoadingOverlay as _LoadingOverlay } from "@mantine/core"
import { useEffect } from "react"

export function LoadingOverlay() {
	const [opened, { close }] = useOverlayLoader()

	useEffect(() => {
		const timer = setTimeout(() => {
			if (opened) {
				close()
			}
		}, 3000)
		return () => clearTimeout(timer)
	}, [opened])

	return (
		<_LoadingOverlay
			visible={opened}
			overlayBlur={0}
			loader={<Loader variant="bars" color="teal" />}
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		/>
	)
}
