import { ipcRenderer } from "electron";

const TIME_DISPLAY_ID = "#time";
const DOB_DAY_INPUT_ID = "#dob__day";
const DOB_MONTH_INPUT_ID = "#dob__month";
const DOB_YEAR_INPUT_ID = "#dob__year";
const SAVE_BUTTON_ID = "#save";

(async () => {
  const getPreferences = async (): Promise<Preferences> => {
    return new Promise((resolve, reject) => {
      ipcRenderer.on("channel", (event: Event, message: IPCMessage) => {
        return resolve(message.payload);
      });

      const message: IPCMessage = { type: "preferences-get" }
      ipcRenderer.send("channel", message);
    });
  };

  const preferences: Preferences = await getPreferences();
  let hour: number = preferences.hour;
  let dob: Date = new Date(preferences.dobYear, preferences.dobMonth, preferences.dobDate);

  const handleChangeTime = (e: KeyboardEvent) => {
    const { value } = e.target as HTMLInputElement;
    hour = parseInt(value);
  }

  const handleChangeDOB = (type: "day" | "month" | "year", e: KeyboardEvent) => {
    const { value } = e.target as HTMLInputElement;
    switch (type) {
      case "day":
        dob.setDate(parseInt(value));
        break;
      case "month":
        dob.setMonth(parseInt(value));
        break;
      case "year":
        dob.setFullYear(parseInt(value));
        break;
      default:
        break;
    }
  }

  const handleSave = () => {
    const message: IPCMessage = {
      type: "preferences-set",
      payload: {
        hour,
        dobDate: dob.getDate(),
        dobMonth: dob.getMonth(),
        dobYear: dob.getFullYear(),
      }
    };

    ipcRenderer.send("channel", message);
  }

  // Gather DOM elements
  const timeDisplay: HTMLSpanElement = document.querySelector(TIME_DISPLAY_ID);
  const dobDayInput: HTMLInputElement = document.querySelector(DOB_DAY_INPUT_ID);
  const dobMonthInput: HTMLInputElement = document.querySelector(DOB_MONTH_INPUT_ID);
  const dobYearInput: HTMLInputElement = document.querySelector(DOB_YEAR_INPUT_ID);
  const saveButton: HTMLButtonElement = document.querySelector(SAVE_BUTTON_ID);

  // Attach event listeners
  timeDisplay.addEventListener("keyup", handleChangeTime);
  dobDayInput.addEventListener("keyup", handleChangeDOB.bind(this, "date"));
  dobMonthInput.addEventListener("keyup", handleChangeDOB.bind(this, "month"));
  dobYearInput.addEventListener("keyup", handleChangeDOB.bind(this, "year"));
  saveButton.addEventListener("click", handleSave);

  // Populate initial values
  timeDisplay.innerText = String(`${hour}:00 AM`);
  dobDayInput.value = String(dob.getDate());
  dobMonthInput.value = String(dob.getMonth() + 1);
  dobYearInput.value = String(dob.getFullYear());
})();
