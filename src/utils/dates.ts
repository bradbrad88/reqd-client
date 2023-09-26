export function formatDayMonth(date: Date): string {
  const formattedDate = new Intl.DateTimeFormat("en-au", {
    day: "numeric",
    month: "numeric",
  }).format(date);
  return formattedDate;
}
