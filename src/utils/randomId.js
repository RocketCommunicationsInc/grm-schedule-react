const randomString = () => Math.random().toString(36).substring(2);

export const randomId = () => {
  return randomString() + randomString();
};
