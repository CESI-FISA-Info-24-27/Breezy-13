let PostsServices;

const mockPostsDAO = {
    init: jest.fn(),
    getPosts: jest.fn(),
    createPost: jest.fn(),
    getComments: jest.fn(),
    likePost: jest.fn()
};

// On mocke la factory avant l'import
jest.mock('../../App/Factory/DAOMongoDbFactory.js', () => {
    return {
        DAOMongoDbFactory: jest.fn().mockImplementation(() => {
            return {
                createPostsDAO: () => mockPostsDAO
            };
        })
    };
});

// On mocke aussi UsersDAO manuellement (hack temporaire dans ce contexte)
jest.mock('../../App/Services/UsersDAO.js', () => mockUsersDAO, { virtual: true });

describe('PostsServices', () => {
    beforeAll(async () => {
        const module = await import('../../App/Services/PostsServices.js');
        PostsServices = module.default;

        if (PostsServices.init) {
            await PostsServices.init();
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getPosts', () => {
        it('should return posts based on filters', async () => {
            const mockData = [{ id: 1, content: 'Post content' }];
            mockPostsDAO.getPosts.mockResolvedValue(mockData);

            const result = await PostsServices.getPosts({ author: 'John' });

            expect(mockPostsDAO.getPosts).toHaveBeenCalledWith({ author: 'John' });
            expect(result).toEqual(mockData);
        });
    });

    describe('createPosts', () => {
        it('should create a new post', async () => {
            const newPost = { author: 'Jane', content: 'New post' };
            const mockCreated = { ...newPost, id: 1 };

            mockPostsDAO.createPost.mockResolvedValue(mockCreated);

            const result = await PostsServices.createPost(newPost);

            expect(result).toEqual(mockCreated);
        });
    });

    describe('getComments', () => {
        it('should return comments for a given post', async () => {
            const postId = 42;
            const comments = [{ id: 1, content: 'Nice!' }];
            mockPostsDAO.getComments.mockResolvedValue(comments);

            const result = await PostsServices.getComments(postId);

            expect(mockPostsDAO.getComments).toHaveBeenCalledWith(postId);
            expect(result).toEqual(comments);
        });
    });

    describe('likePost', () => {
        it('should like a post by a user', async () => {
            const postId = 5;
            const userId = 10;
            const mockResponse = { liked: true };

            mockPostsDAO.likePost.mockResolvedValue(mockResponse);

            const result = await PostsServices.likePost(postId, userId);

            expect(mockPostsDAO.likePost).toHaveBeenCalledWith(postId, userId);
            expect(result).toEqual(mockResponse);
        });
    });
});