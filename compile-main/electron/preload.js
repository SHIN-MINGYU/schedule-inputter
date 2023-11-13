"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
// });
electron_1.contextBridge.exposeInMainWorld("api", {
    createPreset: function (preset) { return electron_1.ipcRenderer.send("createPreset", preset); },
    updatePreset: function (preset) { return electron_1.ipcRenderer.send("updatePreset", preset); },
    deletePreset: function (title) { return electron_1.ipcRenderer.send("deletePreset", title); },
    loadPresetList: function () { return electron_1.ipcRenderer.send("loadPresetList"); },
    readPreset: function (_a) {
        var title = _a[0], getPreset = _a[1];
        return electron_1.ipcRenderer.send("readPreset", [title, getPreset]);
    },
});
