import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8083';

const onLogin = async (email: string, password: string) => {
  try {
    const { data } = await axios({
      url: API_URL + '/api/v1/auth',
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    if (data.userInfo.token) {
      localStorage.setItem(
        'access_token',
        JSON.stringify({ access_token: data.userInfo.token })
      );
    }

    return data;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

const extractCurrentUser = (accessToken: string) => {
  try {
    const { userId, username } = jwtDecode(accessToken) as {
      userId: string;
      username: string;
    };

    return { userId, username };
  } catch (err: any) {
    console.log('Unable to extract userId from access token', err);
    throw new Error('Unable to extract userId from access token');
  }
};

const onLogout = () => localStorage.removeItem('access_token');

export const authService = {
  onLogin,
  onLogout,
  extractCurrentUser,
};
