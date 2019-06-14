import { Store } from './store';
import { errorListHandler, requestTimeOut, unexpectedError } from '../common';

export async function NetworkRequest(target, body = null, method = 'GET') {
  const token = Store.token.value;
  const localization = Store.localisation.value;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-token': token,
      'Accept-Language': `${localization.lang.toLowerCase()}-${localization.country.toUpperCase()}`,
      'Accept-Country': `${localization.country}`,
      'Accept-Currency': `${localization.currency}`
    },
    method,
    timeout: requestTimeOut
  };
  if (method === 'POST') {
    options.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(target, options);
    if (res.status === 200) {
      return res.json();
    }
    errorListHandler(res);
  } catch (error) {
    unexpectedError(error);
  }
}

export const API = 'https://rovx-server.herokuapp.com/api';
export const usingMock = false;

export function POST(url, body) {
  return NetworkRequest(`${API}/${url}`, body, 'POST');
}

export function GET(url, params = {}) {
  const qs = Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return NetworkRequest(`${API}/${url}?${qs}`);
}
