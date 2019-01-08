import { app, Tray } from "electron";

import { createTray } from "./tray";

export default class MainProcess {
  constructor() {
    app.on("ready", this.onAppReady);
  }

  onAppReady = () => {
    createTray();
  }
}