import CommentController from '../../App/Controller/CommentController.js';
import CommentsServices from '../../App/Services/CommentsServices.js';

jest.mock('../../App/Services/CommentsServices.js');

describe('CommentController', () => {
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

  describe('getComments', () => {
    it('should return comments from the service', async () => {
      const mockComments = [{ id: 1, content: 'Test comment' }];
      CommentsServices.getComments.mockResolvedValue(mockComments);

      await CommentController.getComments(req, res);

      expect(CommentsServices.getComments).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 500 on error', async () => {
      CommentsServices.getComments.mockRejectedValue(new Error('Service error'));

      await CommentController.getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Service error') });
    });
  });

  describe('createComment', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = { author: 'user', content: 'no post' };

      await CommentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Les champs author, post et content sont requis',
      });
    });

    it('should create comment and return 201', async () => {
      req.body = {
        author: 'user',
        post: '123',
        content: 'test content',
        parentCommentId: null,
      };
      const created = { id: 1, ...req.body };
      CommentsServices.createComment.mockResolvedValue(created);

      await CommentController.createComment(req, res);

      expect(CommentsServices.createComment).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });

    it('should return 500 on error', async () => {
      req.body = { author: 'user', post: '123', content: 'content' };
      CommentsServices.createComment.mockRejectedValue(new Error('Create error'));

      await CommentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Create error') });
    });
  });

  describe('deleteComment', () => {
    it('should return 404 if comment not found', async () => {
      req.params.id = '999';
      CommentsServices.getComments.mockResolvedValue([]);

      await CommentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Commentaire non trouvé' });
    });

    it('should delete the comment and return success message', async () => {
      req.params.id = '1';
      CommentsServices.getComments.mockResolvedValue([{ id: 1 }]);
      CommentsServices.deleteComment.mockResolvedValue();

      await CommentController.deleteComment(req, res);

      expect(CommentsServices.deleteComment).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ message: 'Commentaire supprimé' });
    });

    it('should return 500 on error', async () => {
      req.params.id = '1';
      CommentsServices.getComments.mockRejectedValue(new Error('DB error'));

      await CommentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('DB error') });
    });
  });
});