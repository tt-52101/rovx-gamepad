import OAuthManager from 'react-native-oauth';
import { Store, cacheCredentials } from './store';
import { usingMock } from './requests';

const config = {
  facebook: {
    client_id: '379551296125769',
    client_secret: '88edcc63f705b47785ac800042684ea9'
  }
};

export const manager = new OAuthManager('firestackexample');
manager.configure(config);

export async function login() {
  const result = await manager.authorize('facebook', {
    scopes: 'email,public_profile'
  });
  const { accessToken, clientID } = result.response.credentials;
  const resp = await manager.makeRequest(
    'facebook',
    '/me?fields=first_name,last_name,email'
  );
  return { data: resp.data, accessToken, clientID };
}

export async function login_google() {
  if (usingMock) {
    const api = {
      user: {
        picture: 'https://source.unsplash.com/1024x768/?boats',
        email: 'x@x.com',
        firstname: 'Fname',
        lastname: 'Lname'
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieEB4LmNvbSIsImlkIjoyMn0sImtleSI6Im5vcm1hbC11c2VyIiwiaWF0IjoxNTUxMzY0ODM3fQ.Ma4KG8BcLvrQqCMQ_R_NYdbKZTejTWr7kV7D3jVE-y0'
    };
    Store.user.next(api.user);
    Store.token.next(api.token);
    cacheCredentials(api);
  }
}
