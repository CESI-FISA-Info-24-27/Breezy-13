import axios from 'axios';
import Cookies from 'js-cookie';
<<<<<<< HEAD
import * as AuthService from '../services/authServices';
=======
import * as AuthService from '../services/AuthServices';
>>>>>>> 399dbca (feat : Mise en place des tests unitaires sur la web app #42)
import { getFollows } from '../services/FollowsServices';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../services/AuthServices');

describe('getFollows', () => {
  const token = 'valid-token';
  const newToken = 'new-token';
  const mockHeaders = { Authorization: token };
  const mockNewHeaders = { Authorization: newToken };
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/follows`;

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockReturnValue(token);
    localStorage.getItem = jest.fn().mockReturnValue(null);
  });

  it('should fetch follows with token', async () => {
    const mockResponse = { data: ['follow1', 'follow2'] };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await getFollows();

    expect(axios.get).toHaveBeenCalledWith(API_URL, { headers: mockHeaders });
    expect(result).toEqual(mockResponse.data);
  });

  it('should retry on 401 and succeed after refresh', async () => {
    const mockResponse = { data: ['follow1'] };
    axios.get
      .mockRejectedValueOnce({ response: { status: 401 } }) // first call fails with 401
      .mockResolvedValueOnce(mockResponse); // retry succeeds

    AuthService.refreshToken.mockResolvedValueOnce(newToken);

    const result = await getFollows();

    expect(AuthService.refreshToken).toHaveBeenCalled();
    expect(axios.get).toHaveBeenLastCalledWith(API_URL, { headers: mockNewHeaders });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error if not 401', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getFollows()).rejects.toThrow('Network Error');

    expect(AuthService.refreshToken).not.toHaveBeenCalled();
  });
});