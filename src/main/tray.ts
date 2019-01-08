import { app, Tray, Menu, NativeImage } from "electron";

import { getAppIcon } from "./app";
import { getProgressValue, getProgressIcon, ProgressType } from "./progress";

export const getTray = () : Tray => {
  const icon: NativeImage = getAppIcon();
  const tray: Tray = new Tray(icon);
  const contextMenu: Menu = Menu.buildFromTemplate([
    {
      label: `Day: ${getProgressValue(ProgressType.day)}%`,
      icon: getProgressIcon(ProgressType.day)
    },
    {
      label: `Week: ${getProgressValue(ProgressType.week)}%`,
      icon: getProgressIcon(ProgressType.week)
    },
    {
      label: `Month: ${getProgressValue(ProgressType.month)}%`,
      icon: getProgressIcon(ProgressType.month)
    },
    {
      label: `Year: ${getProgressValue(ProgressType.year)}%`,
      icon: getProgressIcon(ProgressType.year)
    },
    {
      label: `Lifetime: ${getProgressValue(ProgressType.lifetime)}%`,
      icon: getProgressIcon(ProgressType.lifetime)
    },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() }
  ]);

  tray.setContextMenu(contextMenu);

  return tray;
}
