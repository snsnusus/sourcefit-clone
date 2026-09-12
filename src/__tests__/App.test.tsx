import { describe, expect, it } from 'vitest';
import { generateMockEmployeeId } from '~/utils';

describe('generateMockEmployeeId', () => {
  it('starts with the given department code followed by a hyphen', () => {
    const id = generateMockEmployeeId('E');

    expect(id.startsWith('E-')).toBe(true);
  });

  it('matches the CODE-YY-NNN shape', () => {
    const id = generateMockEmployeeId('A');

    expect(id).toMatch(/^A-\d{2}-\d{3}$/);
  });

  it('produces a 2-digit year matching the current year', () => {
    const expectedYear = new Date().getFullYear().toString().slice(-2);

    const id = generateMockEmployeeId('X');

    expect(id).toContain(`-${expectedYear}-`);
  });
});
