let RolesServices;

const mockRolesDAO = {
    init: jest.fn(),
    getRoles: jest.fn(),
    updateRole: jest.fn(),
    deleteRole: jest.fn(),
    createRole: jest.fn()
};

// Mock de la factory AVANT l'import dynamique
jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
    return {
        DAOMongoDbFactory: jest.fn().mockImplementation(() => {
            return {
                createRolesDAO: () => mockRolesDAO
            };
        })
    };
});

describe('RolesServices', () => {
    beforeAll(async () => {
        const module = await import('../../App/Services/RolesServices.js');
        RolesServices = module.default;

        if (RolesServices.init) {
            await RolesServices.init();
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getRoles', () => {
        it('should return roles based on filters', async () => {
            const roles = [{ id: 1, name: 'admin' }];
            mockRolesDAO.getRoles.mockResolvedValue(roles);

            const result = await RolesServices.getRoles({ name: 'admin' });

            expect(mockRolesDAO.getRoles).toHaveBeenCalledWith({ name: 'admin' });
            expect(result).toEqual(roles);
        });
    });

    describe('createRoles', () => {
        it('should create a new role', async () => {
            const role = { name: 'editor', permissions: ['write'] };
            const created = { ...role, id: 2 };

            mockRolesDAO.createRole.mockResolvedValue(created);

            const result = await RolesServices.createRoles(role);

            expect(mockRolesDAO.createRole).toHaveBeenCalledWith(role);
            expect(result).toEqual(created);
        });
    });

    describe('updateRoles', () => {
        it('should update a role by id', async () => {
            const roleId = 3;
            const updatedData = { name: 'viewer' };
            const updated = { id: 3, ...updatedData };

            mockRolesDAO.updateRole.mockResolvedValue(updated);

            const result = await RolesServices.updateRoles(roleId, updatedData);

            expect(mockRolesDAO.updateRole).toHaveBeenCalledWith(roleId, updatedData);
            expect(result).toEqual(updated);
        });
    });

    describe('deleteRoles', () => {
        it('should delete a role by id', async () => {
            const roleId = 4;
            const deleted = { deleted: true };

            mockRolesDAO.deleteRole.mockResolvedValue(deleted);

            const result = await RolesServices.deleteRoles(roleId);

            expect(mockRolesDAO.deleteRole).toHaveBeenCalledWith(roleId);
            expect(result).toEqual(deleted);
        });
    });

    describe('getRolePermissions', () => {
        it('should return permissions for a given role ID', async () => {
            const roleId = 5;
            const permissions = ['read', 'write'];
            const role = { _id: roleId, permissions };

            mockRolesDAO.getRoles.mockResolvedValue([role]);

            const result = await RolesServices.getRolePermissions(roleId);

            expect(mockRolesDAO.getRoles).toHaveBeenCalledWith({ _id: roleId });
            expect(result).toEqual(permissions);
        });

        it('should throw an error if role not found', async () => {
            mockRolesDAO.getRoles.mockResolvedValue([]);

            await expect(RolesServices.getRolePermissions(999)).rejects.toThrow('Rôle non trouvé');
        });
    });
});