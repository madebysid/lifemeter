import { app, ipcMain } from "electron";

import { isDev } from "./utils";
import TrayService from "./services/TrayService";

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

  onMessage = (event: Event, message: IPCMessage) => {
    console.log("got message", message);
  }
}

export default new MainProcess();
