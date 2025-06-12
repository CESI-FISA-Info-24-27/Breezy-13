import FollowController from '../../App/Controller/FollowController.js';
import FollowsServices from '../../App/Services/FollowsServices.js';

jest.mock('../../App/Services/FollowsServices.js');

describe('FollowController', () => {
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

  describe('getFollows', () => {
    it('should return follows from the service', async () => {
      const mockFollows = [{ id: 1, follower_id: 2, following_id: 3 }];
      FollowsServices.getFollows.mockResolvedValue(mockFollows);

      await FollowController.getFollows(req, res);

      expect(FollowsServices.getFollows).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(mockFollows);
    });

    it('should return 500 on error', async () => {
      FollowsServices.getFollows.mockRejectedValue(new Error('Service error'));

      await FollowController.getFollows(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Service error') });
    });
  });

  describe('createFollow', () => {
    it('should return 400 if follower_id or following_id is missing', async () => {
      req.body = { follower_id: 1 };

      await FollowController.createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Les identifiants follower_id et following_id sont requis',
      });
    });

    it('should create follow and return 201', async () => {
      req.body = { follower_id: 1, following_id: 2 };
      const created = { id: 1, ...req.body };
      FollowsServices.createFollow.mockResolvedValue(created);

      await FollowController.createFollow(req, res);

      expect(FollowsServices.createFollow).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });

    it('should return 500 on error', async () => {
      req.body = { follower_id: 1, following_id: 2 };
      FollowsServices.createFollow.mockRejectedValue(new Error('Create error'));

      await FollowController.createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Create error') });
    });
  });

  describe('deleteFollow', () => {
    it('should return 404 if follow not found', async () => {
      req.params.id = '999';
      FollowsServices.getFollows.mockResolvedValue([]);

      await FollowController.deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Suivi non trouvé' });
    });

    it('should delete the follow and return success message', async () => {
      req.params.id = '1';
      FollowsServices.getFollows.mockResolvedValue([{ id: 1 }]);
      FollowsServices.deleteFollow.mockResolvedValue();

      await FollowController.deleteFollow(req, res);

      expect(FollowsServices.deleteFollow).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ message: 'Suivi supprimé' });
    });

    it('should return 500 on error', async () => {
      req.params.id = '1';
      FollowsServices.getFollows.mockRejectedValue(new Error('DB error'));

      await FollowController.deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('DB error') });
    });
  });
});