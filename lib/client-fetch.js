import { apiUrl, APIConstans } from '../config';

const urlLogin = process.env.REACT_APP_AUTH_URL;
const ACCESS_TOKEN_KEY = '__access-token__';
const REFRESH_TOKEN_KEY = '__refresh-token__';

export const setAccessToken = (accessToken) => (
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
);

export const setRefreshToken = (refreshToken) => (
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
);

const getAccessToken = () => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken ? `Bearer ${accessToken}` : '';
};

const getRefreshToken = () => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
  return refreshToken || '';
};

export const cleanTokens = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default async function clientFetch(
  endpoint,
  { body, ...customConfig } = {},
  {
    withAuth = true,
    _retry = false,
    withFile = false,
  } = { withAuth: true, _retry: false, withFile: false },
) {
  const headers = {};
  const apiKeys = JSON.parse(window.localStorage.getItem('bxBusinessActiveFulfillment'));
  if (withAuth) {
    const accessToken = getAccessToken();
    headers.Authorization = accessToken.replaceAll('"', '');
  }

  if (apiKeys) {
    headers.key = apiKeys.credential.key;
    headers.account_id = apiKeys.credential.accountId;
  }

  if (body && !withFile) {
    headers['content-type'] = 'application/json';
  }

  const config = {
    method: customConfig.method ? customConfig.method : 'POST',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body && withFile) {
    config.body = body;
  } else if (body) {
    config.body = JSON.stringify(body);
  }

  return window.fetch(`${apiUrl}/${APIConstans.fulfillment}/${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      const errorMessage = await response.text();
      const grantError = { errorMessage, status: response.status };
      return Promise.reject(grantError);
    })
    .catch(async (error) => {
      const theError = error;
      const expectedError = theError && theError.status === 401;

      if (!expectedError) {
        const errorMessage = error.message;
        return Promise.reject(new Error(errorMessage));
      }

      if (theError.status === 401 && !_retry) {
        _retry = true;
        const refreshToken = getRefreshToken();

        const newHeaders = new Headers();
        newHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', 'refresh_token');
        urlencoded.append('client_id', 'public-cli');
        urlencoded.append('refresh_token', refreshToken.replaceAll('"', ''));

        const requestOptions = {
          method: 'POST',
          headers: newHeaders,
          body: urlencoded,
          redirect: 'follow',
        };
        const _refreshTokenResponse = await window.fetch(urlLogin, requestOptions, {
          withAuth: false,
        });

        if (_refreshTokenResponse.status === 400) {
          cleanTokens();
          window.localStorage.removeItem('bxBusinessActiveSession');
          window.location.assign('/');
          window.location.reload();
          return Promise.reject(error);
        }

        if (_refreshTokenResponse.ok) {
          const finalydata = await _refreshTokenResponse.json();
          setAccessToken(finalydata.access_token);
          setRefreshToken(finalydata.refresh_token);
          return clientFetch(
            endpoint,
            { body, ...customConfig },
            { withAuth, _retry },
          );
        }
      }
      return Promise.reject(error);
    });
}
