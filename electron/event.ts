import * as fs from "fs";
import { BrowserWindow, app, dialog, ipcMain, ipcRenderer } from "electron";
import type { IPreset } from "../types/schedule.interface";

export const registPresetEventes = () => {
  ipcMain.on("createPreset", (e, preset: string) => {
    const presetJson = JSON.parse(preset);

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
    fs.writeFileSync(app.getPath("userData") + "/hi.txt", "asdfasdfasdfasf");
  });

  ipcMain.on("deletePreset", (e, title) => {
    if (!fs.existsSync(app.getPath("userData") + `/presets/${title}.json`)) {
      e.returnValue = false;
      return;
    }
    fs.unlinkSync(app.getPath("userData") + `/presets/${title}.json`);
    e.returnValue = true;
  });

  ipcMain.on("loadPresetList", (e, _) => {
    try {
      const files = fs.readdirSync(app.getPath("userData") + "/presets");
      e.returnValue = files;
    } catch (err) {
      fs.mkdirSync(app.getPath("userData") + "/presets");
      e.returnValue = [];
    }
  });

  ipcMain.on("readPreset", (_, [title, getPreset]) => {
    const file = fs.readFileSync(
      app.getPath("userData") + `/presets/${title}.json`
    );
    getPreset(file.toJSON());
  });
};

export const registDialogEvent = (mainWindow: BrowserWindow) => {
  ipcMain.on("showDialog", (e, message) => {
    dialog.showMessageBox(mainWindow, { message });
  });
};
