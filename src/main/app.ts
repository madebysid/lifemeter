import { nativeImage, NativeImage } from "electron";

export const getAppIcon = () : NativeImage => {
  const icon: NativeImage = nativeImage.createFromPath("./build/assets/icon.png");

  return icon.resize({ height: 20 });
}