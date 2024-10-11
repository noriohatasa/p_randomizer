import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import "./App.css";
import GenerateSinglePokemon from "./pages/GenerateSinglePokemon";
import AppProvider from "./contexts/AppContext";

type tab = {
	key: string;
	description: string;
	render: JSX.Element;
};

const tabs: tab[] = [
	{ key: uuid(), description: "Pokemons", render: <GenerateSinglePokemon /> },
	{ key: uuid(), description: "Regiões", render: <div></div> },
];

function App() {
	const [activeTab, setActiveTab] = useState({
		key: tabs[0].key,
		render: tabs[0].render,
	});

	const onTabClick = useCallback(
		(key: string, render: JSX.Element) => setActiveTab({ key, render }),
		[setActiveTab]
	);

	return (
		<AppProvider>
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
			{activeTab.render}
		</AppProvider>
	);
}

export default App;
