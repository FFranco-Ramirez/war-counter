/**
 * Property-Based Test for Counter Format
 * Feature: futuristic-ui-redesign, Property 1: Formato consistente del contador
 * Validates: Requirements 3.4
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { formatCounterTime, calculateCounterData } from '../../src/utils/counter-utils';

describe('Counter Format Property Tests', () => {
  const WAR_START_DATE = new Date('2022-02-24T00:00:00');

  it('should format any valid timestamp correctly', () => {
    // Feature: futuristic-ui-redesign, Property 1: Formato consistente del contador
    fc.assert(
      fc.property(
        fc.date({ min: WAR_START_DATE, max: new Date('2122-12-31') }).filter(d => !isNaN(d.getTime())),
        (timestamp) => {
          const formatted = formatCounterTime(WAR_START_DATE, timestamp);
          
          // Verify format matches pattern "XX MONTHS / XX DAYS / HH:MM:SS"
          // Note: months can be 2+ digits for long durations
          const formatRegex = /^(\d{2,}) MONTHS \/ (\d{2}) DAYS \/ (\d{2}):(\d{2}):(\d{2})$/;
          expect(formatted).toMatch(formatRegex);
          
          // Extract and verify values
          const match = formatted.match(formatRegex);
          if (!match) {
            throw new Error(`Format did not match expected pattern: ${formatted}`);
          }

          const [, monthsStr, daysStr, hoursStr, minutesStr, secondsStr] = match;
          const months = parseInt(monthsStr, 10);
          const days = parseInt(daysStr, 10);
          const hours = parseInt(hoursStr, 10);
          const minutes = parseInt(minutesStr, 10);
          const seconds = parseInt(secondsStr, 10);
          
          // Verify all values are within valid ranges
          expect(months).toBeGreaterThanOrEqual(0);
          expect(days).toBeGreaterThanOrEqual(0);
          expect(days).toBeLessThan(30);
          expect(hours).toBeGreaterThanOrEqual(0);
          expect(hours).toBeLessThan(24);
          expect(minutes).toBeGreaterThanOrEqual(0);
          expect(minutes).toBeLessThan(60);
          expect(seconds).toBeGreaterThanOrEqual(0);
          expect(seconds).toBeLessThan(60);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have consistent padding for time components', () => {
    fc.assert(
      fc.property(
        fc.date({ min: WAR_START_DATE, max: new Date('2122-12-31') }).filter(d => !isNaN(d.getTime())),
        (timestamp) => {
          const formatted = formatCounterTime(WAR_START_DATE, timestamp);
          const parts = formatted.split(/[\s\/:]/).filter(p => p && p !== 'MONTHS' && p !== 'DAYS');
          
          // Months can be 2+ digits, but days/hours/minutes/seconds should be exactly 2
          expect(parts.length).toBe(5); // months, days, hours, minutes, seconds
          
          // Months: at least 2 digits
          expect(/^\d{2,}$/.test(parts[0])).toBe(true);
          
          // Days, hours, minutes, seconds: exactly 2 digits
          for (let i = 1; i < parts.length; i++) {
            expect(parts[i]).toHaveLength(2);
            expect(/^\d{2}$/.test(parts[i])).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should calculate correct time components', () => {
    fc.assert(
      fc.property(
        fc.date({ min: WAR_START_DATE, max: new Date('2122-12-31') }).filter(d => !isNaN(d.getTime())),
        (timestamp) => {
          const data = calculateCounterData(WAR_START_DATE, timestamp);
          
          // Verify all components are non-negative
          expect(data.months).toBeGreaterThanOrEqual(0);
          expect(data.days).toBeGreaterThanOrEqual(0);
          expect(data.hours).toBeGreaterThanOrEqual(0);
          expect(data.minutes).toBeGreaterThanOrEqual(0);
          expect(data.seconds).toBeGreaterThanOrEqual(0);
          expect(data.totalDays).toBeGreaterThanOrEqual(0);
          
          // Verify time components are within valid ranges
          expect(data.days).toBeLessThan(30);
          expect(data.hours).toBeLessThan(24);
          expect(data.minutes).toBeLessThan(60);
          expect(data.seconds).toBeLessThan(60);
          
          // Verify totalDays is consistent with months and days
          const approximateTotalDays = data.months * 30 + data.days;
          expect(Math.abs(data.totalDays - approximateTotalDays)).toBeLessThanOrEqual(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle edge case: same date (zero elapsed time)', () => {
    const formatted = formatCounterTime(WAR_START_DATE, WAR_START_DATE);
    expect(formatted).toBe('00 MONTHS / 00 DAYS / 00:00:00');
  });

  it('should handle edge case: exactly one day later', () => {
    const oneDayLater = new Date(WAR_START_DATE.getTime() + 24 * 60 * 60 * 1000);
    const formatted = formatCounterTime(WAR_START_DATE, oneDayLater);
    expect(formatted).toMatch(/^00 MONTHS \/ 01 DAYS \/ 00:00:00$/);
  });

  it('should handle edge case: exactly one month later (30 days)', () => {
    const oneMonthLater = new Date(WAR_START_DATE.getTime() + 30 * 24 * 60 * 60 * 1000);
    const formatted = formatCounterTime(WAR_START_DATE, oneMonthLater);
    expect(formatted).toMatch(/^01 MONTHS \/ 00 DAYS \/ 00:00:00$/);
  });
});
