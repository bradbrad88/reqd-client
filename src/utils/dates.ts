export function formatDayMonth(date: Date): string {
  const formattedDate = new Intl.DateTimeFormat("en-au", {
    day: "numeric",
    month: "numeric",
  }).format(date);
  return formattedDate;
}

export function getStartOfToday(): Date {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
}

export function getStartOfWeek(): Date {
  const week = new Date();
  week.setHours(0);
  week.setMinutes(0);
  week.setSeconds(0);
  week.setMilliseconds(0);
  week.setDate(week.getDate() - ((week.getDay() + 6) % 7));
  return week;
}
