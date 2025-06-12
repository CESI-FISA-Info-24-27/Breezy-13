import RolesServices from '../../App/Services/RolesServices.js';

jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
  // Mock Factory and DAO methods used in RolesServices
  const mockRolesDAO = {
    init: jest.fn(),
    getRoles: jest.fn(),
    updateRole: jest.fn(),
    deleteRole: jest.fn(),
    createRole: jest.fn(),
  };

  const mockFactory = {
    createRolesDAO: jest.fn(() => mockRolesDAO),
  };

  return {
    DAOMongoDbFactory: jest.fn(() => mockFactory),
  };
});

describe('RolesServices', () => {
  let RolesDAO;

  beforeAll(() => {
    // Import the mocked factory to access the mocked DAO instance
    const { DAOMongoDbFactory } = require('../../App/Factory/DAOMongoDbFactory.js');
    const factory = new DAOMongoDbFactory();
    RolesDAO = factory.createRolesDAO();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoles', () => {
    it('should return roles from DAO', async () => {
      const filters = { name: 'admin' };
      const mockRoles = [{ id: 1, name: 'admin' }];
      RolesDAO.getRoles.mockResolvedValue(mockRoles);

      const result = await RolesServices.getRoles(filters);

      expect(RolesDAO.getRoles).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockRoles);
    });
  });

  describe('updateRoles', () => {
    it('should update and return the updated role', async () => {
      const roleId = 1;
      const roleData = { name: 'user' };
      const updatedRole = { id: 1, name: 'user' };
      RolesDAO.updateRole.mockResolvedValue(updatedRole);

      const result = await RolesServices.updateRoles(roleId, roleData);

      expect(RolesDAO.updateRole).toHaveBeenCalledWith(roleId, roleData);
      expect(result).toEqual(updatedRole);
    });
  });

  describe('deleteRoles', () => {
    it('should delete and return the deleted role', async () => {
      const roleId = 1;
      const deletedRole = { id: 1, name: 'guest' };
      RolesDAO.deleteRole.mockResolvedValue(deletedRole);

      const result = await RolesServices.deleteRoles(roleId);

      expect(RolesDAO.deleteRole).toHaveBeenCalledWith(roleId);
      expect(result).toEqual(deletedRole);
    });
  });

  describe('createRoles', () => {
    it('should create and return the new role', async () => {
      const newRole = { name: 'moderator' };
      const createdRole = { id: 2, name: 'moderator' };
      RolesDAO.createRole.mockResolvedValue(createdRole);

      const result = await RolesServices.createRoles(newRole);

      expect(RolesDAO.createRole).toHaveBeenCalledWith(newRole);
      expect(result).toEqual(createdRole);
    });
  });

  describe('getRolePermissions', () => {
    it('should return permissions if role found', async () => {
      const roleId = 1;
      const mockRole = [{ _id: roleId, permissions: ['read', 'write'] }];
      RolesDAO.getRoles.mockResolvedValue(mockRole);

      const result = await RolesServices.getRolePermissions(roleId);

      expect(RolesDAO.getRoles).toHaveBeenCalledWith({ _id: roleId });
      expect(result).toEqual(mockRole[0].permissions);
    });

    it('should throw error if role not found', async () => {
      const roleId = 999;
      RolesDAO.getRoles.mockResolvedValue([]);

      await expect(RolesServices.getRolePermissions(roleId)).rejects.toThrow('Rôle non trouvé');
      expect(RolesDAO.getRoles).toHaveBeenCalledWith({ _id: roleId });
    });
  });
});