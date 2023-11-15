import { contextBridge, ipcRenderer } from "electron";

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
// });

contextBridge.exposeInMainWorld("api", {
  createPreset: (preset: string) => {
    return ipcRenderer.sendSync("createPreset", preset);
  },
  updatePreset: (preset: string) => ipcRenderer.send("updatePreset", preset),
  deletePreset: (title: string) => ipcRenderer.send("deletePreset", title),
  loadPresetList: () => ipcRenderer.sendSync("loadPresetList"),
  readPreset: ([title, getPreset]) =>
    ipcRenderer.send("readPreset", [title, getPreset]),
});

contextBridge.exposeInMainWorld("dialog", {
  showDialog: (message: string) => {
    ipcRenderer.send("showDialog", message);
  },
});
