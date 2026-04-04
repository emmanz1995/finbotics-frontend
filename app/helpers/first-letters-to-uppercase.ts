export const toUppercaseFirstLetter = (s: string): string | null => {
  if (s.length === 0) return null;

  const sanitizeStr = s.replace(/\b(Mr|Mrs|Ms|Miss)\.?\s*/g, '');
  const arrStr = sanitizeStr.split(' ');

  for (let i = 0; i < arrStr.length; i++) {
    arrStr[i] = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1);
  }

  return arrStr.join(' ');
};
