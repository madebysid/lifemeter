import { app, Tray } from "electron";

import { getTray } from "./tray";

export default class MainProcess {
  private tray: Tray;

  constructor() {
    app.on("ready", this.onAppReady);
  }

  onAppReady = () => {
    this.createTray();
  }

  createTray = async () => {
    this.tray = await getTray();
  }
}