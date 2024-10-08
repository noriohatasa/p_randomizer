import IvsJson from "../assets/jsons/ivs.json";

type args = {
	name: string;
	isShiny: boolean;
	nature: string;
	ivs: number[];
	moves: string[];
	ability: string;
	level?: number;
};

export default function SinglePokemonExport({
	name,
	isShiny,
	nature,
	ivs,
	moves,
	level,
	ability,
}: args) {
	const code = [
		name,
		`Shiny: ${isShiny ? "Yes" : "No"}`,
		`Ability: ${ability}`,
		`${nature} Nature`,
		`Level: ${level ?? 50}`,
		`EVs: 1 HP`,
		`IVs: ${IvsJson.map((v, i) => `${ivs[i]} ${v.short}`).join(" / ")}`,
		`${moves.map(i => `- ${i}`).join(`\n`)}`,
	];

	return code.join(`\n`);
}
