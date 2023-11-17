"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registSaveEvent = exports.registWindowsEvent = exports.registDialogEvent = exports.registPresetEventes = void 0;
var fs = require("fs");
var electron_1 = require("electron");
var createFolder = function (folderName) {
    if (!fs.existsSync(electron_1.app.getPath("userData") + "/".concat(folderName))) {
        fs.mkdirSync(electron_1.app.getPath("userData") + "/".concat(folderName));
    }
};
var registPresetEventes = function () {
    electron_1.ipcMain.on("createPreset", function (e, preset) {
        var presetJson = JSON.parse(preset);
        createFolder("preset");
        if (fs.existsSync(electron_1.app.getPath("userData") + "/presets/".concat(presetJson.title, ".json"))) {
            e.returnValue = false;
            return false;
        }
        fs.writeFileSync(electron_1.app.getPath("userData") + "/presets/".concat(presetJson.title, ".json"), preset, "utf8");
        e.returnValue = true;
        return true;
    });
    electron_1.ipcMain.on("updatePreset", function (_, args) {
        createFolder("preset");
        fs.writeFileSync(electron_1.app.getPath("userData") + "/hi.txt", "asdfasdfasdfasf");
    });
    electron_1.ipcMain.on("deletePreset", function (e, title) {
        createFolder("preset");
        if (!fs.existsSync(electron_1.app.getPath("userData") + "/presets/".concat(title, ".json"))) {
            e.returnValue = false;
            return;
        }
        fs.unlinkSync(electron_1.app.getPath("userData") + "/presets/".concat(title, ".json"));
        e.returnValue = true;
    });
    electron_1.ipcMain.on("loadPresetList", function (e, _) {
        createFolder("preset");
        var files = fs.readdirSync(electron_1.app.getPath("userData") + "/presets");
        e.returnValue = files;
    });
    electron_1.ipcMain.on("readPreset", function (e, title) {
        createFolder("preset");
        var file = fs.readFileSync(electron_1.app.getPath("userData") + "/presets/".concat(title, ".json"), "utf-8");
        e.returnValue = file;
    });
};
exports.registPresetEventes = registPresetEventes;
var registDialogEvent = function (mainWindow) {
    electron_1.ipcMain.on("showDialog", function (e, message) {
        electron_1.dialog.showMessageBox(mainWindow, { message: message });
    });
};
exports.registDialogEvent = registDialogEvent;
var registWindowsEvent = function (mainBrowser) {
    electron_1.ipcMain.on("set-ignore-mouse-events", function (event, ignore, options) {
        mainBrowser.setIgnoreMouseEvents(ignore, options);
    });
    electron_1.ipcMain.on("close-window", function () {
        mainBrowser.close();
    });
    electron_1.ipcMain.on("minimalize-window", function () {
        mainBrowser.minimize();
    });
};
exports.registWindowsEvent = registWindowsEvent;
var registSaveEvent = function () {
    electron_1.ipcMain.on("save-data", function (e, data) {
        createFolder("save");
        fs.writeFileSync(electron_1.app.getPath("userData") + "/save/auto_save.json", data);
    });
    electron_1.ipcMain.on("load-data", function (e) {
        createFolder("save");
        if (!fs.existsSync(electron_1.app.getPath("userData") + "/save/auto_save.json")) {
            e.returnValue = undefined;
            return;
        }
        var file = fs.readFileSync(electron_1.app.getPath("userData") + "/save/auto_save.json", "utf-8");
        e.returnValue = file;
    });
};
exports.registSaveEvent = registSaveEvent;
