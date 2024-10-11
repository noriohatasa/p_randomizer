import path from "path";
import { IsDev } from "./IsDev.js";

export default function GetJsonPath(file: JsonFiles) {
	return path.join(
		IsDev() ? "./public" : "./resources/dist-react",
		`/jsons/${file}.json`
	);
}
