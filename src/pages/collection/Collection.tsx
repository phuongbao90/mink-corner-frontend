import { useCollectionContext } from "./CollectionProvider"

export const Collection = () => {
	const { categories } = useCollectionContext()

	return (
		<div>
			<h1>bộ sưu tập của mink's corner</h1>
			<div>
				{/* <ul>
					{(categories || []).map((cat, index) => (
						<li key={index} role="listitem">
							{cat}
						</li>
					))}
				</ul> */}
			</div>
		</div>
	)
}
