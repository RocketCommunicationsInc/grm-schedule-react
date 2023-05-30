import data from 'data/contacts.json';

export const randomString = () => {
  return Math.random().toString(36).substring(2);
};

export const randomId = () => {
  return randomString() + randomString();
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomIndex = (arr: string | any[]) => {
  return randomInt(0, arr.length - 1);
};

export const randomContacts = (length: number) => {
  return Array.from({ length }, () => data[randomIndex(data)]);
};
