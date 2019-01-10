export enum ProgressType {
  day,
  week,
  month,
  year,
  lifetime
};

export default [{
  id: ProgressType.day,
  label: "Day"
}, {
  id: ProgressType.week,
  label: "Week"
}, {
  id: ProgressType.month,
  label: "Month"
}, {
  id: ProgressType.year,
  label: "Year"
}, {
  id: ProgressType.lifetime,
  label: "Lifetime"
}];
