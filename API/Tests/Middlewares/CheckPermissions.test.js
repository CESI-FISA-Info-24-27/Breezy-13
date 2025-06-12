import checkPermissions from '../../App/Middlewares/CheckPermissions.js';
import Jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('checkPermissions middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      path: '/somepath',
      method: 'GET',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it('should respond 401 if no token provided', async () => {
    const middleware = checkPermissions();

    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond 401 if token is invalid', async () => {
    req.headers['authorization'] = 'Bearer invalidtoken';
    Jwt.verify.mockImplementation(() => { throw new Error('invalid token'); });

    const middleware = checkPermissions();

    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token invalide' });
    expect(next).not.toHaveBeenCalled();
  });
});