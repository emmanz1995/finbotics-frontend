import { toUppercaseFirstLetter } from './first-letters-to-uppercase';

describe('Convert first letter of each word into upper case helper', () => {
  it('should return a new string with each first letter of the first word capitalized', () => {
    expect(toUppercaseFirstLetter('mr emmanuel okuchukwu')).toEqual(
      'Mr Emmanuel Okuchukwu'
    );
  });

  it('should return null', () => {
    expect(toUppercaseFirstLetter('')).toEqual(null);
  });
});
