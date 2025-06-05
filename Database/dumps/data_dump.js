const m_db = db.getSiblingDB('breezy_bdd');
const now = new Date();

const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    bio: 'Je suis l\'administrateur de Breezy.',
    role_id: 1,
    createdAt: now,
    updatedAt: now
  },
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'ef6b216cce798c9a1df96e8bc472e6f88b491859efbad6450fe9dbeeae5e31ce',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    bio: 'Fan de randonnée et de photographie.',
    role_id: 2,
    createdAt: now,
    updatedAt: now
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: '4993edb392c9c2f9ed86d055c743931d5e74d9189b1673d6f93078f2fdce37ac',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    bio: 'Amateur de café et de backend.',
    role_id: 2,
    createdAt: now,
    updatedAt: now
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    password: 'd6d61176049003f4686ebbfda757f47dea7d6e45be34dffaf526a8522058c83d',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    bio: 'Skateur et codeur.',
    role_id: 2,
    createdAt: now,
    updatedAt: now
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    password: 'bdd586827df90527e9a5abe57503080f8281ea6c5c4768d415a0428d365ccf08',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    bio: 'Toujours en quête de brise fraîche.',
    role_id: 3,
    createdAt: now,
    updatedAt: now
  }
];

users.forEach(function(user) {
  user.updatedAt = new Date();

  const username = user.username;
  const userData = Object.assign({}, user);
  delete userData.username;
  delete userData.createdAt; // fix

  m_db.users.updateOne(
    { username: username },
    {
      $set: userData,
      $setOnInsert: { createdAt: user.createdAt }
    },
    { upsert: true }
  );

  console.log(`📝 Utilisateur ${username} inséré ou mis à jour.`);
});

const posts = [
  {
    author: 'user2',
    content: 'Voici mon premier post sur Breezy. Trop cool ici !',
    image: 'https://source.unsplash.com/random/300x200?coffee',
    likes: ['user3', 'admin'],
    createdAt: now,
    updatedAt: now
  },
  {
    author: 'user3',
    content: 'Quelqu’un ici qui aime le skate ?',
    image: 'https://source.unsplash.com/random/300x200?skateboard',
    likes: ['user2'],
    createdAt: now,
    updatedAt: now
  },
  {
    author: 'user4',
    content: 'Premier jour sur Breezy !',
    image: 'https://source.unsplash.com/random/300x200?nature',
    likes: [],
    createdAt: now,
    updatedAt: now
  }
];

posts.forEach(function(post) {
  post.updatedAt = new Date();

  const author = post.author;
  const content = post.content;

  const postData = Object.assign({}, post);
  delete postData.author;
  delete postData.content;
  delete postData.createdAt; // fix

  m_db.posts.updateOne(
    { author: author, content: content },
    {
      $set: postData,
      $setOnInsert: { createdAt: post.createdAt }
    },
    { upsert: true }
  );

  console.log(`📝 Post de ${author} inséré ou mis à jour.`);
});

const postUser2 = m_db.posts.findOne({ author: 'user2', content: 'Voici mon premier post sur Breezy. Trop cool ici !' });
const postUser3 = m_db.posts.findOne({ author: 'user3', content: 'Quelqu’un ici qui aime le skate ?' });

const comments = [
  {
    author: 'user1',
    post: postUser2 ? postUser2._id : null,
    content: 'Bienvenue sur Breezy ! ☀️',
    createdAt: now,
    updatedAt: now
  },
  {
    author: 'user3',
    post: postUser2 ? postUser2._id : null,
    content: 'J’adore ton style d’écriture.',
    createdAt: now,
    updatedAt: now
  },
  {
    author: 'user2',
    post: postUser3 ? postUser3._id : null,
    content: 'Totalement ! On se fait une session ?',
    createdAt: now,
    updatedAt: now
  }
];

comments.forEach(function(comment) {
  comment.updatedAt = new Date();

  const author = comment.author;
  const postId = comment.post;
  const content = comment.content;

  const commentData = Object.assign({}, comment);
  delete commentData.author;
  delete commentData.post;
  delete commentData.content;
  delete commentData.createdAt; // fix

  m_db.comments.updateOne(
    { author: author, post: postId, content: content },
    {
      $set: commentData,
      $setOnInsert: { createdAt: comment.createdAt }
    },
    { upsert: true }
  );

  console.log(`📝 Commentaire de ${author} inséré ou mis à jour.`);
});

const follows = [
  { follower: 'user1', following: 'user2', createdAt: now, updatedAt: now },
  { follower: 'user3', following: 'user2', createdAt: now, updatedAt: now },
  { follower: 'user4', following: 'user1', createdAt: now, updatedAt: now }
];

follows.forEach(function(follow) {
  follow.updatedAt = new Date();

  const follower = follow.follower;
  const following = follow.following;

  const followData = Object.assign({}, follow);
  delete followData.follower;
  delete followData.following;
  delete followData.createdAt; // fix

  m_db.follows.updateOne(
    { follower: follower, following: following },
    {
      $set: followData,
      $setOnInsert: { createdAt: follow.createdAt }
    },
    { upsert: true }
  );

  console.log(`📝 Relation de suivi de ${follower} vers ${following} insérée ou mise à jour.`);
});
