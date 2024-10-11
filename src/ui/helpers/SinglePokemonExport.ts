import { IvValue } from "./randoms/GetRandomIvs";

type args = {
	name: string;
	isShiny: boolean;
	nature: string;
	ivs: IvValue[];
	moves: string[];
	ability: string;
	level?: number;
};

export default async function SinglePokemonExport({
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
		`IVs: ${ivs.map(v => `${v.value} ${v.short}`).join(" / ")}`,
		`${moves.map(i => `- ${i}`).join(`\n`)}`,
	];

	return code.join(`\n`);
}
