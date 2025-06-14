import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "breezy_bdd";
const USERS_COUNT = 337;
const POSTS_PER_USER = 7;
const COMMENTS_PER_USER = 20;

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

  // --- Génération des groupes et des liens de follow réalistes ---
  const GROUP_COUNT = 5;
  const GROUP_SIZE = Math.floor(USERS_COUNT / GROUP_COUNT);
  const follows = [];

  // 1. Groupes fermés : chaque groupe est une "bulle" où les membres se suivent beaucoup entre eux
  for (let g = 0; g < GROUP_COUNT; g++) {
    const start = g * GROUP_SIZE;
    const end = g === GROUP_COUNT - 1 ? userIds.length : (g + 1) * GROUP_SIZE;
    const groupUserIds = userIds.slice(start, end);

    for (let i = 0; i < groupUserIds.length; i++) {
      const followerId = groupUserIds[i];
      // Chaque membre suit 60-90% des autres membres de son groupe (hors lui-même)
      let possible = groupUserIds.filter((id, idx) => idx !== i);
      faker.helpers.shuffle(possible);
      const nbFollows = Math.floor(possible.length * faker.number.float({ min: 0.6, max: 0.9 }));
      const followingIds = possible.slice(0, nbFollows);
      for (const followingId of followingIds) {
        follows.push({
          follower: followerId,
          following: followingId,
          createdAt: new Date(),
        });
      }
    }
  }

  // 2. Quelques liens inter-groupes pour la connectivité globale (faible proportion)
  for (let i = 0; i < GROUP_COUNT * 8; i++) {
    let groupA = Math.floor(Math.random() * GROUP_COUNT);
    let groupB = (groupA + 1 + Math.floor(Math.random() * (GROUP_COUNT - 1))) % GROUP_COUNT;
    let userA = userIds[groupA * GROUP_SIZE + Math.floor(Math.random() * GROUP_SIZE)];
    let userB = userIds[groupB * GROUP_SIZE + Math.floor(Math.random() * GROUP_SIZE)];
    if (userA && userB && userA !== userB) {
      follows.push({
        follower: userA,
        following: userB,
        createdAt: new Date(),
      });
    }
  }

  // 3. Quelques "influenceurs" : certains utilisateurs sont suivis par beaucoup d'autres, même hors groupe
  const influencerCount = Math.floor(GROUP_COUNT * 1.5);
  const influencerIndexes = faker.helpers.shuffle([...Array(userIds.length).keys()]).slice(0, influencerCount);
  for (const idx of influencerIndexes) {
    const influencerId = userIds[idx];
    // 10 à 30 followers aléatoires (hors lui-même)
    const possibleFollowers = userIds.filter(id => id !== influencerId);
    faker.helpers.shuffle(possibleFollowers);
    const nbFollowers = faker.number.int({ min: 10, max: 30 });
    for (let i = 0; i < nbFollowers; i++) {
      follows.push({
        follower: possibleFollowers[i],
        following: influencerId,
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
  const postsFromDb = await db.collection("posts").find({}, { projection: { _id: 1 } }).toArray();
  const postIds = postsFromDb.map(p => p._id);

  for (let i = 0; i < userIds.length; i++) {
    const authorId = userIds[i];
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