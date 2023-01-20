import data from 'data/contacts.json';

export const randomString = () => {
  return Math.random().toString(36).substring(2);
};

export const randomId = () => {
  return randomString() + randomString();
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomIndex = (arr) => {
  return randomInt(0, arr.length - 1);
};

export const randomContacts = (length) => {
  return Array.from({ length }, () => data[randomIndex(data)]);
};
