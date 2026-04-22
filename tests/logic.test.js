import { describe, it, expect } from 'vitest';
import { calculateRequired, validateInputs } from '../docs/logic.js';

describe('Calculation Logic', () => {
  it('should calculate required final note correctly', () => {
    // Vize: 50, Baraj: 50, Geçme: 50, Etki: 60%
    // Vize katkısı: 50 * 0.4 = 20
    // Gereken final katkısı: 50 - 20 = 30
    // Gereken final notu: 30 / 0.6 = 50
    expect(calculateRequired(50, 50, 50, 60)).toBe(50);
  });

  it('should respect final baraj', () => {
    // Vize: 100, Baraj: 50, Geçme: 50, Etki: 60%
    // Vize katkısı: 100 * 0.4 = 40
    // Gereken final katkısı: 50 - 40 = 10
    // Gereken final notu: 10 / 0.6 = 16.66...
    // Ama baraj 50 olduğu için 50 dönmeli
    expect(calculateRequired(100, 50, 50, 60)).toBe(50);
  });

  it('should return rounded up value', () => {
    // Vize: 40, Baraj: 30, Geçme: 50, Etki: 60%
    // Vize katkısı: 40 * 0.4 = 16
    // Gereken final katkısı: 50 - 16 = 34
    // Gereken final notu: 34 / 0.6 = 56.66... -> 57
    expect(calculateRequired(40, 30, 50, 60)).toBe(57);
  });

  it('should return > 100 if impossible', () => {
    expect(calculateRequired(0, 50, 100, 60)).toBeGreaterThan(100);
  });
});

describe('Validation Logic', () => {
  it('should return true for valid inputs', () => {
    expect(validateInputs(50, 50, 50, 60)).toBe(true);
  });

  it('should return false for invalid inputs', () => {
    expect(validateInputs(101, 50, 50, 60)).toBe(false);
    expect(validateInputs(50, -1, 50, 60)).toBe(false);
    expect(validateInputs(50, 50, 101, 60)).toBe(false);
    expect(validateInputs(50, 50, 50, 0)).toBe(false);
    expect(validateInputs(NaN, 50, 50, 60)).toBe(false);
  });
});
