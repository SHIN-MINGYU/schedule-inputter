import { BrowserWindow, app } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import { windowOption } from "./config";
import * as dotenv from "dotenv";
import {
  registDialogEvent,
  registPresetEventes,
  registSaveEvent,
  registWindowsEvent,
} from "./event";

dotenv.config();

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    ...windowOption,
    titleBarStyle: "hidden",
    maximizable: false,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isDev) {
    mainWindow.loadURL(process.env.BASE_URL || "http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
  }

  registPresetEventes();
  registDialogEvent(mainWindow);
  registWindowsEvent(mainWindow);
  registSaveEvent();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
