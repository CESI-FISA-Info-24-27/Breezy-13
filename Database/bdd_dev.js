import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

const MONGO_URI = "mongodb://localhost:27017"; // adapte si besoin
const DB_NAME = "breezy_bdd"; // adapte si besoin
const USERS_COUNT = 150; // nombre d'utilisateurs à générer
const FOLLOWS_PER_USER = 30; // nombre de follows par utilisateur
const POSTS_PER_USER = 13; // nombre de posts par utilisateur
const COMMENTS_PER_USER = 43; // nombre de commentaires par utilisateur

const ROLE_USER = "6849efc6bd8dc2e321172c79";
const AVATAR_URLS = [
  "http://localhost:5000/files/1749214669771-911823678.gif",
  "http://localhost:5000/files/1749713669755-621390355.png",
  "http://localhost:5000/files/1749824531489-54769329.gif",
  "http://localhost:5000/files/1749864953025-258947954.jpg",
  "http://localhost:5000/files/1749864963022-518074788.jpg",
  "http://localhost:5000/files/1749864974040-277207196.PNG",
  "http://localhost:5000/files/1749865024759-123915179.png"
];

function getRandomAvatar() {
  return AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)];
}

function getRandomImage() {
  return AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)];
}

async function main() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const users = [];

  // Génération des utilisateurs
  for (let i = 0; i < USERS_COUNT; i++) {
    //const password = await hash("password" + i, 10);
    const password = 'choucroute';
    users.push({
      username: faker.internet.userName() + i,
      email: faker.internet.email().toLowerCase(),
      password,
      avatar: getRandomAvatar(),
      bio: faker.lorem.sentence(),
      role_id: ROLE_USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Insertion des utilisateurs
  const result = await db.collection("users").insertMany(users);
  const userIds = Object.values(result.insertedIds);

  // Génération des liens de follow
  const follows = [];
  for (let i = 0; i < userIds.length; i++) {
    const followerId = userIds[i];
    let possible = userIds.filter((id, idx) => idx !== i);
    faker.helpers.shuffle(possible);
    const followingIds = possible.slice(0, Math.min(FOLLOWS_PER_USER, possible.length));
    for (const followingId of followingIds) {
      follows.push({
        follower: followerId,
        following: followingId,
        createdAt: new Date(),
      });
    }
  }
  if (follows.length > 0) {
    await db.collection("follows").insertMany(follows);
    console.log(`${follows.length} liens de follow insérés.`);
  }

  // Génération des posts
  const posts = [];
  for (let i = 0; i < userIds.length; i++) {
    const authorId = userIds[i];
    for (let j = 0; j < POSTS_PER_USER; j++) {
      // Génère des likes aléatoires (0 à 10 likes par post)
      const likesCount = faker.number.int({ min: 0, max: 10 });
      const shuffled = faker.helpers.shuffle(userIds.filter((id) => id !== authorId));
      const likes = shuffled.slice(0, likesCount);

      posts.push({
        author: authorId,
        content: faker.lorem.sentence(),
        image: getRandomImage(),
        likes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  let postsResult = null;
  if (posts.length > 0) {
    postsResult = await db.collection("posts").insertMany(posts);
    console.log(`${posts.length} posts insérés.`);
  }

  // Génération des commentaires
  const comments = [];
  // On récupère tous les _id des posts insérés
  const postsFromDb = await db.collection("posts").find({}, { projection: { _id: 1 } }).toArray();
  const postIds = postsFromDb.map(p => p._id);

  for (let i = 0; i < userIds.length; i++) {
    const authorId = userIds[i];
    // Pour chaque utilisateur, il commente sur des posts aléatoires
    const shuffledPosts = faker.helpers.shuffle(postIds);
    for (let j = 0; j < Math.min(COMMENTS_PER_USER, postIds.length); j++) {
      comments.push({
        author: authorId,
        post: shuffledPosts[j],
        content: faker.lorem.sentence(),
        createdAt: new Date(),
      });
    }
  }
  if (comments.length > 0) {
    await db.collection("comments").insertMany(comments);
    console.log(`${comments.length} commentaires insérés.`);
  }

  console.log(`${USERS_COUNT} utilisateurs insérés.`);
  await client.close();
}

main().catch(console.error);