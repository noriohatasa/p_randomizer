import { useCallback, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import { v4 as uuid } from "uuid";

import "./App.css";
import GenerateSinglePokemon from "./pages/GenerateSinglePokemons";

type jsxFactory = (dex: Pokedex) => JSX.Element;

const tabs = [
	{
		key: uuid(),
		description: "Pokemons",
		render: (dex: Pokedex) => <GenerateSinglePokemon dex={dex} />,
	},
	{ key: uuid(), description: "Regiões", render: () => <div></div> },
];

function App() {
	const [dex] = useState(new Pokedex());
	const [activeTab, setActiveTab] = useState({
		key: tabs[0].key,
		render: tabs[0].render,
	});

	const onTabClick = useCallback(
		(key: string, render: jsxFactory) => setActiveTab({ key, render }),
		[setActiveTab]
	);

	return (
		<div className="App">
			<div id="Tabs">
				{tabs.map(({ key, description, render }) => (
					<div
						key={description}
						onClick={() => onTabClick(key, render)}
						className={activeTab.key === key ? "selected" : ""}
					>
						{description}
					</div>
				))}
			</div>

			{activeTab.render(dex)}
		</div>
	);
}

export default App;
