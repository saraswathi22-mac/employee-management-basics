export const getLocalDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
};

export const getYesterday = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  local.setDate(local.getDate() - 1);
  return local.toISOString().split("T")[0];
};

export const getWeekId = (dateStr) => {
  const date = new Date(dateStr);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor(
    (date - firstDayOfYear) / (24 * 60 * 60 * 1000)
  );
  const week = Math.ceil(
    (pastDays + firstDayOfYear.getDay() + 1) / 7
  );
  return `${date.getFullYear()}-W${week}`;
};
