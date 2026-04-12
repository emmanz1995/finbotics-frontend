/**
 * Helps extract the account number and sort code from a 14-digit scan code.
 * @param scan - The 14-digit scan code.
 * @returns {object} An object containing the account number and sort code.
 */
export const extractAccountNumber = (
  scan: string
): { accountNumber: string; sortCode: string } => {
  if (!/^\d{14}$/.test(scan)) return { accountNumber: '', sortCode: '' };

  const sortCodeRaw = scan?.slice(0, 6);
  const accountNumber = scan?.slice(6, 14);

  const sortCode = `${sortCodeRaw?.slice(0, 2)}-${sortCodeRaw?.slice(2, 4)}-${sortCodeRaw?.slice(4, 6)}`;

  return {
    accountNumber,
    sortCode,
  };
};
