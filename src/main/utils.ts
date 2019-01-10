import { nativeImage, NativeImage } from "electron";
import { DateTime, Interval } from "luxon";

import paths from "./constants/paths";
import { ProgressType } from "./constants/progressTypes";

const DOB = DateTime.local(1994, 5, 4);
const DOD = DOB.plus({ years: 79 });

export const isDev = (): boolean => {
  return !process.mainModule.filename.includes("app.asar");
};

export const getAppIcon = (): NativeImage => {
  let icon: NativeImage = nativeImage.createFromPath(paths.icons.app);
  icon = icon.resize({ height: 20 });
  icon.setTemplateImage(true);

  return icon;
};

export const getProgressValue = (type: ProgressType): number => {
  const now: DateTime = DateTime.local();
  let progress: number;

  switch (type) {
    case ProgressType.day:
      progress = Interval.fromDateTimes(now.startOf("day"), now).length("days");
      break;
    case ProgressType.week:
      progress = Interval.fromDateTimes(now.startOf("week"), now).length(
        "weeks"
      );
      break;
    case ProgressType.month:
      progress = Interval.fromDateTimes(now.startOf("month"), now).length(
        "months"
      );
      break;
    case ProgressType.year:
      progress = Interval.fromDateTimes(now.startOf("year"), now).length(
        "years"
      );
      break;
    case ProgressType.lifetime:
      progress =
        Interval.fromDateTimes(DOB, now).length("years") /
        Interval.fromDateTimes(DOB, DOD).length("years");
      break;
    default:
      progress = 0;
      break;
  }

  return Math.floor(progress * 100);
};

export const getProgressIcon = (type: ProgressType): NativeImage => {
  const iconPath =
    paths.icons[`progress${Math.floor(getProgressValue(type) / 10)}`];
  let icon: NativeImage = nativeImage.createFromPath(iconPath);
  icon = icon.resize({ height: 16 });
  icon.setTemplateImage(true);

  return icon;
};