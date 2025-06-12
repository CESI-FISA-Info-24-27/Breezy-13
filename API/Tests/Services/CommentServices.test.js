let CommentsServices;

const mockCommentsDAO = {
    init: jest.fn(),
    getComments: jest.fn(),
    createComment: jest.fn(),
    deleteComment: jest.fn()
};

// On mocke la factory avant d'importer le service
jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
    return {
        DAOMongoDbFactory: jest.fn().mockImplementation(() => {
            return {
                createCommentsDAO: () => mockCommentsDAO
            };
        })
    };
});

describe('CommentsServices', () => {
    beforeAll(async () => {
        // Importation dynamique APRÈS avoir mocké

        const module = await import('../../App/Services/CommentsServices.js');
        CommentsServices = module.default;

        // Appelle init() si elle existe
        if (CommentsServices.init) {
            await CommentsServices.init();
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getComments', () => {
        it('should return comments based on filters', async () => {
            const mockData = [{ id: 1, content: 'Hello' }];
            mockCommentsDAO.getComments.mockResolvedValue(mockData);

            const result = await CommentsServices.getComments({ post: 1 });

            expect(mockCommentsDAO.getComments).toHaveBeenCalledWith({ post: 1 });
            expect(result).toEqual(mockData);
        });
    });

    describe('createComment', () => {
        it('should create a new comment', async () => {
            const input = { author: 'John', post: 1, content: 'Nice post!' };
            const mockCreated = { ...input, parentCommentId: null };
            mockCommentsDAO.createComment.mockResolvedValue(mockCreated);

            const result = await CommentsServices.createComment(input);

            expect(mockCommentsDAO.createComment).toHaveBeenCalledWith(mockCreated);
            expect(result).toEqual(mockCreated);
        });

        it('should throw if required fields are missing', async () => {
            const badInputs = [
                { post: 1, content: '...' },
                { author: 'John', content: '...' },
                { author: 'John', post: 1 }
            ];

            for (const input of badInputs) {
                await expect(CommentsServices.createComment(input)).rejects.toThrow('Les champs author, post et content sont requis');
            }
        });
    });

    describe('deleteComment', () => {
        it('should delete an existing comment', async () => {
            mockCommentsDAO.getComments.mockResolvedValue([{ id: 1 }]);
            mockCommentsDAO.deleteComment.mockResolvedValue({ deleted: true });

            const result = await CommentsServices.deleteComment(1);

            expect(mockCommentsDAO.getComments).toHaveBeenCalledWith({ id: 1 });
            expect(mockCommentsDAO.deleteComment).toHaveBeenCalledWith(1);
            expect(result).toEqual({ deleted: true });
        });

        it('should throw if comment does not exist', async () => {
            mockCommentsDAO.getComments.mockResolvedValue([]);

            await expect(CommentsServices.deleteComment(99)).rejects.toThrow('Comment not found');
        });
    });
});