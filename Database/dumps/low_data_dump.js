const m_db = db.getSiblingm_db('breezy_bdd');

m_db.roles.deleteMany({});
m_db.users.deleteMany({});
m_db.follows.deleteMany({});
m_db.posts.deleteMany({});
m_db.comments.deleteMany({});

// Création des rôles
const ROLE_ADMIN = ObjectId("6849efc6bd8dc2e321172c78");
const ROLE_USER = ObjectId("6849efc6bd8dc2e321172c79");
const ROLE_GUEST = ObjectId("6849efc6bd8dc2e321172c7a");

m_db.roles.insertMany([
  {
    _id: ROLE_ADMIN,
    name: "Admin",
    permissions: {
      "/roles": { GET: true, POST: true, PUT: true, DELETE: true },
      "/users": { GET: true, POST: true, PUT: true, DELETE: true },
      "/posts": { GET: true, POST: true, PUT: true, DELETE: true },
      "/comments": { GET: true, POST: true, PUT: true, DELETE: true },
      "/follows": { GET: true, POST: true, PUT: true, DELETE: true },
      "/auth": { POST: true }
    }
  },
  {
    _id: ROLE_USER,
    name: "User",
    permissions: {
      "/roles": { GET: false, POST: false, PUT: false, DELETE: false },
      "/users": { GET: true, POST: false, PUT: true, DELETE: false },
      "/posts": { GET: true, POST: true, PUT: true, DELETE: true },
      "/comments": { GET: true, POST: true, PUT: true, DELETE: true },
      "/follows": { GET: true, POST: true, PUT: false, DELETE: true },
      "/auth": { POST: true }
    }
  },
  {
    _id: ROLE_GUEST,
    name: "Guest",
    permissions: {
      "/roles": { GET: false, POST: false, PUT: false, DELETE: false },
      "/users": { GET: false, POST: true, PUT: false, DELETE: false },
      "/posts": { GET: true, POST: false, PUT: false, DELETE: false },
      "/comments": { GET: true, POST: false, PUT: false, DELETE: false },
      "/follows": { GET: false, POST: false, DELETE: false },
      "/auth": { POST: true }
    }
  }
]);

// Création d'utilisateurs exemples
const now = new Date();
const users = [
  {
    _id: ObjectId(),
    username: "admin",
    email: "admin@breezy.com",
    password: "$2b$10$RBtjASMjXSNVo6ihgpEWg.gg/zX57UsF2a4B2TLezTL9FOi/JbdQu",
    avatar: "1749214669771-911823678.gif",
    bio: "Administrateur de Breezy",
    role_id: ROLE_ADMIN,
    isVerified: true,
    verificationToken: null,
    verificationTokenExpires: null,
    createdAt: now,
    updatedAt: now
  },
  {
    _id: ObjectId(),
    username: "alex.martin",
    email: "alexmartin@example.com",
    password: "$2b$10$RBtjASMjXSNVo6ihgpEWg.gg/zX57UsF2a4B2TLezTL9FOi/JbdQu",
    avatar: "1749713669755-621390355.png",
    bio: "Développeur/se passionné(e) | Paris",
    role_id: ROLE_USER,
    isVerified: true,
    verificationToken: null,
    verificationTokenExpires: null,
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 200),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 200)
  },
  {
    _id: ObjectId(),
    username: "julie.dubois",
    email: "juliedubois@example.com",
    password: "$2b$10$RBtjASMjXSNVo6ihgpEWg.gg/zX57UsF2a4B2TLezTL9FOi/JbdQu",
    avatar: "1749864963022-518074788.jpg",
    bio: "Photographie addict | Toujours curieux/se",
    role_id: ROLE_USER,
    isVerified: true,
    verificationToken: null,
    verificationTokenExpires: null,
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 180),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 180)
  }
];

m_db.users.insertMany(users);

// Création de follows simples
m_db.follows.insertMany([
  { follower: users[1]._id, following: users[2]._id, createdAt: now },
  { follower: users[2]._id, following: users[1]._id, createdAt: now },
  { follower: users[0]._id, following: users[1]._id, createdAt: now }
]);

// Création de posts simples
m_db.posts.insertMany([
  {
    author: users[1]._id,
    content: "Magnifique coucher de soleil aujourd'hui ! Que c'est beau 🌟",
    image: "1749713669755-621390355.png",
    likes: [users[2]._id],
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 10),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 10)
  },
  {
    author: users[2]._id,
    content: "Rien de tel qu'un bon café pour se détendre 😊",
    image: null,
    likes: [users[1]._id],
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 5),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 5)
  }
]);

// Création de commentaires
const posts = m_db.posts.find().toArray();

m_db.comments.insertMany([
  {
    author: users[0]._id,
    post: posts[0]._id,
    content: "Magnifique ! 😍",
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 9),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 9)
  },
  {
    author: users[1]._id,
    post: posts[1]._id,
    content: "J'adore ! ❤️",
    createdAt: new Date(now.getTime() - 1000 * 3600 * 24 * 4),
    updatedAt: new Date(now.getTime() - 1000 * 3600 * 24 * 4)
  }
]);