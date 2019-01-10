import * as path from "path";
import { app } from "electron";

const userDataPath = app.getPath("userData");

export default {
  icons: {
    app: path.resolve(__dirname, "../../assets/images/trayTemplate.png"),

    progress0: path.resolve(
      __dirname,
      `../../assets/images/progress-00-Template.png`
    ),
    progress1: path.resolve(
      __dirname,
      `../../assets/images/progress-10-Template.png`
    ),
    progress2: path.resolve(
      __dirname,
      `../../assets/images/progress-20-Template.png`
    ),
    progress3: path.resolve(
      __dirname,
      `../../assets/images/progress-30-Template.png`
    ),
    progress4: path.resolve(
      __dirname,
      `../../assets/images/progress-40-Template.png`
    ),
    progress5: path.resolve(
      __dirname,
      `../../assets/images/progress-50-Template.png`
    ),
    progress6: path.resolve(
      __dirname,
      `../../assets/images/progress-60-Template.png`
    ),
    progress7: path.resolve(
      __dirname,
      `../../assets/images/progress-70-Template.png`
    ),
    progress8: path.resolve(
      __dirname,
      `../../assets/images/progress-80-Template.png`
    ),
    progress9: path.resolve(
      __dirname,
      `../../assets/images/progress-90-Template.png`
    ),
  },

  data: {
    root: userDataPath,
    preferences: `${userDataPath}/preferences.json`
  }
};