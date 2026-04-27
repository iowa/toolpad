import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { Dates } from '../Dates';

describe('Dates', () => {
  describe('dayjsFromQueryStringDate', () => {
    it('parses a valid ISO date string', () => {
      const result = Dates.dayjsFromQueryStringDate('2024-03-15');

      expect(result).not.toBeNull();
      expect(result!.year()).toBe(2024);
      expect(result!.month()).toBe(2); // 0-indexed
      expect(result!.date()).toBe(15);
    });

    it('returns null for null input', () => {
      expect(Dates.dayjsFromQueryStringDate(null)).toBeNull();
    });

    it('returns null for invalid date string', () => {
      expect(Dates.dayjsFromQueryStringDate('not-a-date')).toBeNull();
    });

    it('returns null for DD-MM-YYYY format (wrong format)', () => {
      expect(Dates.dayjsFromQueryStringDate('15-03-2024')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(Dates.dayjsFromQueryStringDate('')).toBeNull();
    });

    it('returns null for partial date', () => {
      expect(Dates.dayjsFromQueryStringDate('2024-03')).toBeNull();
    });
  });

  describe('toQueryStringDate', () => {
    it('formats a valid dayjs object to ISO string', () => {
      const date = dayjs('2024-03-15');
      const result = Dates.toQueryStringDate(date);

      expect(result).toBe('2024-03-15');
    });

    it('returns null for null input', () => {
      expect(Dates.toQueryStringDate(null)).toBeNull();
    });

    it('returns null for undefined input', () => {
      expect(Dates.toQueryStringDate(undefined)).toBeNull();
    });

    it('returns null for a string input', () => {
      expect(Dates.toQueryStringDate('2024-03-15')).toBeNull();
    });

    it('returns null for an invalid dayjs object', () => {
      const invalid = dayjs('invalid');
      expect(Dates.toQueryStringDate(invalid)).toBeNull();
    });
  });
});

