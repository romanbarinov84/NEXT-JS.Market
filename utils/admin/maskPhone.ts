export const maskedValue = (value: string) => {
  if (!value) return "";

  const cleanPhone = value.replace(/\D/g, "");

  let formatted = "+3";

  if (cleanPhone.length > 1) {
    formatted += ` (${cleanPhone.slice(1, 5)}`;
  }

  if (cleanPhone.length > 4) {
    formatted += `) ${cleanPhone.slice(5, 8)}`;
  }

  if (cleanPhone.length > 7) {
    formatted += `-${cleanPhone.slice(8, 10)}`;
  }

  if (cleanPhone.length > 9) {
    formatted += `-${cleanPhone.slice(10, 12)}`;
  }

  return formatted;
};