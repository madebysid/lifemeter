class DateService {
  formatTime (hours: number, minutes: number): string {
    const hoursStr: string = String(hours < 12 ? hours : hours - 12);
    const minutesStr: string = String(minutes).padStart(2, "0");
    return String(`${hoursStr}:${minutesStr} ${hours < 12 ? "AM" : "PM"}`);
  }

  formatDay (day: number): string {
    return String(day).padStart(2, "0");
  }

  formatMonth (month: number): string {
    return String(month).padStart(2, "0");
  }

  formatYear (year: number): string {
    return String(year).padStart(2, "0");
  }
}

export default new DateService();
