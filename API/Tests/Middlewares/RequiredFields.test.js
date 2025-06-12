import fieldsRequired from '../../App/Middlewares/RequiredFields.js';

describe('fieldsRequired middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if all required fields are present', () => {
    req.body = { username: 'user1', password: 'pass123' };
    const middleware = fieldsRequired(['username', 'password']);

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should respond with 400 if some required fields are missing', () => {
    req.body = { username: 'user1' }; // password missing
    const middleware = fieldsRequired(['username', 'password']);

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Les champs suivants sont requis : password',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond with 500 if an exception is thrown', () => {
    // Simuler une erreur dans la lecture de req.body en créant un getter qui lance
    Object.defineProperty(req, 'body', {
      get() {
        throw new Error('Test error');
      },
    });

    const middleware = fieldsRequired(['anyField']);

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erreur interne du serveur' });
    expect(next).not.toHaveBeenCalled();
  });
});