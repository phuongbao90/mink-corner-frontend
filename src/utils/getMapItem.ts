export function getMapItem<Key, Value>(
	map: Map<Key, Value>,
	key: Key
): [Key, Value] | undefined {
	if (map.has(key)) {
		const value = map.get(key)
		return [key, value!] as [Key, Value]
	}
	return undefined
}
