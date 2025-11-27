// Counter utility functions for calculating time elapsed since war start

export interface CounterData {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  startDate: Date;
}

/**
 * Format counter time as "XX MONTHS / XX DAYS / HH:MM:SS"
 * @param startDate - The start date of the conflict
 * @param currentDate - The current date/time
 * @returns Formatted string
 */
export function formatCounterTime(startDate: Date, currentDate: Date): string {
  const data = calculateCounterData(startDate, currentDate);
  
  const monthsStr = data.months.toString().padStart(2, '0');
  const daysStr = data.days.toString().padStart(2, '0');
  const hoursStr = data.hours.toString().padStart(2, '0');
  const minutesStr = data.minutes.toString().padStart(2, '0');
  const secondsStr = data.seconds.toString().padStart(2, '0');
  
  return `${monthsStr} MONTHS / ${daysStr} DAYS / ${hoursStr}:${minutesStr}:${secondsStr}`;
}

/**
 * Calculate counter data from start date to current date
 * @param startDate - The start date of the conflict
 * @param currentDate - The current date/time
 * @returns CounterData object with all time components
 */
export function calculateCounterData(startDate: Date, currentDate: Date): CounterData {
  const diff = currentDate.getTime() - startDate.getTime();
  
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    startDate
  };
}
