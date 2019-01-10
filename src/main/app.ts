import * as path from "path";
import { nativeImage, NativeImage } from "electron";

export const getAppIcon = () : NativeImage => {
  const iconPath = path.resolve(
    __dirname,
    "../assets/images/trayTemplate.png"
  )
  let icon: NativeImage = nativeImage.createFromPath(iconPath);
  icon = icon.resize({ height: 20 });
  icon.setTemplateImage(true);

  return icon;
}