import { contextBridge, ipcMain, ipcRenderer } from "electron";
import type { IPreset } from "../types/schedule.interface";

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
// });

contextBridge.exposeInMainWorld("api", {
  createPreset: (preset: string) => ipcRenderer.send("createPreset", preset),
  updatePreset: (preset: string) => ipcRenderer.send("updatePreset", preset),
  deletePreset: (title: string) => ipcRenderer.send("deletePreset", title),
  loadPresetList: () => ipcRenderer.send("loadPresetList"),
  readPreset: ([title, getPreset]) =>
    ipcRenderer.send("readPreset", [title, getPreset]),
});
