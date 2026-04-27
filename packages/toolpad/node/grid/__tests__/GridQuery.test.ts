import { describe, it, expect, vi } from 'vitest';
import { GridQuery } from '../GridQuery';
import { GridPagination } from '../../../utils';

type TestSearch = GridPagination & { name?: string };
type TestRow = { id: number; name: string };

describe('GridQuery', () => {
  describe('search', () => {
    it('returns rows and rowCount from queries', async () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10 });

      const result = await query.search(
        async () => [{ id: 1, name: 'test' }],
        async () => 5
      );

      expect(result.rows).toEqual([{ id: 1, name: 'test' }]);
      expect(result.rowCount).toBe(5);
    });

    it('returns -1 as rowCount when no countsQuery provided', async () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10 });

      const result = await query.search(
        async () => [{ id: 1, name: 'test' }]
      );

      expect(result.rows).toEqual([{ id: 1, name: 'test' }]);
      expect(result.rowCount).toBe(-1);
    });

    it('returns empty rows array', async () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10 });

      const result = await query.search(async () => []);

      expect(result.rows).toEqual([]);
      expect(result.rowCount).toBe(-1);
    });
  });

  describe('paging', () => {
    it('returns default pagination offset and limit', () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10 });

      const paging = query.paging();

      expect(paging).toEqual({ offset: 0, limit: 100 });
    });
  });

  describe('whereAnd', () => {
    it('returns undefined when no conditions are provided', () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10 });

      const result = query.whereAnd({});

      expect(result).toBeUndefined();
    });

    it('returns undefined when all conditions are undefined', () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10, name: 'test' });

      const result = query.whereAnd({ name: undefined });

      expect(result).toBeUndefined();
    });

    it('returns SQL when conditions are provided', () => {
      const query = new GridQuery<TestSearch, TestRow>({ page: 0, pageSize: 10, name: 'test' });

      // Create a mock SQLWrapper
      const mockCondition = { getSQL: () => ({}) } as any;
      const result = query.whereAnd({ name: mockCondition });

      expect(result).toBeDefined();
    });
  });
});

