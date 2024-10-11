import path from "path";
import { app } from "electron";
import { IsDev } from "./IsDev.js";

export function GetPreloadPath() {
	return path.join(
		app.getAppPath(),
		IsDev() ? "." : "..",
		"/dist-electron/preload.cjs"
	);
}
