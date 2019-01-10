import { app } from "electron";

import { isDev } from "./utils";
import TrayService from "./services/TrayService";

export default class MainProcess {
  constructor() {
    if (!isDev()) {
      app.setLoginItemSettings({ openAtLogin: true });
    }

    app.on("ready", this.onAppReady);
  }

  onAppReady = () => {
    TrayService.create();
  }
}
