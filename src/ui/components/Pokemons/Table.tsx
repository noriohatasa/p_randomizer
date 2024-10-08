import { useCallback, useState } from "react";

import PokemonsJson from "../../assets/jsons/pokemons.json";
import GetPokemonSprite from "../../helpers/GetPokemonSprite";
import UpperFirstLetter from "../../helpers/UpperFirstLetter";
import { Pokemon as PokemonJsonType } from "../../assets/jsons/types";

import "./Table.css";

type args = {
	onCardClick: (data: PokemonJsonType & { level: number }) => Promise<void>;
};

const PokemonsArray = Object.values(PokemonsJson) as PokemonJsonType[];

function PokemonsTable({ onCardClick }: args) {
	const [level, setLevel] = useState(1);
	const [showing, setShowing] = useState(PokemonsArray.slice(0, 20));
	const [selected, setSelected] = useState("");

	const onChangeLevel = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			let value = +e.currentTarget.value;
			value = Math.min(value, 100);
			value = Math.max(value, 1);
			setLevel(value);
		},
		[setLevel]
	);

	const onFilterChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const filter = e.currentTarget.value.toLowerCase();
			const regExStr = `.*${filter}.*`;
			const regEx = new RegExp(regExStr);
			const result = PokemonsArray.filter(item => item.name.match(regEx));
			setShowing(result.slice(0, 20));
		},
		[setShowing]
	);

	const onClick = useCallback(
		(item: PokemonJsonType) => {
			setSelected(item.id);
			onCardClick({ ...item, level });
		},
		[onCardClick, level]
	);

	return (
		<>
			<div id="filters">
				<input className="filter" onChange={onFilterChange} />
				<input
					className="filter"
					id="level"
					onInput={onChangeLevel}
					type="number"
					value={level}
				/>
			</div>
			<div id="grid">
				{showing.map((item: PokemonJsonType) => (
					<div
						key={item.id}
						className="card"
						onClick={() => onClick(item)}
						style={{
							boxShadow: `0px 0px 10px 1px ${
								selected === item.id ? "royalblue" : "gray"
							}`,
						}}
					>
						<img src={GetPokemonSprite(item.id)} alt={item.name} />
						<span>{UpperFirstLetter(item.name)}</span>
					</div>
				))}
			</div>
		</>
	);
}

export default PokemonsTable;
