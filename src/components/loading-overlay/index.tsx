import { Loader, LoadingOverlay as _LoadingOverlay } from "@mantine/core"
import { useOverlayLoader } from "@/store/use-ui-store"

export function LoadingOverlay() {
	const [opened] = useOverlayLoader()

	return opened ? (
		<_LoadingOverlay
			visible={opened}
			overlayBlur={0}
			loader={<Loader variant="bars" color="teal" />}
		/>
	) : null
}
