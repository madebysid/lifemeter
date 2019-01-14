import DateService from "./services/DateService";
import { getPreferences, setPreferences, isDirty } from "./utils";

const TIME_DISPLAY_ID = "#time";
const DOB_DAY_INPUT_ID = "#dob__day";
const DOB_MONTH_INPUT_ID = "#dob__month";
const DOB_YEAR_INPUT_ID = "#dob__year";
const SAVE_BUTTON_ID = "#save";

(async () => {
  const preferences: Preferences = await getPreferences();
  let {
    active,
    dayResetHour,
    dayResetMinutes,
    dobDate,
    dobMonth,
    dobYear
  } = preferences;

  const updateDirty = () => {
    if (isDirty(preferences, {
      active,
      dayResetHour,
      dayResetMinutes,
      dobDate,
      dobMonth,
      dobYear
    })) {
      saveButton.classList.remove("disabled");
    } else {
      saveButton.classList.add("disabled");
    }
  }

  const handleChange = (
    type: "dayResetHour" | "dayResetMinutes" | "dobDate" | "dobMonth" | "dobYear",
    value: string
  ) => {
    switch (type) {
      case "dayResetHour":
        dayResetHour = parseInt(value);
        break;
      case "dayResetMinutes":
        dayResetMinutes = parseInt(value);
        break;
      case "dobDate":
        dobDate = parseInt(value);
        break;
      case "dobMonth":
        dobMonth = parseInt(value);
        break;
      case "dobYear":
        dobYear = parseInt(value);
        break;
      default:
        break;
    }

    updateDirty();
  };

  const handleSave = () => {
    setPreferences({
      active,
      dayResetHour,
      dayResetMinutes,
      dobDate,
      dobMonth,
      dobYear
    });
  }

  const getInputValue = (e: KeyboardEvent) => {
    const { value } = e.target as HTMLInputElement;
    return value;
  };

  // Gather DOM elements
  const timeDisplay: HTMLSpanElement = document.querySelector(TIME_DISPLAY_ID);
  const dobDateInput: HTMLInputElement = document.querySelector(DOB_DAY_INPUT_ID);
  const dobMonthInput: HTMLInputElement = document.querySelector(DOB_MONTH_INPUT_ID);
  const dobYearInput: HTMLInputElement = document.querySelector(DOB_YEAR_INPUT_ID);
  const saveButton: HTMLButtonElement = document.querySelector(SAVE_BUTTON_ID);

  // Attach event listeners
  dobDateInput.addEventListener("keyup", (e: KeyboardEvent) => {
    const value = getInputValue(e);
    (Number(value) <= 31) && handleChange("dobDate", value);
  });
  dobMonthInput.addEventListener("keyup", (e: KeyboardEvent) => {
    const value = getInputValue(e);
    Number(value) <= 12 && handleChange("dobMonth", value);
  });
  dobYearInput.addEventListener("keyup", (e: KeyboardEvent) => {
    const value = getInputValue(e);
    const now = new Date();
    Number(value) >= 1900 && Number(value) <= now.getFullYear() && handleChange("dobYear", value);
  });
  saveButton.addEventListener("click", handleSave);

  // Populate initial values
  timeDisplay.innerText = DateService.formatTime(dayResetHour, dayResetMinutes);
  dobDateInput.value = DateService.formatDay(dobDate);
  dobMonthInput.value = DateService.formatMonth(dobMonth);
  dobYearInput.value = DateService.formatYear(dobYear);

  updateDirty();
})();
