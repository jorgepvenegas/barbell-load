import { describe, it, expect } from 'vitest';
import { calculatePlates, availablePlates, type PlateWeight } from '../calculators';

describe('calculatePlates', () => {
  it('calculates correct plates for 135 lb with 45 lb bar', () => {
    const result = calculatePlates({
      targetWeight: 135,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toEqual([{ count: 1, weight: 45 }]);
  });

  it('calculates correct plates for 225 lb with 45 lb bar', () => {
    const result = calculatePlates({
      targetWeight: 225,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toEqual([
      { count: 1, weight: 65 },
      { count: 1, weight: 25 },
    ]);
  });

  it('calculates correct plates for 315 lb with 45 lb bar', () => {
    const result = calculatePlates({
      targetWeight: 315,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toEqual([
      { count: 2, weight: 65 },
      { count: 1, weight: 5 },
    ]);
  });

  it('returns empty array when target equals barbell weight', () => {
    const result = calculatePlates({
      targetWeight: 45,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toEqual([]);
  });

  it('returns empty array when target is less than barbell weight', () => {
    const result = calculatePlates({
      targetWeight: 30,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toEqual([]);
  });

  it('uses multiple plate types for complex weights', () => {
    const result = calculatePlates({
      targetWeight: 185,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toContainEqual({ count: 1, weight: 65 });
    expect(result).toContainEqual({ count: 1, weight: 5 });
    expect(result.length).toBe(2);
  });

  it('handles 33 lb barbell', () => {
    const result = calculatePlates({
      targetWeight: 100,
      barWeight: 33,
      selectedPlates: availablePlates,
    });

    expect(result).toContainEqual({ count: 1, weight: 25 });
    expect(result).toContainEqual({ count: 1, weight: 5 });
    expect(result).toContainEqual({ count: 1, weight: 2.5 });
  });

  it('respects disabled plates', () => {
    const onlySmallPlates = availablePlates.map((plate) => ({
      ...plate,
      enabled: plate.weight <= 10,
    }));

    const result = calculatePlates({
      targetWeight: 100,
      barWeight: 45,
      selectedPlates: onlySmallPlates,
    });

    const hasLargePlate = result.some((p) => p.weight > 10);
    expect(hasLargePlate).toBe(false);
  });

  it('uses greedy algorithm - largest plates first', () => {
    const result = calculatePlates({
      targetWeight: 315,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result[0].weight).toBe(65);
    expect(result[0].count).toBe(2);
  });

  it('handles fractional plates', () => {
    const result = calculatePlates({
      targetWeight: 50,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toContainEqual({ count: 1, weight: 2.5 });
  });

  it('handles minimum weight increment (0.25 lb)', () => {
    const result = calculatePlates({
      targetWeight: 45.5,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    expect(result).toContainEqual({ count: 1, weight: 0.25 });
  });

  it('handles no available plates', () => {
    const noPlates = availablePlates.map((plate) => ({
      ...plate,
      enabled: false,
    }));

    const result = calculatePlates({
      targetWeight: 100,
      barWeight: 45,
      selectedPlates: noPlates,
    });

    expect(result).toEqual([]);
  });

  it('handles only one plate type available', () => {
    const only45s = availablePlates.map((plate) => ({
      ...plate,
      enabled: plate.weight === 45,
    }));

    const result = calculatePlates({
      targetWeight: 225,
      barWeight: 45,
      selectedPlates: only45s,
    });

    expect(result).toEqual([{ count: 2, weight: 45 }]);
  });

  it('handles max weight scenario', () => {
    const result = calculatePlates({
      targetWeight: 1500,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    const totalPlateWeight = result.reduce(
      (sum, plate) => sum + plate.weight * plate.count * 2,
      0
    );
    const calculatedTotal = totalPlateWeight + 45;

    expect(calculatedTotal).toBeLessThanOrEqual(1500);
  });

  it('returns plates sorted by weight descending', () => {
    const result = calculatePlates({
      targetWeight: 200,
      barWeight: 45,
      selectedPlates: availablePlates,
    });

    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].weight).toBeGreaterThanOrEqual(result[i + 1].weight);
    }
  });
});
