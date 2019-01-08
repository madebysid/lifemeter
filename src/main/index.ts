import { resolve } from "path";
import { app, BrowserWindow } from "electron";

export default class MainProcess {
  private mainWindow: BrowserWindow;

  constructor() {
    app.on("ready", this.onAppReady);
    app.on("activate", this.onAppActivate);
  }

  /** App Event listeners */

  onAppReady = () => {
    this.createWindow();
  }

  onAppActivate = () => {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  /** Methods */

  createWindow = () => {
    this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
    this.mainWindow.loadURL(`file://${resolve('./dist/index.html')}`);

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    })
  }
}