import { nativeImage, NativeImage } from "electron";

export enum ProgressType {
  day,
  week,
  month,
  year,
  decade,
  lifetime
};

export const getProgressValue = (type: ProgressType): number => {
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
};

export const getProgressIcon = (type: ProgressType): NativeImage => {
  const icon: NativeImage = nativeImage.createFromPath(
    `./dist/assets/progress-${Math.floor(getProgressValue(type) / 10)}0.png`
  );

  return icon.resize({ height: 16 });
};
