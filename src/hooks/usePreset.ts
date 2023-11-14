import { useEffect, useState } from "react";
import { IPreset } from "../../types/schedule.interface";

export default function usePreset() {
  const [presetList, setPresetList] = useState<string[]>([]);
  useEffect(() => {
    const list = window.api.loadPresetList();
    setPresetList(list);
  }, []);

  const createPrest = (preset: IPreset) => {
    const presetStr = JSON.stringify(preset);
    window.api.createPreset(presetStr);
  };

  const deletePreset = (title: string) => {
    window.api.deletePreset(title);
  };

  return { presetList, createPrest, deletePreset };
}
