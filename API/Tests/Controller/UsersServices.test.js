import UsersServices from '../../App/Services/UsersServices.js';

jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
  const mockUsersDAO = {
    init: jest.fn(),
    getUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    createUser: jest.fn(),
    addrevokedtoken: jest.fn(),
    addRevokedToken: jest.fn(),
    isTokenRevoked: jest.fn(),
    getRole: jest.fn(),
    getPermissions: jest.fn(),
  };

  const mockFactory = {
    createUsersDAO: jest.fn(() => mockUsersDAO),
  };

  return {
    DAOMongoDbFactory: jest.fn(() => mockFactory),
  };
});

describe('UsersServices', () => {
  let UsersDAO;

  beforeAll(() => {
    const { DAOMongoDbFactory } = require('../../App/Factory/DAOMongoDbFactory.js');
    const factory = new DAOMongoDbFactory();
    UsersDAO = factory.createUsersDAO();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers should return filtered users', async () => {
    const filters = { name: 'Alice' };
    const mockUsers = [{ id: 1, name: 'Alice' }];
    UsersDAO.getUsers.mockResolvedValue(mockUsers);

    const result = await UsersServices.getUsers(filters);

    expect(UsersDAO.getUsers).toHaveBeenCalledWith(filters);
    expect(result).toEqual(mockUsers);
  });

  test('updateUsers should update and return user', async () => {
    const userId = 1;
    const userData = { name: 'Bob' };
    const updatedUser = { id: 1, name: 'Bob' };
    UsersDAO.updateUser.mockResolvedValue(updatedUser);

    const result = await UsersServices.updateUsers(userId, userData);

    expect(UsersDAO.updateUser).toHaveBeenCalledWith(userId, userData);
    expect(result).toEqual(updatedUser);
  });

  test('deleteUsers should delete and return user', async () => {
    const userId = 2;
    const deletedUser = { id: 2, name: 'Charlie' };
    UsersDAO.deleteUser.mockResolvedValue(deletedUser);

    const result = await UsersServices.deleteUsers(userId);

    expect(UsersDAO.deleteUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(deletedUser);
  });

  test('createUsers should create and return new user', async () => {
    const newUser = { name: 'Dana' };
    const createdUser = { id: 3, name: 'Dana' };
    UsersDAO.createUser.mockResolvedValue(createdUser);

    const result = await UsersServices.createUsers(newUser);

    expect(UsersDAO.createUser).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(createdUser);
  });

  test('addrevokedtoken should add a revoked token', async () => {
    const token = 'abc123';
    const expectedResult = { success: true };
    UsersDAO.addrevokedtoken.mockResolvedValue(expectedResult);

    const result = await UsersServices.addrevokedtoken(token);

    expect(UsersDAO.addrevokedtoken).toHaveBeenCalledWith(token);
    expect(result).toEqual(expectedResult);
  });

  test('addRevokedToken should add a revoked token (alias)', async () => {
    const token = 'def456';
    const expectedResult = { success: true };
    UsersDAO.addRevokedToken.mockResolvedValue(expectedResult);

    const result = await UsersServices.addRevokedToken(token);

    expect(UsersDAO.addRevokedToken).toHaveBeenCalledWith(token);
    expect(result).toEqual(expectedResult);
  });

  test('isTokenRevoked should return true/false (first definition)', async () => {
    const token = 'xyz789';
    UsersDAO.isTokenRevoked.mockResolvedValue(true);

    const result = await UsersServices.isTokenRevoked(token);

    expect(UsersDAO.isTokenRevoked).toHaveBeenCalledWith(token);
    expect(result).toBe(true);
  });

  test('getRole should return user role', async () => {
    const userId = 10;
    const role = { id: 1, name: 'admin' };
    UsersDAO.getRole.mockResolvedValue(role);

    const result = await UsersServices.getRole(userId);

    expect(UsersDAO.getRole).toHaveBeenCalledWith(userId);
    expect(result).toEqual(role);
  });

  test('getPermissions should return user permissions', async () => {
    const userId = 20;
    const permissions = ['read', 'write'];
    UsersDAO.getPermissions.mockResolvedValue(permissions);

    const result = await UsersServices.getPermissions(userId);

    expect(UsersDAO.getPermissions).toHaveBeenCalledWith(userId);
    expect(result).toEqual(permissions);
  });
});