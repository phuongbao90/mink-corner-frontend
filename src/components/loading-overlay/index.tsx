import { Loader, LoadingOverlay as _LoadingOverlay } from "@mantine/core"
import { useBoundStore } from "@/store/useStore"

export function LoadingOverlay() {
	const isOverlayLoaderVisible = useBoundStore((s) => s.isOverlayLoaderVisible)

	return isOverlayLoaderVisible ? (
		<_LoadingOverlay
			visible={isOverlayLoaderVisible}
			overlayBlur={0}
			loader={<Loader variant="bars" color="teal" />}
		/>
	) : null
}
