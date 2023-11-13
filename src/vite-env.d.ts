/// <reference types="vite/client" />

interface Window {
  api: {
    createPreset: (preset: string) => void;
    updatePreset: (preset: string) => void;
    deletePreset: (title: string) => void;
    loadPresetList: () => any;
    readPreset: ([title, getPreset]: [
      title: string,
      getPreset: () => void
    ]) => void;
  };
}
