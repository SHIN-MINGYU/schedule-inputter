"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
// });
electron_1.contextBridge.exposeInMainWorld("api", {
    createPreset: function (preset) {
        return electron_1.ipcRenderer.sendSync("createPreset", preset);
    },
    updatePreset: function (preset) { return electron_1.ipcRenderer.send("updatePreset", preset); },
    deletePreset: function (title) { return electron_1.ipcRenderer.send("deletePreset", title); },
    loadPresetList: function () { return electron_1.ipcRenderer.sendSync("loadPresetList"); },
    readPreset: function (title) { return electron_1.ipcRenderer.sendSync("readPreset", title); },
    saveData: function (monthSchedules) {
        return electron_1.ipcRenderer.send("save-data", monthSchedules);
    },
    loadData: function () { return electron_1.ipcRenderer.sendSync("load-data"); },
});
electron_1.contextBridge.exposeInMainWorld("dialog", {
    showDialog: function (message) {
        electron_1.ipcRenderer.send("showDialog", message);
    },
});
electron_1.contextBridge.exposeInMainWorld("electron", {
    ignoreMouseEvents: function () {
        electron_1.ipcRenderer.send("set-ignore-mouse-events", true, { forward: true });
    },
    noIgnoreMouseEvents: function () {
        electron_1.ipcRenderer.send("set-ignore-mouse-events", false);
    },
    closeWindow: function () {
        electron_1.ipcRenderer.send("close-window");
    },
    minimalizeWindow: function () {
        electron_1.ipcRenderer.send("minimalize-window");
    },
});
