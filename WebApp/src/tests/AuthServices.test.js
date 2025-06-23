import axios from 'axios';
import Cookies from 'js-cookie';
<<<<<<< HEAD
import { login, refreshToken } from '../services/authServices';
=======
import { login, refreshToken } from '../services/AuthServices';
>>>>>>> 399dbca (feat : Mise en place des tests unitaires sur la web app #42)

jest.mock('axios');
jest.mock('js-cookie');

describe('login', () => {
  it('should return data on successful login', async () => {
    const mockResponse = { data: { token: 'abc123' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await login('test@example.com', 'password123');

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false
      }
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw custom error on login failure', async () => {
    const errorMessage = { message: 'Invalid credentials' };
    axios.post.mockRejectedValueOnce({ response: { data: errorMessage } });

    await expect(login('bad@example.com', 'wrong')).rejects.toEqual(errorMessage);
  });
});

describe('refreshToken', () => {
  it('should refresh token and store it in a cookie', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'newToken123' } });

    const token = await refreshToken();

    expect(axios.post).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_REFRESH_URL,
      {},
      { withCredentials: true }
    );
    expect(Cookies.set).toHaveBeenCalledWith('token', 'newToken123');
    expect(token).toBe('newToken123');
  });

  it('should redirect to login page on refresh failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('401 Unauthorized'));

    await expect(refreshToken()).rejects.toThrow('Session expirée');
  });
});