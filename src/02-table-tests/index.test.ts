import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 12, b: 6, action: Action.Divide, expected: 2 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected value when calling with a, b, and action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  const invalidCases = [
    { a: '1', b: 2, action: Action.Add, expected: null },
    { a: 2, b: '2', action: Action.Subtract, expected: null },
    { a: null, b: 3, action: Action.Divide, expected: null },
    { a: 3, b: undefined, action: Action.Multiply, expected: null },
    { a: 3, b: 4, action: 'invalid', expected: null },
  ];

  test.each(invalidCases)(
    'should return expected value like null for invalid input',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
