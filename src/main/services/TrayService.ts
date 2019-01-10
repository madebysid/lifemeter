import {
  app,
  Tray,
  Menu,
  NativeImage
} from "electron";

import ProgressTypes, { ProgressType } from "../constants/progressTypes";

import StorageService from "./StorageService";
import { isDev, getAppIcon, getProgressValue, getProgressIcon } from "../utils";

class TrayService {
  private tray: Tray;
  private activeProgressType: ProgressType

  handleChangeActiveProgressType = async (type: ProgressType) => {
    this.activeProgressType = type;
    this.update();
    await StorageService.setItem("active", type);
  }

  getMenu = (): Menu => {
    // Progress Types
    const template: Object[] = ProgressTypes.map(time => ({
      id: String(time.id),
      label: `${time.label}: ${getProgressValue(time.id)}%`,
      type: "radio",
      checked: this.activeProgressType === time.id,
      icon: getProgressIcon(time.id),
      click: () => this.handleChangeActiveProgressType(time.id)
    }));

    // Preferences
    template.push({ type: "separator" });
    template.push({
      label: "Preferences",
      click: () => {
        app.relaunch();
        app.exit(0);
      }
    });

    // Quit
    template.push({ type: "separator" });
    template.push({ label: "Quit", role: "quit" });

    // Relaunch
    if (isDev()) {
      template.push({ type: "separator" });
      template.push({
        label: "Relaunch", click: () => {
          app.relaunch();
          app.exit(0);
        }
      });
    }

    return Menu.buildFromTemplate(template);
  }

  create = async () => {
    if (this.tray) {
      this.tray.destroy();
    }

    const icon: NativeImage = getAppIcon();
    this.tray = new Tray(icon);

    const savedActiveProgressType = await StorageService.getItem("active");
    this.activeProgressType = savedActiveProgressType || ProgressType.day;

    if (isDev()) {
      this.tray.setHighlightMode("always");
    }

    this.update();
  }

  update = () => {
    const menu = this.getMenu();
    const title: string = menu.getMenuItemById(String(this.activeProgressType)).label;

    this.tray.setTitle(title);
    this.tray.setContextMenu(menu);

    setTimeout(() => {
      this.update();
    }, 15 * 60 * 1000);
  }
};

export default new TrayService();

