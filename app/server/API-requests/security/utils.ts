import { isServer } from '@app/utils/common.utils';
import { getActualSaltRequest } from './salt';

export const setSecureCookie = async () => {
  if (isServer()) throw new Error('Unavailable on server-side');

  const response = await getActualSaltRequest();
  const { salt } = response.data;
  const encoder = new TextEncoder();

  const hash = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(`${salt}_${navigator.userAgent}`)
  );

  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  document.cookie = `sh=${hashHex}; path=/; max-age=10`;
};
