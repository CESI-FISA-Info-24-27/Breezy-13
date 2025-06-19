import axios from 'axios';
import Cookies from 'js-cookie';
<<<<<<< HEAD
import * as AuthService from '../services/authServices';
=======
import * as AuthService from '../services/AuthServices';
>>>>>>> 399dbca (feat : Mise en place des tests unitaires sur la web app #42)
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../services/PostsServices';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('../services/AuthServices');

describe('PostService', () => {
  const token = 'valid-token';
  const newToken = 'new-token';
  const mockHeaders = { Authorization: token };
  const mockNewHeaders = { Authorization: newToken };
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.get.mockReturnValue(token);
    localStorage.getItem = jest.fn().mockReturnValue(null);
  });

  describe('getPosts', () => {
    it('should fetch posts with token', async () => {
      const mockResponse = { data: ['post1', 'post2'] };
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getPosts();

      expect(axios.get).toHaveBeenCalledWith(API_URL, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.get
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: ['post1'] });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await getPosts();

      expect(AuthService.refreshToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenLastCalledWith(API_URL, { headers: mockNewHeaders });
      expect(result).toEqual(['post1']);
    });

    it('should throw on non-401 error', async () => {
      const error = new Error('Unexpected error');
      axios.get.mockRejectedValueOnce(error);

      await expect(getPosts()).rejects.toThrow('Unexpected error');
      expect(AuthService.refreshToken).not.toHaveBeenCalled();
    });
  });

  describe('createPost', () => {
    const post = { title: 'Hello', content: 'World' };

    it('should create a post with token', async () => {
      const mockResponse = { data: { id: 1, ...post } };
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await createPost(post);

      expect(axios.post).toHaveBeenCalledWith(API_URL, post, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.post
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id: 1, ...post } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await createPost(post);

      expect(axios.post).toHaveBeenLastCalledWith(API_URL, post, { headers: mockNewHeaders });
      expect(result).toEqual({ id: 1, ...post });
    });
  });

  describe('updatePost', () => {
    const id = 123;
    const post = { title: 'Updated' };

    it('should update post with token', async () => {
      const mockResponse = { data: { id, ...post } };
      axios.patch.mockResolvedValueOnce(mockResponse);

      const result = await updatePost(id, post);

      expect(axios.patch).toHaveBeenCalledWith(`${API_URL}/${id}`, post, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.patch
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: { id, ...post } });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await updatePost(id, post);

      expect(axios.patch).toHaveBeenLastCalledWith(`${API_URL}/${id}`, post, { headers: mockNewHeaders });
      expect(result).toEqual({ id, ...post });
    });
  });

  describe('deletePost', () => {
    const id = 456;

    it('should delete post with token', async () => {
      const mockResponse = { data: {} };
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deletePost(id);

      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${id}`, { headers: mockHeaders });
      expect(result).toEqual(mockResponse.data);
    });

    it('should retry on 401 and succeed', async () => {
      axios.delete
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValueOnce({ data: {} });

      AuthService.refreshToken.mockResolvedValueOnce(newToken);

      const result = await deletePost(id);

      expect(axios.delete).toHaveBeenLastCalledWith(`${API_URL}/${id}`, { headers: mockNewHeaders });
      expect(result).toEqual({});
    });
  });
});