/// <reference types="vite/client" />

interface Window {
  api: {
    createPreset: (preset: string) => boolean;
    updatePreset: (preset: string) => void;
    deletePreset: (title: string) => void;
    loadPresetList: () => string[];
    readPreset: (title: string) => string;
    saveData: (monthSchedule: string) => void;
    loadData: () => string;
  };

  dialog: {
    showDialog: (message: string) => void;
  };
  electron: {
    ignoreMouseEvents: () => void;
    noIgnoreMouseEvents: () => void;
    closeWindow: () => void;
    minimalizeWindow: () => void;
  };
}

interface String {
  getBlankCountForGmail: () => number;
  addBlank: (count: number) => string;
}
