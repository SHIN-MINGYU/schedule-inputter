"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registDialogEvent = exports.registPresetEventes = void 0;
var fs = require("fs");
var electron_1 = require("electron");
var registPresetEventes = function () {
    electron_1.ipcMain.on("createPreset", function (e, preset) {
        var presetJson = JSON.parse(preset);
        if (fs.existsSync(electron_1.app.getPath("userData") + "/presets/".concat(presetJson.title, ".json"))) {
            e.returnValue = false;
            return false;
        }
        fs.writeFileSync(electron_1.app.getPath("userData") + "/presets/".concat(presetJson.title, ".json"), preset, "utf8");
        e.returnValue = true;
        return true;
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
var registDialogEvent = function (mainWindow) {
    electron_1.ipcMain.on("showDialog", function (e, message) {
        electron_1.dialog.showMessageBox(mainWindow, { message: message });
    });
};
exports.registDialogEvent = registDialogEvent;
