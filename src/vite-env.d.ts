/// <reference types="vite/client" />

interface Window {
  api: {
    createPreset: (preset: string) => boolean;
    updatePreset: (preset: string) => void;
    deletePreset: (title: string) => void;
    loadPresetList: () => string[];
    readPreset: ([title, getPreset]: [
      title: string,
      getPreset: () => void
    ]) => void;
  };

  dialog: {
    showDialog: (message: string) => void;
  };
}
