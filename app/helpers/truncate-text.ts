/**
 * Helps slice text if it is too long.
 * @param text - The text that needs to be sliced.
 * @param n - The number of characters to slice from text.
 * @returns {object} A new string that has been sliced.
 */
export const truncateText = (text: string | any, n: number): string => {
  if (text.length === 0) return '';

  return text.length > n ? text.substring(0, n - 1) + '...' : text;
};
