declare type IPCMessage = {
  type: string,
  payload: object
}

declare type ProgressType = "day" | "week" | "month" | "year" | "lifetime";