import { nativeImage, NativeImage } from "electron";

export const getAppIcon = () : NativeImage => {
  const icon: NativeImage = nativeImage.createFromPath("./dist/assets/icon.png");

  return icon.resize({ height: 20 });
}