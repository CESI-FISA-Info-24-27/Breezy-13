import axios from 'axios';
import Cookies from 'js-cookie';
import * as AuthService from '../services/AuthServices';

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../services/RolesServices';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../services/AuthServices');

describe('RolesService', () => {
  const token = 'valid-token';
  const newToken = 'new-token';
  const mockHeaders = { Authorization: token };
  const mockNewHeaders = { Authorization: newToken };
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/roles`;

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockReturnValue(token);
    localStorage.getItem = jest.fn().mockReturnValue(null);
  });

  describe('getRoles', () => {
    it('should fetch roles with token', async () => {
      const mockResponse = { data: ['admin', 'user'] };
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRoles();

      expect(axios.get).toHaveBeenCalledWith(API_URL, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.get
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: ['editor'] });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await getRoles();

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenLastCalledWith(API_URL, { headers: mockNewHeaders });
      expect(result).toEqual(['editor']);
    });

    it('should throw on non-401 error', async () => {
      const error = new Error('Something failed');
      axios.get.mockRejectedValueOnce(error);

      await expect(getRoles()).rejects.toThrow('Something failed');
      expect(AuthService.refreshToken).not.toHaveBeenCalled();
    });
  });

  describe('createRole', () => {
    const role = { name: 'moderator' };

    it('should create role with token', async () => {
      const mockResponse = { data: { id: 1, ...role } };
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await createRole(role);

      expect(axios.post).toHaveBeenCalledWith(API_URL, role, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.post
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id: 2, ...role } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await createRole(role);

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.post).toHaveBeenLastCalledWith(API_URL, role, { headers: mockNewHeaders });
      expect(result).toEqual({ id: 2, ...role });
    });
  });

  describe('updateRole', () => {
    const id = 3;
    const role = { name: 'superadmin' };

    it('should update role with token', async () => {
      const mockResponse = { data: { id, ...role } };
      axios.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateRole(id, role);

      expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/${id}`, role, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.patch
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id, ...role } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await updateRole(id, role);

      expect(axios.patch).toHaveBeenLastCalledWith(`${API_URL}/${id}`, role, { headers: mockNewHeaders });
      expect(result).toEqual({ id, ...role });
    });
  });

  describe('deleteRole', () => {
    const id = 4;

    it('should delete role with token', async () => {
      const mockResponse = { data: {} };
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deleteRole(id);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${id}`, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.delete
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: {} });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await deleteRole(id);

      expect(axios.delete).toHaveBeenLastCalledWith(`${API_URL}/${id}`, { headers: mockNewHeaders });
      expect(result).toEqual({});
    });
  });
});