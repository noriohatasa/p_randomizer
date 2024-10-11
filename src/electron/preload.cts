const e = require("electron");

e.contextBridge.exposeInMainWorld("electron", {
	SubscribeToJsonChange: (callback: SubscribeCallback) => {
		e.ipcRenderer.on("update", (_, file: JsonFiles) => {
			callback(file);
		});
	},

	GetSpritesFolder: () => {
		return e.ipcRenderer.invoke("GetSpritesFolder");
	},

	GetShinySpritesFolder: () => {
		return e.ipcRenderer.invoke("GetShinySpritesFolder");
	},

	SaveJsonData: <T extends JsonFiles>(file: T, data: DataTypes<T>) => {
		e.ipcRenderer.invoke("SaveJsonData", file, data);
	},

	LoadJsonData: (file: JsonFiles) => {
		return e.ipcRenderer.invoke("LoadJsonData", file);
	},
} satisfies Window["electron"]);
