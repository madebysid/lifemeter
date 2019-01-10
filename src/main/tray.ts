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

import { isDev } from "./utils";

let tray: Tray;

const getContextMenu = (activeItem: ProgressType): Menu => {
  const template: MenuItemConstructorOptions[] = [
    {
      id: String(ProgressType.day),
      label: `Day: ${getProgressValue(ProgressType.day)}%`,
      icon: getProgressIcon(ProgressType.day),
      type: "radio",
      click: () => setActive(ProgressType.day),
      checked: activeItem === ProgressType.day
    },
    {
      id: String(ProgressType.week),
      label: `Week: ${getProgressValue(ProgressType.week)}%`,
      icon: getProgressIcon(ProgressType.week),
      type: "radio",
      click: () => setActive(ProgressType.week),
      checked: activeItem === ProgressType.week
    },
    {
      id: String(ProgressType.month),
      label: `Month: ${getProgressValue(ProgressType.month)}%`,
      icon: getProgressIcon(ProgressType.month),
      type: "radio",
      click: () => setActive(ProgressType.month),
      checked: activeItem === ProgressType.month
    },
    {
      id: String(ProgressType.year),
      label: `Year: ${getProgressValue(ProgressType.year)}%`,
      icon: getProgressIcon(ProgressType.year),
      type: "radio",
      click: () => setActive(ProgressType.year),
      checked: activeItem === ProgressType.year
    },
    {
      id: String(ProgressType.lifetime),
      label: `Lifetime: ${getProgressValue(ProgressType.lifetime)}%`,
      icon: getProgressIcon(ProgressType.lifetime),
      type: "radio",
      click: () => setActive(ProgressType.lifetime),
      checked: activeItem === ProgressType.lifetime
    },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() }
  ];

  if (isDev()) {
    template.push({ type: "separator" });
    template.push({ label: "Reload", click: () => {
      app.relaunch();
      app.exit(0);
    } });
  }

  return Menu.buildFromTemplate(template);
}

const setActive = async (type: ProgressType) => {
  await setItem("active", type);
  updateTray();
};

const updateTray = async () => {
  const activeItem: ProgressType = (await getItem("active")) || ProgressType.day;
  const contextMenu = getContextMenu(activeItem);
  const title: string = contextMenu.getMenuItemById(String(activeItem)).label;

  tray.setTitle(title);
  tray.setContextMenu(contextMenu);

  setTimeout(() => {
    updateTray();
  }, 15 * 60 * 1000);
}

export const createTray = async () => {
  if (tray) {
    tray.destroy();
  }

  const icon: NativeImage = getAppIcon();
  tray = new Tray(icon);
  updateTray();
}
