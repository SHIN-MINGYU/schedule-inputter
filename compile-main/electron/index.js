"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
var config_1 = require("./config");
var dotenv = require("dotenv");
var event_1 = require("./event");
dotenv.config();
var mainWindow = null;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow(__assign(__assign({}, config_1.windowOption), { 
        // titleBarStyle: "hidden",
        webPreferences: {
            devTools: isDev,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        } }));
    if (isDev) {
        mainWindow.loadURL(process.env.BASE_URL || "http://localhost:5173");
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }
    else {
        mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
    }
};
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
(0, event_1.registPresetEventes)();
