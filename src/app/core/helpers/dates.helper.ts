export function addDays(date: Date, days: number = 1) {
  let incomming = new Date(date);
  incomming.setDate(incomming?.getDate() + days);
  const newDate = incomming.toISOString().split('T')[0].split('-');
  const y = newDate[0];
  const m = newDate[1];
  const d = newDate[2];

  return `${y}-${m}-${d}T00:00:00.000Z`;
}

export function addHours(date: Date, hours: number = 2) {
  const currentDate = new Date(date);
  const currentHours = currentDate.getHours();
  const newHours = currentHours - hours; // Add 5 hours

  currentDate.setHours(newHours);
  return Date.parse(currentDate.toISOString());
}

export function compareStartEndDates(
  startDate: Date | string,
  endDate: Date | string,
  isDateOnly: boolean
) {
  let stDate = startDate;
  let edDate = endDate;
  if (isDateOnly) {
    stDate = convertDate(new Date(stDate));
    edDate = convertDate(new Date(edDate));
  }
  let date1 = new Date(stDate).getTime();
  let date2 = new Date(edDate).getTime();
  return endDate && date2 < date1;
}

function convertDate(date) {
  if (!date) return null;
  return date.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function getDateZeroUTC(selectedDate = null) {
  let date = selectedDate ? new Date(selectedDate) : new Date();
  const timeZoneDifference = (date.getTimezoneOffset() / 60) * -1; //convert to positive value.
  date.setTime(
    date.getTime() - timeZoneDifference * 60 * 60 * 1000 - 0 * 60 * 60 * 1000
  );
  return date
}

export function getFirstDayInMonth(date: Date | string) {
  const dateZone = (date as string)?.split(':')[0];
  const newDateZone = dateZone.split('T');
  const newDate = newDateZone[0].split('-');
  const y = newDate[0];
  const m = newDate[1];
  return `${y}-${m}-01T${newDateZone[1]}:00:00.000Z`
}

export function resetSeconds(date: Date | string) {
  const dateZone = (date as string)?.split(':');
  const newDateZone = dateZone[0].split('T');
  const h = newDateZone[1];
  const m = dateZone[1];
  return `${newDateZone[0]}T${h}:${m}:00.000Z`
}


export function isValidDate(date: any): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function getDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Calculate the difference in milliseconds
  const diff = end.getTime() - start.getTime();
  // Convert milliseconds to days and include the same day
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  // Ensure the result is never negative
  return Math.max(days, 0);
}