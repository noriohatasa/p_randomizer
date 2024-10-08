import Pokedex, {
	Pokemon,
	PokemonAbility,
	MoveElement,
} from "pokedex-promise-v2";
import SinglePokemonExport from "./SinglePokemonExport";
import { GetRandomNature } from "./GetRandomNature";

type args = {
	dex: Pokedex;
	id: string;
	generation?: string;
	level?: number;
};

export type GeneratedPokemon = {
	id: string;
	name: string;
	moves: string[];
	ivs: number[];
	nature: string;
	isShiny: boolean;
	ability: string;
	import: string;
};

export default async function GeneratePokemon({
	dex,
	id,
	level,
	generation,
}: args): Promise<GeneratedPokemon> {
	const shinyRoll = 150;
	const res: Pokemon = await dex.getPokemonByName(id);
	if (!generation) generation = "diamond-pearl";

	const isShiny = IsShiny(shinyRoll);
	const ability = await GetAbility(dex, res.abilities);
	const moves = GetMoves(res.moves);
	const ivs = GetIvs(isShiny);
	const nature = GetRandomNature();

	// ##########################
	// #region - Get importCode #
	const importCode = SinglePokemonExport({
		name: res.name,
		isShiny,
		nature,
		ivs,
		moves,
		level,
		ability,
	});

	// ########################
	// #region - Build output #
	return {
		id,
		name: res.name,
		moves,
		ivs,
		nature,
		isShiny,
		ability,
		import: importCode,
	};
}

// #####################
// #region - Get shiny #
function IsShiny(shinyRoll: number) {
	const roll = Math.trunc(Math.random() * shinyRoll);
	return roll === 0;
}

// #######################
// #region - Get ability #
async function GetAbility(dex: Pokedex, abilities: PokemonAbility[]) {
	const abRoll = Math.trunc(Math.random() * abilities.length);
	const name = abilities[abRoll].ability.name;
	const dexAb = await dex.getAbilityByName(name);
	console.log(dexAb.generation);
	return name;
}

// #####################
// #region - Get moves #
function GetMoves(moves: MoveElement[], generation?: string, level?: number) {
	const res = [];
	const filtered = moves.filter(i => {
		const versionDetails = generation
			? i.version_group_details.find(
					j => j.version_group.name === generation
			  )
			: i.version_group_details.slice(-1)[0];

		if (!versionDetails) return false;

		const learnByLvlUp =
			versionDetails.move_learn_method.name === "level-up" ||
			versionDetails.move_learn_method.name === "tutor";

		const filterByLvl = level
			? versionDetails.level_learned_at <= level
			: true;

		return learnByLvlUp && filterByLvl;
	});

	while (res.length < 4 && filtered.length > 0) {
		const pos = Math.trunc(Math.random() * filtered.length);
		res.push(filtered.splice(pos, 1)[0].move.name);
	}

	return res;
}

// ####################
// #region - Get IV's #
function GetIvs(isShiny: boolean) {
	return [0, 0, 0, 0, 0, 0].map(() => {
		const iv = Math.trunc(Math.random() * 32);
		return isShiny && iv < 20 ? 20 : iv;
	});
}
