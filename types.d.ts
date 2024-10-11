interface Window {
	electron: {
		SubscribeToJsonChange: (callback: SubscribeCallback) => void;
		GetSpritesFolder: () => Promise<string>;
		GetShinySpritesFolder: () => Promise<string>;
		SaveJsonData: SaveJsonFunc;
		LoadJsonData: LoadJsonFunc;
	};
}

type SubscribeCallback = (file: JsonFiles) => void;

type PokemonJson = {
	name: string;
	url: string;
	id: string;
	rarity: string;
};

type AbilityJson = {
	name: string;
	url: string;
	generation: string;
};

type IvJson = {
	short: string;
	name: string;
};

type NatureJson = {
	name: string;
	url: string;
};

type PokemonFile = { [key: string]: PokemonJson };
type AbilityFile = { [key: string]: AbilityJson };

type JsonFiles = "abilities" | "ivs" | "natures" | "pokemons" | "rarities";
type JsonDatas = PokemonJson | AbilityJson | IvJson | NatureJson;

type JsonTypes<T> = T extends "pokemons"
	? PokemonFile
	: T extends "abilities"
	? AbilityFile
	: T extends "natures"
	? NatureJson[]
	: T extends "ivs"
	? IvJson[]
	: never;

type DataTypes<T> = T extends "pokemons"
	? PokemonJson
	: T extends "abilities"
	? AbilityJson
	: never;

type SaveJsonFunc = <T extends JsonFiles>(file: T, data: DataTypes<T>) => void;
type LoadJsonFunc = <T extends JsonFiles>(file: T) => Promise<JsonTypes<T>>;
