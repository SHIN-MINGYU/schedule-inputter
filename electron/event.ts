import * as fs from "fs";
import { app, ipcMain, ipcRenderer } from "electron";
import type { IPreset } from "../types/schedule.interface";

export const registPresetEventes = () => {
  ipcMain.on("createPreset", (_, preset: string) => {
    const presetJson = JSON.parse(preset);
    fs.writeFileSync(
      app.getPath("userData") + `/presets/${presetJson.title}.json`,
      preset,
      "utf8"
    );
  });

  ipcMain.on("updatePreset", (_, args) => {
    fs.writeFileSync(app.getPath("userData") + "/hi.txt", "asdfasdfasdfasf");
  });

  ipcMain.on("deletePreset", (_, title) => {
    fs.unlinkSync(app.getPath("userData") + `/presets/${title}.json`);
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
