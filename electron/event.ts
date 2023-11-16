import * as fs from "fs";
import { BrowserWindow, app, dialog, ipcMain, ipcRenderer } from "electron";
import type { IPreset } from "../types/schedule.interface";
const createFolder = (folderName: string) => {
  if (!fs.existsSync(app.getPath("userData") + `/${folderName}`)) {
    fs.mkdirSync(app.getPath("userData") + `/${folderName}`);
  }
};

export const registPresetEventes = () => {
  ipcMain.on("createPreset", (e, preset: string) => {
    const presetJson = JSON.parse(preset);
    createFolder("preset");
    if (
      fs.existsSync(
        app.getPath("userData") + `/presets/${presetJson.title}.json`
      )
    ) {
      e.returnValue = false;
      return false;
    }
    fs.writeFileSync(
      app.getPath("userData") + `/presets/${presetJson.title}.json`,
      preset,
      "utf8"
    );
    e.returnValue = true;
    return true;
  });

  ipcMain.on("updatePreset", (_, args) => {
    createFolder("preset");
    fs.writeFileSync(app.getPath("userData") + "/hi.txt", "asdfasdfasdfasf");
  });

  ipcMain.on("deletePreset", (e, title) => {
    createFolder("preset");

    if (!fs.existsSync(app.getPath("userData") + `/presets/${title}.json`)) {
      e.returnValue = false;
      return;
    }
    fs.unlinkSync(app.getPath("userData") + `/presets/${title}.json`);
    e.returnValue = true;
  });

  ipcMain.on("loadPresetList", (e, _) => {
    createFolder("preset");
    const files = fs.readdirSync(app.getPath("userData") + "/presets");
    e.returnValue = files;
  });

  ipcMain.on("readPreset", (e, title) => {
    createFolder("preset");

    const file = fs.readFileSync(
      app.getPath("userData") + `/presets/${title}.json`,
      "utf-8"
    );
    e.returnValue = file;
  });
};

export const registDialogEvent = (mainWindow: BrowserWindow) => {
  ipcMain.on("showDialog", (e, message) => {
    dialog.showMessageBox(mainWindow, { message });
  });
};

export const registWindowsEvent = (mainBrowser: BrowserWindow) => {
  ipcMain.on("set-ignore-mouse-events", (event, ignore, options) => {
    mainBrowser.setIgnoreMouseEvents(ignore, options);
  });

  ipcMain.on("close-window", () => {
    mainBrowser.close();
  });

  ipcMain.on("minimalize-window", () => {
    mainBrowser.minimize();
  });
};

export const registSaveEvent = () => {
  ipcMain.on("save-data", (e, data: string) => {
    createFolder("save");
    console.log(data);
    fs.writeFileSync(app.getPath("userData") + "/save/auto_save.json", data);
  });

  ipcMain.on("load-data", (e) => {
    createFolder("save");

    if (!fs.existsSync(app.getPath("userData") + `/save/auto_save.json`)) {
      e.returnValue = undefined;
      return;
    }
    const file = fs.readFileSync(
      app.getPath("userData") + `/save/auto_save.json`,
      "utf-8"
    );

    e.returnValue = file;
  });
};
