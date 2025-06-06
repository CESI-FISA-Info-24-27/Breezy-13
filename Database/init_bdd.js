db = db.getSiblingDB('breezy_bdd');

if (db.users.countDocuments() === 0)
{
  print('Initialisation des collections...');

  db.roles.insertMany([
    {
      role_id: 1,
      name: 'Administrator',
      permissions: 'all'
    },
    {
      role_id: 2,
      name: 'User',
      permissions: {
        '/roles': { GET: false, POST: false, PUT: false, DELETE: false },
        '/users': { GET: true, POST: false, PUT: true, DELETE: false },
        '/posts': { GET: true, POST: true, PUT: true, DELETE: true },
        '/comments': { GET: true, POST: true, PUT: true, DELETE: true },
        '/follows': { GET: true, POST: true, DELETE: true },
        '/auth': { POST: true }
      }
    },
    {
      role_id: 3,
      name: 'Guest',
      permissions: {
        '/roles': { GET: false, POST: false, PUT: false, DELETE: false },
        '/users': { GET: false, POST: true, PUT: false, DELETE: false },
        '/posts': { GET: true, POST: false, PUT: false, DELETE: false },
        '/comments': { GET: true, POST: false, PUT: false, DELETE: false },
        '/follows': { GET: false, POST: false, DELETE: false },
        '/auth': { POST: true }
      }
    }
  ]);

  db.users.insertMany([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'choucroute',
      avatar: 'https://example.com/avatar1.png',
      bio: 'Admin user',
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'choucroute',
      avatar: 'https://example.com/avatar2.png',
      bio: 'First user',
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  db.comments.insertMany([
    { author: 'admin', post: 'post1', content: 'Great post!', createdAt: new Date() },
    { author: 'user1', post: 'post2', content: 'Interesting read.', createdAt: new Date() }
  ]);

  db.follows.insertMany([
    { follower: 'user1', following: 'admin', createdAt: new Date() },
    { follower: 'admin', following: 'user1', createdAt: new Date() }
  ]);

  db.posts.insertMany([
    {
      author: 'admin',
      content: 'Welcome to Breezy!',
      image: 'https://example.com/image1.png',
      likes: ['user1'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      author: 'user1',
      content: 'Hello everyone!',
      image: 'https://example.com/image2.png',
      likes: ['admin'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  print('✔️ Base de données initialisée avec succès !');
} 
else 
{
  print('ℹ️ Base déjà initialisée, aucun changement effectué.');
}