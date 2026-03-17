import { describe, it, expect } from 'vitest';
import { formatDate } from '@/src/utils/format-date';

describe('formatDate', () => {
  it('deve formatar data no formato dd/mm/aaaa', () => {
    const result = formatDate('2024-03-15T12:00:00');
    expect(result).toContain('/03/2024');
  });

  it('deve formatar data com horário', () => {
    const result = formatDate('2024-12-25T10:30:00');
    expect(result).toContain('/12/2024');
  });
});
