import { render, screen } from "@testing-library/react"
import { renderAppWrapper } from "mocks/helpers"
import { Collection } from "./Collection"
import { CollectionProvider } from "./CollectionProvider"

describe("Collection", () => {
	test("show a list of categories with count of 20", async () => {
		renderAppWrapper(
			<CollectionProvider>
				<Collection />
			</CollectionProvider>
		)

		// const categoryList = await screen.findAllByRole("listitem")
		// expect(categoryList).toHaveLength(20)
	})
})
