export const getAvatarByGender = (gender?: string) => {
  if (gender === "male") return "/userBlock/avatar.png";
  if (gender === "female") return "/userBlock/avatar.png";

  return "/userBlock/avatar.png";
};