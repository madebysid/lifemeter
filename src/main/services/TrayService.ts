import {
  app,
  Tray,
  Menu,
  NativeImage
} from "electron";

import ProgressTypes from "../constants/progressTypes";

import StorageService from "./StorageService";
import WindowService from "./WindowService";
import {
  isDev,
  getAppIcon,
  getProgressLabel,
  getProgressValue,
  getProgressIcon
} from "../utils";

class TrayService {
  private tray: Tray;
  private activeProgressType: ProgressType
  private timeout: NodeJS.Timeout;

  handleChangeActiveProgressType = async (type: ProgressType) => {
    this.activeProgressType = type;
    this.update();
    await StorageService.setItem("active", type);
  }

  handleOpenPreferences = () => {
    WindowService.open();
  }

  getMenu = async (): Promise<Menu> => {
    const preferences: Preferences = await StorageService.get();
    // Progress Types
    const template: Object[] = ProgressTypes.map(type => ({
      id: String(type),
      label: `${getProgressLabel(type)}: ${getProgressValue(type, preferences)}%`,
      type: "radio",
      checked: this.activeProgressType === type,
      icon: getProgressIcon(type, preferences),
      click: () => this.handleChangeActiveProgressType(type)
    }));

    // Preferences
    template.push({ type: "separator" });
    template.push({
      label: "Preferences",
      click: () => this.handleOpenPreferences()
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
    this.activeProgressType = savedActiveProgressType || "day";

    if (isDev()) {
      this.tray.setHighlightMode("always");
    }

    this.update();
  }

  update = async () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const menu = await this.getMenu();
    const title: string = menu.getMenuItemById(String(this.activeProgressType)).label;

    this.tray.setTitle(title);
    this.tray.setContextMenu(menu);

    this.timeout = setTimeout(() => {
      this.update();
    }, 15 * 60 * 1000);
  }
};

export default new TrayService();

