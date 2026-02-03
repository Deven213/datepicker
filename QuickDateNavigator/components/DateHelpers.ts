/**
 * Helper functions for date manipulation.
 */

/**
 * Ensures a valid Date object is returned. If date is null/undefined, returns today.
 */
export const ensureDate = (date?: Date | null): Date => {
  return date ? new Date(date) : new Date();
};

/**
 * Adds a specified number of days to a date.
 */
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 * Adds a specified number of months to a date.
 */
export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

/**
 * Adds a specified number of years to a date.
 */
export const addYears = (date: Date, years: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

/**
 * Returns the last day of the month for the given date.
 */
export const getEndOfMonth = (date: Date): Date => {
  // Day 0 of the next month is the last day of the current month
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Returns the date of the next Friday.
 */
export const getNextFriday = (date: Date): Date => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  // Friday is 5.
  // Calculate days to add to get to next Friday.
  // If today is Friday (5), we want next week's Friday (+7).
  let distance = (5 - day + 7) % 7;
  if (distance === 0) {
    distance = 7;
  }
  newDate.setDate(newDate.getDate() + distance);
  return newDate;
};
