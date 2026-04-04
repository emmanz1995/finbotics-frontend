import { extractAccountNumber } from './extractAccountNumbers';

describe('Extract sort code and account number', () => {
  it.each([
    ['14375869048495', { sortCode: '14-37-58', accountNumber: '69048495' }],
    ['32134254534', { accountNumber: '', sortCode: '' }],
    ['54378653745378534', { accountNumber: '', sortCode: '' }],
  ])(
    'should return either an object containing BOTH the account number and sort code or an object containing an empty account number and sort code',
    (scan, expectedResult) => {
      expect(extractAccountNumber(scan)).toEqual(expectedResult);
    }
  );
});
