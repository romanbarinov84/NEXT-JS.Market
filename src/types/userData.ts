export type UserData = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  gender: string;
  birthdayDate?: string;
  city?: string;
  region?: string;
  role: string;
  card?: string
} | null;