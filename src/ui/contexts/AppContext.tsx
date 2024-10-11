import { PokemonClient } from "pokenode-ts";
import { useCallback } from "react";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface Context {
	pokeApi: PokemonClient;
	imgPath: string;
	shinyImgPath: string;
	pokemonJson: PokemonFile;
	pokemonArray: PokemonJson[];
	updatePokemons: () => Promise<void>;
	abilitiesJson: AbilityFile;
	abilitiesArray: AbilityJson[];
	updateAbilities: () => Promise<void>;
	naturesArray: NatureJson[];
	ivsArray: IvJson[];
}

const AppContext = createContext<Context>({} as any);

type args = {
	children: ReactNode;
};

export default function AppProvider({ children }: args) {
	// #region States
	const [pokeApi] = useState(new PokemonClient());
	const [imgPath, setImgPath] = useState("");
	const [shinyImgPath, setShinyImgPath] = useState("");
	const [pokemonJson, setPokemonJson] = useState<PokemonFile>({});
	const [pokemonArray, setPokemonArray] = useState<PokemonJson[]>([]);
	const [abilitiesJson, setAbilitiesJson] = useState<AbilityFile>({});
	const [abilitiesArray, setAbilitiesArray] = useState<AbilityJson[]>([]);
	const [naturesArray, setNaturesArray] = useState<NatureJson[]>([]);
	const [ivsArray, setIvsArray] = useState<IvJson[]>([]);
	// #endregion

	// #region SetSpritesPaths
	useEffect(() => {
		const setSpritesDirectory = async () => {
			setImgPath(await window.electron.GetSpritesFolder());
			setShinyImgPath(await window.electron.GetShinySpritesFolder());
		};

		setSpritesDirectory();
	}, []);
	// #endregion

	// #region SetPokemons
	const updatePokemons = useCallback(async () => {
		console.log("Loading pokemons");
		const data = await window.electron.LoadJsonData("pokemons");
		setPokemonJson(data);
		setPokemonArray(Object.values(data));
	}, [setPokemonJson, setPokemonArray]);

	useEffect(() => {
		updatePokemons();
	}, [updatePokemons]);
	// #endregion

	// #region SetAbilities
	const updateAbilities = useCallback(async () => {
		console.log("Loading abilities");
		const data = await window.electron.LoadJsonData("abilities");
		setAbilitiesJson(data);
		setAbilitiesArray(Object.values(data));
	}, [setAbilitiesJson, setAbilitiesArray]);

	useEffect(() => {
		updateAbilities();
	}, [updateAbilities]);
	// #endregion

	// #region SetNatures
	const updateNatures = useCallback(async () => {
		console.log("Loading natures");
		const data = await window.electron.LoadJsonData("natures");
		setNaturesArray(data);
	}, [setNaturesArray]);

	useEffect(() => {
		updateNatures();
	}, [updateNatures]);
	// #endregion

	// #region SetIvs
	const updateIvs = useCallback(async () => {
		console.log("Loading ivs");
		const data = await window.electron.LoadJsonData("ivs");
		setIvsArray(data);
	}, [setNaturesArray]);

	useEffect(() => {
		updateIvs();
	}, [updateIvs]);
	// #endregion

	// #region ReloadDataEvent
	useEffect(() => {
		window.electron.SubscribeToJsonChange((file: JsonFiles) => {
			switch (file) {
				case "abilities":
					updateAbilities();
					break;
				case "pokemons":
					updatePokemons();
			}
		});
	}, []);
	// #endregion

	return (
		<AppContext.Provider
			value={{
				pokeApi,
				imgPath,
				shinyImgPath,
				pokemonJson,
				pokemonArray,
				updatePokemons,
				abilitiesJson,
				abilitiesArray,
				updateAbilities,
				naturesArray,
				ivsArray,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function UseAppContext() {
	const context = useContext(AppContext);

	return context;
}
