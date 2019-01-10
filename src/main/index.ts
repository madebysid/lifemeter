import { app } from "electron";

import { isDev } from "./utils";
import { createTray } from "./tray";

export default class MainProcess {
  constructor() {
    if (!isDev()) {
      app.setLoginItemSettings({ openAtLogin: true });
    }

    app.on("ready", this.onAppReady);
  }

  onAppReady = () => {
    createTray();
  }
}