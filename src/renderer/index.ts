import { ipcRenderer } from "electron";

const TIME_INPUT_ID = "#time";
const SAVE_BUTTON_ID = "#save";

(() => {
  let hour: number = 9;

  const handleChangeTime = (e: KeyboardEvent) => {
    const { value } = e.target as HTMLInputElement;
    hour = parseInt(value);
  }

  const handleSave = () => {
    const message: IPCMessage = {
      type: "preferences-set",
      payload: { hour }
    };

    ipcRenderer.send("channel", message);
  };

  const timeInput = document.querySelector(TIME_INPUT_ID);
  const saveButton = document.querySelector(SAVE_BUTTON_ID);

  timeInput.addEventListener("keyup", handleChangeTime);
  saveButton.addEventListener("click", handleSave);
})();
