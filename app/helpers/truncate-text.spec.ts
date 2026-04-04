import { truncateText } from './truncate-text';

describe('truncateText', () => {
  it.each([
    ['Jason Duval', 6, 'Jason...'],
    ['Lucia Caminos', 15, 'Lucia Caminos'],
    ['', 3, ''],
  ])(
    'should return either a truncated string, the full string or an empty string',
    (text, n, expectedResult) => {
      expect(truncateText(text, n)).toEqual(expectedResult);
    }
  );
});
