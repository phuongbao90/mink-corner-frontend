import { BREAKPOINT_SM, BREAKPOINT_LG } from "./../constant/index"
import { BREAKPOINT_MD } from "@/constant/index"
import { useMediaQuery } from "@mantine/hooks"

export function useIsMobile() {
	const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT_SM}px)`, true, {
		getInitialValueInEffect: false,
	})
	const isTablet = useMediaQuery(`(min-width: ${BREAKPOINT_MD}px)`)
	const isLaptop = useMediaQuery(`(min-width: ${BREAKPOINT_LG}px)`)
	return {
		isMobile,
		isTablet,
		isLaptop,
	}
}
