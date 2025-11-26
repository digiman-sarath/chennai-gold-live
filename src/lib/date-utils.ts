import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Get current date in IST timezone
 */
export const getCurrentISTDate = (): Date => {
  return toZonedTime(new Date(), IST_TIMEZONE);
};

/**
 * Format date in IST timezone
 */
export const formatISTDate = (date: Date | string, formatStr: string = 'MMMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const istDate = toZonedTime(dateObj, IST_TIMEZONE);
  return format(istDate, formatStr);
};

/**
 * Get IST date for SEO (short format)
 */
export const getISTDateForSEO = (): string => {
  return formatISTDate(getCurrentISTDate(), 'dd MMM yyyy');
};

/**
 * Get full IST datetime string
 */
export const getISTDateTime = (): string => {
  return formatISTDate(getCurrentISTDate(), 'dd MMM yyyy, hh:mm a');
};
