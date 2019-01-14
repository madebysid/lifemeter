import { ipcRenderer } from "electron";

export const isDirty = (source: any, modified: any) => {
  return JSON.stringify(source) !== JSON.stringify(modified); 
}

export const setPreferences = (preferences: Preferences): Promise<Preferences> => {
  return new Promise(resolve => {
    ipcRenderer.once("channel", (event: Event, message: IPCMessage) => {
      if (message.type === "preferences-set-response") {
        return resolve(message.payload);
      }
    });

    const message: IPCMessage = {
      type: "preferences-set",
      payload: preferences
    };

    ipcRenderer.send("channel", message);
  });
}

export const getPreferences = async (): Promise<Preferences> => {
  return new Promise(resolve => {
    ipcRenderer.once("channel", (event: Event, message: IPCMessage) => {
      if (message.type === "preferences-get-response") {
        return resolve(message.payload);
      }
    });

    const message: IPCMessage = { type: "preferences-get" }
    ipcRenderer.send("channel", message);
  });
};