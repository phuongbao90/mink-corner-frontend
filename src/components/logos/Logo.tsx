import { LocalImage } from "@/components/UI"
import { ImageProps } from "@mantine/core"
import LogoFile from "public/logos/logo_1_1.png"

export const Logo = (props: ImageProps) => {
	if (!LogoFile) return null

	return (
		<LocalImage
			fill
			src={LogoFile}
			priority
			sizes="10vw"
			alt="Mink's Corner logo"
		/>
	)
}
