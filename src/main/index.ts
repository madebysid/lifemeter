import { app, Tray } from "electron";

import { createTray } from "./tray";

export default class MainProcess {
  private tray: Tray;

  constructor() {
    app.on("ready", this.onAppReady);
  }

  onAppReady = () => {
    createTray();
  }
}