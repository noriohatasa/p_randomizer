import { useCallback, useState } from "react";

import GeneratePokemon, { GeneratedPokemon } from "../helpers/GeneratePokemon";
import PokemonsTable from "../components/Pokemons/Table";
import CopyToClipboard from "../helpers/CopyToClipboard";
import UpperFirstLetter from "../helpers/UpperFirstLetter";
import { UseAppContext } from "../contexts/AppContext";

import "./GenerateSinglePokemon.css";

function GenerateSinglePokemon() {
	const {
		pokeApi,
		imgPath,
		shinyImgPath,
		abilitiesJson,
		naturesArray,
		ivsArray,
	} = UseAppContext();
	const [activeData, setActiveData] = useState({} as GeneratedPokemon);
	const [level, setLevel] = useState(1);

	const onCardClick = useCallback(
		async (data: PokemonJson) => {
			const newPoke = await GeneratePokemon({
				pokeApi,
				id: data.id,
				level,
				abilitiesJson,
				naturesArray,
				ivsArray,
			});
			setActiveData(newPoke);
		},
		[setActiveData, abilitiesJson]
	);

	const onChangeLevel = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			let value = +e.currentTarget.value;
			value = Math.min(value, 100);
			value = Math.max(value, 1);
			setLevel(value);
		},
		[setLevel]
	);

	const imgSrc = activeData.isShiny
		? `${shinyImgPath}/${activeData.id ?? "0"}.png`
		: `${imgPath}/${activeData.id ?? "0"}.png`;

	return (
		<div id="main">
			<div id="left-panel">
				<div id="filters">
					<label className="filter-label">Level: </label>
					<input
						className="filter"
						id="level"
						onInput={onChangeLevel}
						type="number"
						value={level}
					/>
				</div>
				<PokemonsTable onCardClick={onCardClick} />
			</div>
			<div id="right-panel">
				<button onClick={() => CopyToClipboard(activeData.import)}>
					<span>Copiar para Showdown</span>
				</button>

				<div className="panel">
					<div className="card">
						{imgPath && <img src={imgSrc} alt={activeData.name} />}
					</div>
				</div>

				<div className="row">
					<span className="field">
						<b>Nome: </b>
					</span>

					<span
						className={`value ${
							activeData.isShiny && "text-rainbow-animation"
						}`}
					>
						{UpperFirstLetter(activeData.name)}
					</span>
				</div>

				<div className="row">
					<span className="field">
						<b>Natureza: </b>
					</span>
					<span className="value">
						{UpperFirstLetter(activeData.nature)}
					</span>
				</div>

				<div className="row">
					<span className="field">
						<b>Habilidade: </b>
					</span>
					<span className="value">
						{UpperFirstLetter(activeData.ability)}
					</span>
				</div>

				<div className="row">
					<span className="field">
						<b>Moves: </b>
					</span>

					<span className="value list">
						{activeData.moves?.map(item => (
							<span key={item} className="item">
								{UpperFirstLetter(item)}
							</span>
						))}
					</span>
				</div>

				{activeData.ivs?.map(item => (
					<div className="row" key={item.name}>
						<span className="field">
							<b>{UpperFirstLetter(item.name)}: </b>
						</span>

						<span className="value">{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default GenerateSinglePokemon;
