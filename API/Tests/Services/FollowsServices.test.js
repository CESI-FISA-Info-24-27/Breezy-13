let FollowsServices;

const mockFollowsDAO = {
    init: jest.fn(),
    getFollows: jest.fn(),
    createFollow: jest.fn(),
    deleteFollow: jest.fn()
};

// On mocke la factory avant d'importer le service
jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
    return {
        DAOMongoDbFactory: jest.fn().mockImplementation(() => {
            return {
                createFollowsDAO: () => mockFollowsDAO
            };
        })
    };
});

describe('FollowsServices', () => {
    beforeAll(async () => {
        // Importation dynamique APRÈS le mock
        const module = await import('../../App/Services/FollowsServices.js');
        FollowsServices = module.default;

        // Appelle init() si elle existe
        if (FollowsServices.init) {
            await FollowsServices.init();
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getFollows', () => {
        it('should return follows based on filters', async () => {
            const mockData = [{ follower: 'user1', following: 'user2' }];
            mockFollowsDAO.getFollows.mockResolvedValue(mockData);

            const result = await FollowsServices.getFollows({ follower: 'user1' });

            expect(mockFollowsDAO.getFollows).toHaveBeenCalledWith({ follower: 'user1' });
            expect(result).toEqual(mockData);
        });
    });

    describe('createFollows', () => {
        it('should create a follow relationship', async () => {
            const follow = { follower: 'user1', following: 'user2' };
            const mockCreated = { ...follow, createdAt: new Date().toISOString() };

            mockFollowsDAO.createFollow.mockResolvedValue(mockCreated);

            const result = await FollowsServices.createFollow(follow);

            expect(mockFollowsDAO.createFollow).toHaveBeenCalledWith(follow);
            expect(result).toEqual(mockCreated);
        });
    });

    describe('deleteFollows', () => {
        it('should delete a follow relationship', async () => {
            const follow = { follower: 'user1', following: 'user2' };
            const mockDeleted = { deleted: true };

            mockFollowsDAO.deleteFollow.mockResolvedValue(mockDeleted);

            const result = await FollowsServices.deleteFollow(follow);

            expect(mockFollowsDAO.deleteFollow).toHaveBeenCalledWith(follow);
            expect(result).toEqual(mockDeleted);
        });
    });
});