import { Pokemon, PokemonClient, PokemonMove } from "pokenode-ts";
import SinglePokemonExport from "./SinglePokemonExport";
import { GetRandomNature } from "./randoms/GetRandomNature";
import GetRandomIvs, { IvValue } from "./randoms/GetRandomIvs";
import GetRandomMoves from "./randoms/GetRandomMoves";
import GetRandomShiny from "./randoms/GetRandomShiny";
import GetRandomAbility from "./randoms/GetRandomAbility";

type args = {
	pokeApi: PokemonClient;
	id: string;
	abilitiesJson: AbilityFile;
	naturesArray: NatureJson[];
	ivsArray: IvJson[];
	generation?: string;
	level?: number;
};

export type GeneratedPokemon = {
	id: string;
	name: string;
	moves: string[];
	ivs: IvValue[];
	nature: string;
	isShiny: boolean;
	ability: string;
	import: string;
};

export default async function GeneratePokemon({
	pokeApi,
	id,
	level,
	generation,
	abilitiesJson,
	naturesArray,
	ivsArray,
}: args): Promise<GeneratedPokemon> {
	const shinyRoll = 150;
	const { abilities, moves, name }: Pokemon = await pokeApi.getPokemonByName(
		id
	);

	if (!generation) generation = "diamond-pearl";

	const _isShiny = GetRandomShiny(shinyRoll);
	const _ability = await GetRandomAbility(pokeApi, abilitiesJson, abilities);
	const _moves = GetRandomMoves(moves, generation);
	const _ivs = GetRandomIvs(ivsArray, _isShiny);
	const _nature = await GetRandomNature(naturesArray);
	const _importCode = await SinglePokemonExport({
		name,
		level,
		ivs: _ivs,
		moves: _moves,
		nature: _nature,
		isShiny: _isShiny,
		ability: _ability,
	});

	// #region - Build output #
	return {
		id,
		name,
		moves: _moves,
		ivs: _ivs,
		nature: _nature,
		isShiny: _isShiny,
		ability: _ability,
		import: _importCode,
	};
}
