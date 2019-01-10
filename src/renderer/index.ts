import { ipcRenderer } from "electron";

ipcRenderer.send("channel", {
  type: "test",
  payload: {
    a: "b"
  }
});

console.log('renderer')