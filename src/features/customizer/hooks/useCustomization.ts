import { useState } from "react";

export interface CustomizationConfig {
  color: string;
  eyeStyle: string;
  accessory: string;
  name: string;
}

export function useCustomization(initialConfig?: Partial<CustomizationConfig>) {
  const [config, setConfig] = useState<CustomizationConfig>({
    color: "#ff8fb1",
    eyeStyle: "cute",
    accessory: "none",
    name: "",
    ...initialConfig,
  });

  const updateConfig = (newConfig: Partial<CustomizationConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return {
    config,
    updateConfig,
    setConfig,
  };
}
