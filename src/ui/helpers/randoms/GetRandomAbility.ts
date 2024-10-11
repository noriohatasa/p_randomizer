import { PokemonAbility, PokemonClient } from "pokenode-ts";

export default async function GetRandomAbility(
	pokeApi: PokemonClient,
	abilitiesArray: AbilityFile,
	abilities: PokemonAbility[]
) {
	const abRoll = Math.trunc(Math.random() * abilities.length);
	const name = abilities[abRoll].ability.name;

	const ability = abilitiesArray[name];

	if (!ability?.hasOwnProperty("generation")) {
		const dexAb = await pokeApi.getAbilityByName(name);
		ability.generation = dexAb.generation.name;
		window.electron.SaveJsonData("abilities", ability);
	}

	return name;
}
