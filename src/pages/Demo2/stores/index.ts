import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ConfigStore {
  toggleBloom: boolean;
  toggleMirror: boolean;
  mapPlayComplete: boolean;
  cloud: boolean;
  bar: boolean;
  rotation: boolean;
  heat: boolean;
  mode: boolean;
  toggle: (key: keyof Omit<ConfigStore, "toggle">) => void;
}

export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector((set) => ({
    toggleBloom: false,
    toggleMirror: true,
    mapPlayComplete: false,
    cloud: true,
    bar: true,
    rotation: true,
    heat: true,
    mode: true,
    toggle: (key) => set((s) => ({ [key]: !s[key] })),
  }))
);
