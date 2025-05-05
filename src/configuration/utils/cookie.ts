import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export const setCookie = (key: string, payload: string): void => {
  Cookies.set(key, payload, { expires: dayjs().add(7, 'day').toDate() });
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeCookie = (key: string): void => {
  Cookies.remove(key);
};
