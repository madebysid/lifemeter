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

let tray: Tray;

const setActive = async (type: ProgressType) => {
  setItem("active", type);
  const contextMenu = await getContextMenu();
  const title: string = contextMenu.getMenuItemById(String(type)).label;

  tray.setTitle(title);
}

const getContextMenu = async (): Promise<Menu> => {
  const activeItem = await getItem("active");
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

  return Menu.buildFromTemplate(template);
}

export const createTray = async () => {
  const icon: NativeImage = getAppIcon();
  tray = new Tray(icon);

  const contextMenu = await getContextMenu();
  const activeItem: string | number = await getItem("active");
  const title: string = contextMenu.getMenuItemById(String(activeItem)).label;

  tray.setTitle(title);
  tray.setContextMenu(contextMenu);

  setTimeout(() => {
    tray.destroy();
    createTray();
  }, 10000)
}
