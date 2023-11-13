"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registPresetEventes = void 0;
var fs = require("fs");
var electron_1 = require("electron");
var registPresetEventes = function () {
    electron_1.ipcMain.on("createPreset", function (_, preset) {
        var presetJson = JSON.parse(preset);
        fs.writeFileSync(electron_1.app.getPath("userData") + "/presets/".concat(presetJson.title, ".json"), preset, "utf8");
    });
    electron_1.ipcMain.on("updatePreset", function (_, args) {
        fs.writeFileSync(electron_1.app.getPath("userData") + "/hi.txt", "asdfasdfasdfasf");
    });
    electron_1.ipcMain.on("deletePreset", function (_, title) {
        fs.unlinkSync(electron_1.app.getPath("userData") + "/presets/".concat(title, ".json"));
    });
    electron_1.ipcMain.on("loadPresetList", function (e, _) {
        try {
            var files = fs.readdirSync(electron_1.app.getPath("userData") + "/presets");
            e.returnValue = files;
        }
        catch (err) {
            fs.mkdirSync(electron_1.app.getPath("userData") + "/presets");
            e.returnValue = [];
        }
    });
    electron_1.ipcMain.on("readPreset", function (_, _a) {
        var title = _a[0], getPreset = _a[1];
        var file = fs.readFileSync(electron_1.app.getPath("userData") + "/presets/".concat(title, ".json"));
        getPreset(file.toJSON());
    });
};
exports.registPresetEventes = registPresetEventes;
