import { useOverlayLoader } from "@/store/use-ui-store"
import { Loader, LoadingOverlay as _LoadingOverlay } from "@mantine/core"

export function LoadingOverlay() {
	const [opened] = useOverlayLoader()

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
