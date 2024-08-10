import cache from '../../lib/cache';

export const storeCode = (email: string, code: string) => {
  cache.set(email, code);
};

export const verifyCode = (email: string, code: string): boolean => {
  const cachedCode = cache.get(email);
  return cachedCode === code;
};
