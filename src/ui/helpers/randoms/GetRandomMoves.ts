import { PokemonMove } from "pokenode-ts";

export default function GetRandomMoves(
	moves: PokemonMove[],
	generation?: string,
	level?: number
) {
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
