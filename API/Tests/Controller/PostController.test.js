import PostController from '../../App/Controller/PostController.js';
import PostsServices from '../../App/Services/PostsServices.js';

jest.mock('../../App/Services/PostsServices.js');

describe('PostController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { query: {}, body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return posts from the service', async () => {
      const mockPosts = [{ id: 1, content: 'Hello' }];
      PostsServices.getPosts.mockResolvedValue(mockPosts);

      await PostController.getPosts(req, res);

      expect(PostsServices.getPosts).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should return 500 on service error', async () => {
      PostsServices.getPosts.mockRejectedValue(new Error('Service error'));

      await PostController.getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Service error') });
    });
  });

  describe('createPost', () => {
    it('should return 400 if content is missing or not string', async () => {
      req.body = { content: 123 };

      await PostController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Le contenu doit être une chaîne de caractères' });
    });

    it('should create post and return 201', async () => {
      req.body = { content: 'New post' };
      const createdPost = { id: 1, content: 'New post' };
      PostsServices.createPost.mockResolvedValue(createdPost);

      await PostController.createPost(req, res);

      expect(PostsServices.createPost).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdPost);
    });

    it('should return 500 on service error', async () => {
      req.body = { content: 'New post' };
      PostsServices.createPost.mockRejectedValue(new Error('Create error'));

      await PostController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Create error') });
    });
  });

  describe('updatePost', () => {
    it('should return 404 if post not found', async () => {
      req.params.id = '1';
      PostsServices.getPosts.mockResolvedValue([]);

      await PostController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Post non trouvé' });
    });

    it('should update post and return updated post', async () => {
      req.params.id = '1';
      req.body = { content: 'Updated content' };
      const foundPost = [{ id: '1', content: 'Old content' }];
      const updatedPost = { id: '1', content: 'Updated content' };
      PostsServices.getPosts.mockResolvedValue(foundPost);
      PostsServices.updatePost.mockResolvedValue(updatedPost);

      await PostController.updatePost(req, res);

      expect(PostsServices.getPosts).toHaveBeenCalledWith({ id: '1' });
      expect(PostsServices.updatePost).toHaveBeenCalledWith('1', req.body);
      expect(res.json).toHaveBeenCalledWith(updatedPost);
    });

    it('should return 500 on service error', async () => {
      req.params.id = '1';
      req.body = { content: 'Updated content' };
      PostsServices.getPosts.mockRejectedValue(new Error('DB error'));

      await PostController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('DB error') });
    });
  });

  describe('getPostComments', () => {
    it('should return 404 if post not found', async () => {
      req.params.id = '1';
      PostsServices.getPosts.mockResolvedValue([]);

      await PostController.getPostComments(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Post non trouvé' });
    });

    it('should return comments for the post', async () => {
      req.params.id = '1';
      const foundPost = [{ _id: '1', content: 'Post content' }];
      const comments = [{ id: 1, content: 'Comment' }];
      PostsServices.getPosts.mockResolvedValue(foundPost);
      PostsServices.getComments.mockResolvedValue(comments);

      await PostController.getPostComments(req, res);

      expect(PostsServices.getPosts).toHaveBeenCalledWith({ _id: '1' });
      expect(PostsServices.getComments).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    it('should return 500 on service error', async () => {
      req.params.id = '1';
      PostsServices.getPosts.mockRejectedValue(new Error('DB error'));

      await PostController.getPostComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('DB error') });
    });
  });

  describe('deletePost', () => {
    it('should return 404 if post not found', async () => {
      req.params.id = '1';
      PostsServices.getPosts.mockResolvedValue([]);

      await PostController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Post non trouvé' });
    });

    it('should delete the post and return success message', async () => {
      req.params.id = '1';
      const foundPost = [{ id: '1' }];
      PostsServices.getPosts.mockResolvedValue(foundPost);
      PostsServices.deletePost.mockResolvedValue();

      await PostController.deletePost(req, res);

      expect(PostsServices.getPosts).toHaveBeenCalledWith({ id: '1' });
      expect(PostsServices.deletePost).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ message: 'Post supprimé' });
    });

    it('should return 500 on service error', async () => {
      req.params.id = '1';
      PostsServices.getPosts.mockRejectedValue(new Error('DB error'));

      await PostController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('DB error') });
    });
  });
});