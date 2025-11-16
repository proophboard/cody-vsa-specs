import { describe, expect, it } from 'vitest';
import { now } from './date.js';

describe('now', () => {
  it('should return a valid ISO 8601 date string', () => {
    const result = now();

    // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(result).toMatch(isoRegex);
  });

  it('should return a parseable date', () => {
    const result = now();
    const date = new Date(result);

    expect(date).toBeInstanceOf(Date);
    expect(date.toString()).not.toBe('Invalid Date');
  });

  it('should return current time approximately', () => {
    const before = Date.now();
    const result = now();
    const after = Date.now();

    const resultTime = new Date(result).getTime();

    expect(resultTime).toBeGreaterThanOrEqual(before);
    expect(resultTime).toBeLessThanOrEqual(after);
  });
});
