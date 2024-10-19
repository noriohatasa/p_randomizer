import { PokemonAbility, PokemonClient } from "pokenode-ts";

export default async function GetRandomAbility(
	pokeApi: PokemonClient,
	abilitiesArray: AbilityFile,
	abilities: PokemonAbility[],
	generation: string = "generation-iv"
) {
	const parsedGen = parseGeneration(generation);

	let ability: AbilityJson = {} as any;

	while (true) {
		const abRoll = Math.trunc(Math.random() * abilities.length);
		const name = abilities.splice(abRoll)[0].ability.name;
		ability = abilitiesArray[name];

		if (!ability?.hasOwnProperty("generation")) {
			const dexAb = await pokeApi.getAbilityByName(ability.name);
			ability.generation = dexAb.generation.name;
			window.electron.SaveJsonData("abilities", ability);
		}

		if (
			parseGeneration(ability.generation) <= parsedGen ||
			abilities.length == 0
		)
			break;
	}

	return ability?.name;
}

function parseGeneration(generation: string) {
	return (
		{
			"generation-i": 1,
			"generation-ii": 2,
			"generation-iii": 3,
			"generation-iv": 4,
		}[generation] ?? 9
	);
}
