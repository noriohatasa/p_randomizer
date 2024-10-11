export async function GetRandomNature(naturesArray: NatureJson[]) {
	const natIndex = Math.trunc(Math.random() * naturesArray.length);

	return naturesArray[natIndex]?.name;
}
