import Pokedex from "pokedex-promise-v2";
import { useCallback, useState } from "react";

import GeneratePokemon, { GeneratedPokemon } from "../helpers/GeneratePokemon";
import PokemonsTable from "../components/Pokemons/Table";
import CopyToClipboard from "../helpers/CopyToClipboard";
import GetShinySprite from "../helpers/GetShinySprite";
import GetPokemonSprite from "../helpers/GetPokemonSprite";
import UpperFirstLetter from "../helpers/UpperFirstLetter";

import IvsArray from "../assets/jsons/ivs.json";
import { Pokemon } from "../assets/jsons/types";

type args = {
	dex: Pokedex;
};

function GenerateSinglePokemon({ dex }: args) {
	const [activeData, setActiveData] = useState({} as GeneratedPokemon);

	const onCardClick = useCallback(
		async (data: Pokemon) => {
			const newPoke = await GeneratePokemon({ dex, id: data.id });
			setActiveData(newPoke);
		},
		[dex, setActiveData]
	);

	return (
		<div id="main">
			<div id="left-panel">
				<PokemonsTable onCardClick={onCardClick} />
			</div>
			<div id="right-panel">
				<button onClick={() => CopyToClipboard(activeData.import)}>
					<span>Copiar para Showdown</span>
				</button>

				<div className="panel">
					<div className="card">
						{activeData.isShiny ? (
							<img
								src={
									activeData.id
										? GetShinySprite(activeData.id)
										: GetPokemonSprite("0")
								}
								alt={activeData.name}
							/>
						) : (
							<img
								src={
									activeData.id
										? GetPokemonSprite(activeData.id)
										: GetPokemonSprite("0")
								}
								alt={activeData.name}
							/>
						)}
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

				<div className="row">
					<span className="field">
						<span id="ivs">
							<b>IV'S: </b>
						</span>
					</span>

					<span className="value list">
						<span className="row" />
						{IvsArray.map((item, index) => (
							<div className="row" key={item.name}>
								<span className="field">
									<b>{UpperFirstLetter(item.name)}: </b>
								</span>

								<span className="value">
									{activeData.ivs && activeData.ivs[index]}
								</span>
							</div>
						))}
					</span>
				</div>
			</div>
		</div>
	);
}

export default GenerateSinglePokemon;
