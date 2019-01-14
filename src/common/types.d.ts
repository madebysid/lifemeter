declare type IPCMessage = {
  type: string
  payload?: any
}

declare type ProgressType = "day" | "week" | "month" | "year" | "lifetime";

declare type Preferences = {
  active: ProgressType
  dayResetHour: number
  dayResetMinutes: number
  dobDate: number
  dobMonth: number
  dobYear: number
};
