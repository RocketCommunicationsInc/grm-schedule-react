export const getDayOfYear = (date) => {
  const now = new Date(date);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

export const setHhMmSs = (time) => {
  const date = new Date(time);
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${hour}:${minute}:${second}`;
};

export const setDurationMins = (start, end) => {
  const diffMins = Math.abs((start - end) / (1000 * 60));
  return `${diffMins}:00`;
};
