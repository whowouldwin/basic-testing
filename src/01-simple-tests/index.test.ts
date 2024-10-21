import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: Action.Add });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 5, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 5, action: Action.Multiply });
    expect(result).toBe(25);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 5, action: Action.Divide });
    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 8,
      action: Action.Exponentiate,
    });
    expect(result).toBe(256);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 10,
      b: 2,
      action: '%',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: 1, b: 'string', action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({
      a: null,
      b: 'string',
      action: Action.Multiply,
    });
    expect(result).toBeNull();

    result = simpleCalculator({
      a: undefined,
      b: 2,
      action: Action.Subtract,
    });
    expect(result).toBeNull();
  });
});
