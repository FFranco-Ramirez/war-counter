/**
 * Unit tests for counter utility functions
 */

import { describe, it, expect } from 'vitest';
import { formatCounterTime, calculateCounterData } from '../../src/utils/counter-utils';

describe('Counter Utils - Basic Tests', () => {
  const WAR_START_DATE = new Date('2022-02-24T00:00:00');

  describe('formatCounterTime', () => {
    it('should format zero elapsed time correctly', () => {
      const formatted = formatCounterTime(WAR_START_DATE, WAR_START_DATE);
      expect(formatted).toBe('00 MONTHS / 00 DAYS / 00:00:00');
    });

    it('should format one day elapsed correctly', () => {
      const oneDayLater = new Date(WAR_START_DATE.getTime() + 24 * 60 * 60 * 1000);
      const formatted = formatCounterTime(WAR_START_DATE, oneDayLater);
      expect(formatted).toBe('00 MONTHS / 01 DAYS / 00:00:00');
    });

    it('should format one hour elapsed correctly', () => {
      const oneHourLater = new Date(WAR_START_DATE.getTime() + 60 * 60 * 1000);
      const formatted = formatCounterTime(WAR_START_DATE, oneHourLater);
      expect(formatted).toBe('00 MONTHS / 00 DAYS / 01:00:00');
    });

    it('should pad single digits with zeros', () => {
      const fiveMinutesLater = new Date(WAR_START_DATE.getTime() + 5 * 60 * 1000);
      const formatted = formatCounterTime(WAR_START_DATE, fiveMinutesLater);
      expect(formatted).toBe('00 MONTHS / 00 DAYS / 00:05:00');
    });
  });

  describe('calculateCounterData', () => {
    it('should calculate zero elapsed time correctly', () => {
      const data = calculateCounterData(WAR_START_DATE, WAR_START_DATE);
      expect(data.months).toBe(0);
      expect(data.days).toBe(0);
      expect(data.hours).toBe(0);
      expect(data.minutes).toBe(0);
      expect(data.seconds).toBe(0);
      expect(data.totalDays).toBe(0);
    });

    it('should calculate one day elapsed correctly', () => {
      const oneDayLater = new Date(WAR_START_DATE.getTime() + 24 * 60 * 60 * 1000);
      const data = calculateCounterData(WAR_START_DATE, oneDayLater);
      expect(data.totalDays).toBe(1);
      expect(data.days).toBe(1);
      expect(data.hours).toBe(0);
    });

    it('should have all time components within valid ranges', () => {
      const someDate = new Date('2023-06-15T14:30:45');
      const data = calculateCounterData(WAR_START_DATE, someDate);
      
      expect(data.months).toBeGreaterThanOrEqual(0);
      expect(data.days).toBeGreaterThanOrEqual(0);
      expect(data.days).toBeLessThan(30);
      expect(data.hours).toBeGreaterThanOrEqual(0);
      expect(data.hours).toBeLessThan(24);
      expect(data.minutes).toBeGreaterThanOrEqual(0);
      expect(data.minutes).toBeLessThan(60);
      expect(data.seconds).toBeGreaterThanOrEqual(0);
      expect(data.seconds).toBeLessThan(60);
    });
  });
});
