export const formatPhoneNumber = (
  nationalNumber: string,
  countryCallingCode: string
): string => {
  const digits = nationalNumber.replace(/\D/g, '');

  const part1 = digits.slice(0, 3); // 936
  const part2 = digits.slice(3, 6); // 544
  const part3 = digits.slice(6, 10); // 9043

  const formattedNumber = [part1, part2, part3].filter(Boolean).join(' ');

  return `(+${countryCallingCode}) ${formattedNumber}`;
};
