export const getDayOfYear = (date) => {
  const now = new Date(date);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

const setZeroBefore10 = (n) => (n < 10 ? '0' : '') + n;

export const setHhMmSs = (time) => {
  const date = new Date(time);
  const hour = setZeroBefore10(date.getHours());
  const minute = setZeroBefore10(date.getMinutes());
  const second = setZeroBefore10(date.getSeconds());
  return `${hour}:${minute}:${second}`;
};

export const setDurationMins = (start, end) => {
  const diffMins = Math.abs((start - end) / (1000 * 60)).toFixed(2);
  const [mins, seconds] = diffMins.split('.');
  return `${mins}:${seconds}`;
};
