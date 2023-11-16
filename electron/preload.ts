import { contextBridge, ipcRenderer } from "electron";
import type { IPreset } from "../types/schedule.interface";
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
  readPreset: (title: string) => ipcRenderer.sendSync("readPreset", title),
  saveData: (monthSchedules: string) =>
    ipcRenderer.send("save-data", monthSchedules),
  loadData: () => ipcRenderer.sendSync("load-data"),
});

contextBridge.exposeInMainWorld("dialog", {
  showDialog: (message: string) => {
    ipcRenderer.send("showDialog", message);
  },
});

contextBridge.exposeInMainWorld("electron", {
  ignoreMouseEvents: () => {
    ipcRenderer.send("set-ignore-mouse-events", true, { forward: true });
  },
  noIgnoreMouseEvents: () => {
    ipcRenderer.send("set-ignore-mouse-events", false);
  },
  closeWindow: () => {
    ipcRenderer.send("close-window");
  },
  minimalizeWindow: () => {
    ipcRenderer.send("minimalize-window");
  },
});
