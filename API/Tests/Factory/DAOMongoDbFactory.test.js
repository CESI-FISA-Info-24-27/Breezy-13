import { DAOMongoDbFactory } from '../../App/Factory/DAOMongoDbFactory.js';
import { UsersMongoDAO } from '../../App/DAO/UsersMongoDAO.js';
import { RolesMongoDAO } from '../../App/DAO/RolesMongoDAO.js';
import { PostsMongoDAO } from '../../App/DAO/PostsMongoDAO.js';
import { CommentsMongoDAO } from '../../App/DAO/CommentsMongoDAO.js';
import { FollowsMongoDAO } from '../../App/DAO/FollowsMongoDAO.js';

describe('DAOMongoDbFactory', () => {
  let factory;

  beforeEach(() => {
    factory = new DAOMongoDbFactory();
  });

  test('createUsersDAO should return an instance of UsersMongoDAO', () => {
    const usersDAO = factory.createUsersDAO();
    expect(usersDAO).toBeInstanceOf(UsersMongoDAO);
  });

  test('createRolesDAO should return an instance of RolesMongoDAO', () => {
    const rolesDAO = factory.createRolesDAO();
    expect(rolesDAO).toBeInstanceOf(RolesMongoDAO);
  });

  test('createPostsDAO should return an instance of PostsMongoDAO', () => {
    const postsDAO = factory.createPostsDAO();
    expect(postsDAO).toBeInstanceOf(PostsMongoDAO);
  });

  test('createCommentsDAO should return an instance of CommentsMongoDAO', () => {
    const commentsDAO = factory.createCommentsDAO();
    expect(commentsDAO).toBeInstanceOf(CommentsMongoDAO);
  });

  test('createFollowsDAO should return an instance of FollowsMongoDAO', () => {
    const followsDAO = factory.createFollowsDAO();
    expect(followsDAO).toBeInstanceOf(FollowsMongoDAO);
  });
});