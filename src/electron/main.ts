import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { IsDev } from "./utils/IsDev.js";
import { GetPreloadPath } from "./utils/GetPreloadPath.js";
import fs from "fs";
import GetJsonPath from "./utils/GetJsonPath.js";

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		webPreferences: { preload: GetPreloadPath() },
	});

	if (IsDev()) {
		mainWindow.loadURL("http://localhost:3000");
	} else {
		mainWindow.loadFile(
			path.join(app.getAppPath() + "/dist-react/index.html")
		);
	}

	ipcMain.handle("GetSpritesFolder", GetSpritesFolder);
	ipcMain.handle("GetShinySpritesFolder", GetShinySpritesFolder);
	ipcMain.handle("LoadJsonData", LoadJsonData);

	ipcMain.handle(
		"SaveJsonData",
		(_, file: JsonFiles, data: DataTypes<JsonFiles>) =>
			SaveJsonData(file, data, mainWindow)
	);
});

async function SaveJsonData(
	file: JsonFiles,
	data: DataTypes<JsonFiles>,
	window: BrowserWindow
) {
	const filePath = GetJsonPath(file);
	const fileData = JSON.parse(await fs.readFileSync(filePath).toString());

	switch (file) {
		case "abilities":
			const idxA = (data as AbilityJson).name;
			fileData[idxA] = data;
			break;
		case "pokemons":
			const idxP = (data as PokemonJson).id;
			fileData[idxP] = data;
			break;
	}

	await fs.writeFileSync(filePath, JSON.stringify(fileData));

	window.webContents.send("update", file);
}

async function GetShinySpritesFolder() {
	return path.join(IsDev() ? "" : "../../dist-react", "/pokemon/shiny");
}

async function GetSpritesFolder() {
	return path.join(IsDev() ? "" : "../../dist-react", "/pokemon");
}

async function LoadJsonData(_: any, file: JsonFiles) {
	const filePath = GetJsonPath(file);
	return JSON.parse(await fs.readFileSync(filePath).toString());
}
