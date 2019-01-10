import { BrowserWindow } from "electron";

import paths from "../constants/paths";

class WindowService {
  private window: BrowserWindow;

  open = () => {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      titleBarStyle: "hiddenInset",
      backgroundColor: "#2A2A2A"
    });
    this.window.loadURL(paths.renderer.root);
  }

  getWindow = () => {
    return this.window;
  }
}

export default new WindowService();
