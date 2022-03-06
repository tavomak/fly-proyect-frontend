import { signOut } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function clientFetch(
  endpoint,
  { body, ...customConfig } = {},
  { withFile = false } = { withFile: false },
) {
  const headers = {};

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

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const responseError = response.text();
      const formatedError = { responseError, status: response.status };
      return Promise.reject(formatedError);
    })
    .catch((error) => Promise.reject(error));
}
