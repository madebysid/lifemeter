import { app, ipcMain } from "electron";

import { isDev } from "./utils";
import TrayService from "./services/TrayService";
import StorageService from "./services/StorageService";

class MainProcess {
  init() {
    if (!isDev()) {
      app.setLoginItemSettings({ openAtLogin: true });
    }

    app.on("ready", this.onAppReady);
    ipcMain.on("channel", this.onMessage);
  }

  onAppReady = () => {
    TrayService.create();
  }

  onMessage = async (event: Event, message: IPCMessage) => {
    const { type, payload } = message;
    console.log("got message", message);
    switch (type) {
      case "preferences-set":
        await StorageService.setItem("hour", payload.hour);
        await StorageService.setItem("dobDate", payload.dobDate);
        await StorageService.setItem("dobMonth", payload.dobMonth);
        await StorageService.setItem("dobYear", payload.dobYear);
        break;
      case "preferences-get":
        const preferences = await StorageService.get();
        break;
      default:
        break;
    }
  }
}

export default new MainProcess();
