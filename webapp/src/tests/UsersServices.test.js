import axios from 'axios';
import Cookies from 'js-cookie';
import * as AuthService from '../services/authServices';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/UsersServices';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../services/AuthServices');

describe('UserService', () => {
  const token = 'valid-token';
  const newToken = 'new-token';
  const mockHeaders = { Authorization: token };
  const mockNewHeaders = { Authorization: newToken };
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockReturnValue(token);
    localStorage.getItem = jest.fn().mockReturnValue(null);
  });

  describe('getUsers', () => {
    it('should fetch users with token', async () => {
      const mockResponse = { data: [{ id: 1, name: 'Alice' }] };
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getUsers();

      expect(axios.get).toHaveBeenCalledWith(API_URL, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.get
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: [{ id: 2, name: 'Bob' }] });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await getUsers();

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenLastCalledWith(API_URL, { headers: mockNewHeaders });
      expect(result).toEqual([{ id: 2, name: 'Bob' }]);
    });

    it('should throw on non-401 error', async () => {
      const error = new Error('Server error');
      axios.get.mockRejectedValueOnce(error);

      await expect(getUsers()).rejects.toThrow('Server error');
      expect(AuthService.refreshToken).not.toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    const user = { name: 'John', email: 'john@example.com' };

    it('should create user with token', async () => {
      const mockResponse = { data: { id: 3, ...user } };
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await createUser(user);

      expect(axios.post).toHaveBeenCalledWith(API_URL, user, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.post
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id: 4, ...user } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await createUser(user);

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.post).toHaveBeenLastCalledWith(API_URL, user, { headers: mockNewHeaders });
      expect(result).toEqual({ id: 4, ...user });
    });
  });

  describe('updateUser', () => {
    const id = 5;
    const user = { name: 'Jane' };

    it('should update user with token', async () => {
      const mockResponse = { data: { id, ...user } };
      axios.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateUser(id, user);

      expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/${id}`, user, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.patch
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id, ...user } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await updateUser(id, user);

      expect(axios.patch).toHaveBeenLastCalledWith(`${API_URL}/${id}`, user, { headers: mockNewHeaders });
      expect(result).toEqual({ id, ...user });
    });
  });

  describe('deleteUser', () => {
    const id = 6;

    it('should delete user with token', async () => {
      const mockResponse = { data: {} };
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deleteUser(id);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${id}`, { headers: mockHeaders });
      expect(result).toEqual({});
    });

    it('should retry on 401 and succeed', async () => {
      axios.delete
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: {} });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await deleteUser(id);

      expect(axios.delete).toHaveBeenLastCalledWith(`${API_URL}/${id}`, { headers: mockNewHeaders });
      expect(result).toEqual({});
    });
  });
});