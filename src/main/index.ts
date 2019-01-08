import { resolve } from "path";
import { app, BrowserWindow, Tray, Menu, nativeImage, NativeImage } from "electron";

enum ProgressType {
  day,
  week,
  month,
  year,
  decade,
  lifetime
}


const getProgress = (type: ProgressType): number => {
  switch (type) {
    case ProgressType.day:
      return 12;
    case ProgressType.week:
      return 24;
    case ProgressType.month:
      return 36;
    case ProgressType.year:
      return 48;
    case ProgressType.decade:
      return 60;
    case ProgressType.lifetime:
      return 72;
    default:
      return 0;
  }
}

export default class MainProcess {
  private mainWindow: BrowserWindow;
  private tray: Tray;

  constructor() {
    app.on("ready", this.onAppReady);
    app.on("activate", this.onAppActivate);
  }

  /** App Event listeners */

  onAppReady = () => {
    // this.createWindow();
    this.createTray();
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

  createTray = () => {
    let icon = nativeImage.createFromPath(resolve("./dist/assets/icon.png"));
    icon = icon.resize({
      height: 20
    });

    const getProgresIcon = (progress : number) : NativeImage => {
      const icon : NativeImage = nativeImage.createFromPath(
        resolve(`./dist/assets/progress-${Math.floor(progress / 10)}0.png`)
      );
      return icon.resize({ height: 16 });
    }

    this.tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: `Day: ${getProgress(ProgressType.day)}%`,
        icon: getProgresIcon(getProgress(ProgressType.day))
      },
      {
        label: `Week: ${getProgress(ProgressType.week)}%`,
        icon: getProgresIcon(getProgress(ProgressType.week))
      },
      {
        label: `Month: ${getProgress(ProgressType.month)}%`,
        icon: getProgresIcon(getProgress(ProgressType.month))
      },
      {
        label: `Year: ${getProgress(ProgressType.year)}%`,
        icon: getProgresIcon(getProgress(ProgressType.year))
      },
      {
        label: `Decade: ${getProgress(ProgressType.decade)}%`,
        icon: getProgresIcon(getProgress(ProgressType.decade))
      },
      {
        label: `Lifetime: ${getProgress(ProgressType.lifetime)}%`,
        icon: getProgresIcon(getProgress(ProgressType.lifetime))
      },
      { type: "separator" },
      { label: "Quit", click: () => app.quit() }
    ]);

    this.tray.setContextMenu(contextMenu)
  }
}