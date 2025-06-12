let UsersServices;

const mockUsersDAO = {
    init: jest.fn(),
    getUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    createUser: jest.fn(),
    addRevokedToken: jest.fn(),
    isTokenRevoked: jest.fn(),
    getRole: jest.fn(),
    getPermissions: jest.fn(),
};

// Mock de la factory AVANT l'import dynamique
jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
    return {
        DAOMongoDbFactory: jest.fn().mockImplementation(() => {
            return {
                createUsersDAO: () => mockUsersDAO
            };
        })
    };
});

describe('UsersServices', () => {
    beforeAll(async () => {
        const module = await import('../../App/Services/UsersServices');
        UsersServices = module.default;

        if (UsersServices.init) {
            await UsersServices.init();
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return users based on filters', async () => {
            const users = [{ id: 1, name: 'Alice' }];
            mockUsersDAO.getUsers.mockResolvedValue(users);

            const result = await UsersServices.getUsers({ name: 'Alice' });

            expect(mockUsersDAO.getUsers).toHaveBeenCalledWith({ name: 'Alice' });
            expect(result).toEqual(users);
        });
    });

    describe('createUsers', () => {
        it('should create a new user', async () => {
            const user = { name: 'Bob', email: 'bob@example.com' };
            const created = { ...user, id: 2 };

            mockUsersDAO.createUser.mockResolvedValue(created);

            const result = await UsersServices.createUsers(user);

            expect(mockUsersDAO.createUser).toHaveBeenCalledWith(user);
            expect(result).toEqual(created);
        });
    });

    describe('updateUsers', () => {
        it('should update a user by id', async () => {
            const userId = 3;
            const updatedData = { name: 'Charlie' };
            const updated = { id: 3, ...updatedData };

            mockUsersDAO.updateUser.mockResolvedValue(updated);

            const result = await UsersServices.updateUsers(userId, updatedData);

            expect(mockUsersDAO.updateUser).toHaveBeenCalledWith(userId, updatedData);
            expect(result).toEqual(updated);
        });
    });

    describe('deleteUsers', () => {
        it('should delete a user by id', async () => {
            const userId = 4;
            const deleted = { deleted: true };

            mockUsersDAO.deleteUser.mockResolvedValue(deleted);

            const result = await UsersServices.deleteUsers(userId);

            expect(mockUsersDAO.deleteUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(deleted);
        });
    });

    describe('addRevokedToken', () => {
        it('should add a revoked token', async () => {
            const token = 'token123';
            const response = { success: true };

            mockUsersDAO.addRevokedToken.mockResolvedValue(response);

            const result = await UsersServices.addRevokedToken(token);

            expect(mockUsersDAO.addRevokedToken).toHaveBeenCalledWith(token);
            expect(result).toEqual(response);
        });
    });

    describe('isTokenRevoked', () => {
        it('should return true if token is revoked', async () => {
            const token = 'revokedToken';

            mockUsersDAO.isTokenRevoked.mockResolvedValue(true);

            const result = await UsersServices.isTokenRevoked(token);

            expect(mockUsersDAO.isTokenRevoked).toHaveBeenCalledWith(token);
            expect(result).toBe(true);
        });

        it('should return false if token is not revoked', async () => {
            const token = 'validToken';

            mockUsersDAO.isTokenRevoked.mockResolvedValue(false);

            const result = await UsersServices.isTokenRevoked(token);

            expect(mockUsersDAO.isTokenRevoked).toHaveBeenCalledWith(token);
            expect(result).toBe(false);
        });
    });

    describe('getRole', () => {
        it('should return the role of the user', async () => {
            const userId = 5;
            const role = { id: 1, name: 'admin' };

            mockUsersDAO.getRole.mockResolvedValue(role);

            const result = await UsersServices.getRole(userId);

            expect(mockUsersDAO.getRole).toHaveBeenCalledWith(userId);
            expect(result).toEqual(role);
        });
    });

    describe('getPermissions', () => {
        it('should return the permissions of the user', async () => {
            const userId = 6;
            const permissions = ['read', 'write'];

            mockUsersDAO.getPermissions.mockResolvedValue(permissions);

            const result = await UsersServices.getPermissions(userId);

            expect(mockUsersDAO.getPermissions).toHaveBeenCalledWith(userId);
            expect(result).toEqual(permissions);
        });
    });
});