import dayjs from "dayjs";

export const lastValidDate = () => {
  const today = dayjs();
  const dayOfWeek = today.day();

  if (dayOfWeek >= 2 && dayOfWeek <= 6) {
    // If today is Tuesday to Saturday, return yesterday
    return today.subtract(1, "day");
  } else {
    // If today is Sunday or Monday, get last Friday
    const daysToFriday = dayOfWeek === 0 ? 2 : 3; // 0 is Sunday, 1 is Monday
    return today.subtract(daysToFriday, "day");
  }
};