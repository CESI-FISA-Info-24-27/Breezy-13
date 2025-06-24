import axios from 'axios';
import Cookies from 'js-cookie';
import * as AuthService from '../services/authServices';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../services/CommentsServices';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../services/AuthServices');

describe('CommentService', () => {
  const token = 'valid-token';
  const newToken = 'new-token';
  const mockHeaders = { Authorization: token };
  const mockNewHeaders = { Authorization: newToken };
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/comments`;

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockReturnValue(token);
    localStorage.getItem = jest.fn().mockReturnValue(null);
  });

  describe('getComments', () => {
    it('should fetch comments with token', async () => {
      const mockResponse = { data: ['comment1', 'comment2'] };
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getComments();

      expect(axios.get).toHaveBeenCalledWith(API_URL, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed after refresh', async () => {
      const mockResponse = { data: ['comment1'] };
      axios.get
        .mockRejectedValueOnce({ response: { status: 401 } }) // first fail
        .mockResolvedValueOnce(mockResponse); // after retry

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await getComments();

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenLastCalledWith(API_URL, { headers: mockNewHeaders });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createComment', () => {
    const comment = { text: 'New comment' };

    it('should post a comment', async () => {
      const mockResponse = { data: { id: 1, ...comment } };
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await createComment(comment);

      expect(axios.post).toHaveBeenCalledWith(API_URL, comment, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry create on 401 and succeed after refresh', async () => {
      axios.post
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id: 1, ...comment } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await createComment(comment);

      expect(axios.post).toHaveBeenLastCalledWith(API_URL, comment, { headers: mockNewHeaders });
      expect(result).toEqual({ id: 1, ...comment });
    });
  });

  describe('updateComment', () => {
    const updated = { text: 'Updated comment' };
    const id = 123;

    it('should update a comment', async () => {
      const mockResponse = { data: { id, ...updated } };
      axios.patch.mockResolvedValueOnce(mockResponse);

      const result = await updateComment(id, updated);

      expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/${id}`, updated, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry update on 401 and succeed', async () => {
      axios.patch
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id, ...updated } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await updateComment(id, updated);

      expect(axios.patch).toHaveBeenLastCalledWith(`${API_URL}/${id}`, updated, { headers: mockNewHeaders });
      expect(result).toEqual({ id, ...updated });
    });
  });

  describe('deleteComment', () => {
    const id = 456;

    it('should delete a comment', async () => {
      const mockResponse = { data: {} };
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deleteComment(id);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${id}`, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry delete on 401 and succeed', async () => {
      axios.delete
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: {} });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await deleteComment(id);

      expect(axios.delete).toHaveBeenLastCalledWith(`${API_URL}/${id}`, { headers: mockNewHeaders });
      expect(result).toEqual({});
    });
  });
});