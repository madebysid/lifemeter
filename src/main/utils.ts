export const isDev = (): boolean => {
  return !process.mainModule.filename.includes("app.asar");
}