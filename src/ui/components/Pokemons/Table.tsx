import { useCallback, useEffect, useState } from "react";

import "./Table.css";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import { UseAppContext } from "../../contexts/AppContext";

const maxCountPerPage = 2000; //28;
type args = {
	onCardClick: (data: PokemonJson) => Promise<void>;
};

function PokemonsTable({ onCardClick }: args) {
	const { pokemonArray } = UseAppContext();
	const [selected, setSelected] = useState("");
	const [showing, setShowing] = useState(pokemonArray.slice(0, 20));

	const onFilterChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const filter = e.currentTarget.value;
			const regEx = new RegExp(`.*${filter}.*`, "gi");
			const result: PokemonJson[] = [];
			pokemonArray.some(item => {
				if (item.name.match(regEx)) result.push(item);
				return result.length == maxCountPerPage;
			});

			setShowing(result);
		},
		[setShowing, pokemonArray]
	);

	const onClick = useCallback(
		(item: PokemonJson) => {
			setSelected(item.id);
			onCardClick(item);
		},
		[onCardClick]
	);

	useEffect(() => {
		setShowing(pokemonArray.slice(0, maxCountPerPage));
	}, [pokemonArray, setShowing]);

	return (
		<div id="PokemonsTable">
			<div>
				<input id="name-filter" onChange={onFilterChange} />
			</div>
			<div id="grid">
				{showing.map((item: PokemonJson) => (
					<Card
						key={uuid()}
						onClick={onClick}
						item={item}
						selected={selected == item.id}
					/>
				))}
			</div>
		</div>
	);
}

export default PokemonsTable;
