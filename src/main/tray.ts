import {
  app,
  Tray,
  Menu,
  NativeImage,
  MenuItemConstructorOptions
} from "electron";

import { getAppIcon } from "./app";
import { getItem, setItem } from "./storage";
import { getProgressValue, getProgressIcon, ProgressType } from "./progress";

const setActive = (type: ProgressType) => {
  setItem("active", type);
}

export const getTray = async () : Promise<Tray> => {
  const icon: NativeImage = getAppIcon();
  const tray: Tray = new Tray(icon);
  const activeItem = await getItem("active");
  const template: MenuItemConstructorOptions[] = [
    {
      label: `Day: ${getProgressValue(ProgressType.day)}%`,
      icon: getProgressIcon(ProgressType.day),
      type: "radio",
      click: () => setActive(ProgressType.day),
      checked: activeItem === ProgressType.day
    },
    {
      label: `Week: ${getProgressValue(ProgressType.week)}%`,
      icon: getProgressIcon(ProgressType.week),
      type: "radio",
      click: () => setActive(ProgressType.week),
      checked: activeItem === ProgressType.week
    },
    {
      label: `Month: ${getProgressValue(ProgressType.month)}%`,
      icon: getProgressIcon(ProgressType.month),
      type: "radio",
      click: () => setActive(ProgressType.month),
      checked: activeItem === ProgressType.month
    },
    {
      label: `Year: ${getProgressValue(ProgressType.year)}%`,
      icon: getProgressIcon(ProgressType.year),
      type: "radio",
      click: () => setActive(ProgressType.year),
      checked: activeItem === ProgressType.year
    },
    {
      label: `Lifetime: ${getProgressValue(ProgressType.lifetime)}%`,
      icon: getProgressIcon(ProgressType.lifetime),
      type: "radio",
      click: () => setActive(ProgressType.lifetime),
      checked: activeItem === ProgressType.lifetime
    },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() }
  ]
  const contextMenu: Menu = Menu.buildFromTemplate(template);
  let title: string = "";

  for (const item of template) {
    if (item.checked) {
      title = item.label;
      break;
    }
  }

  tray.setTitle(title);
  tray.setContextMenu(contextMenu);

  return tray;
}
