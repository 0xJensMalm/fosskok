import { dateFormatOptions } from '@/src/config';

/**
 * Format a date string into a localized format
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: 'nb-NO')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'nb-NO'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, dateFormatOptions);
}

/**
 * Format a date string into a time string
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: 'nb-NO')
 * @returns Formatted time string (HH:MM)
 */
export function formatTime(dateString: string, locale: string = 'nb-NO'): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

/**
 * Get day of month from a date string
 * @param dateString ISO date string
 * @returns Day of month as string
 */
export function getDay(dateString: string): string {
  const date = new Date(dateString);
  return date.getDate().toString();
}

/**
 * Get month name from a date string
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: 'nb-NO')
 * @returns Month name
 */
export function getMonth(dateString: string, locale: string = 'nb-NO'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { month: 'short' });
}

/**
 * Check if a date is in the future
 * @param dateString ISO date string
 * @returns Boolean indicating if date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Sort dates in ascending order
 * @param a First date string
 * @param b Second date string
 * @returns Comparison result (-1, 0, 1)
 */
export function sortDatesAscending(a: string, b: string): number {
  return new Date(a).getTime() - new Date(b).getTime();
}

/**
 * Sort dates in descending order
 * @param a First date string
 * @param b Second date string
 * @returns Comparison result (-1, 0, 1)
 */
export function sortDatesDescending(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
}
