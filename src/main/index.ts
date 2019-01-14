import { app, ipcMain, BrowserWindow } from "electron";

import { isDev } from "./utils";
import TrayService from "./services/TrayService";
import StorageService from "./services/StorageService";
import WindowService from "./services/WindowService";

class MainProcess {
  init() {
    if (!isDev()) {
      app.setLoginItemSettings({ openAtLogin: true });
    }
    app.on('window-all-closed', (e: Event) => e.preventDefault())

    app.on("ready", this.onAppReady);
    ipcMain.on("channel", this.onMessage);
  }

  onAppReady = () => {
    TrayService.create();
  }

  onMessage = async (event: Event, message: IPCMessage) => {
    const { type, payload } = message;
    let window: BrowserWindow = WindowService.getWindow();
    switch (type) {
      case "preferences-set":
        await StorageService.set(payload);

        window.webContents.send("channel", {
          type: "preferences-set-response",
          payload: payload
        });
        break;
      case "preferences-get":
        const preferences = await StorageService.get();

        window.webContents.send("channel", {
          type: "preferences-get-response",
          payload: preferences
        });
        break;
      default:
        break;
    }
  }
}

export default new MainProcess();
