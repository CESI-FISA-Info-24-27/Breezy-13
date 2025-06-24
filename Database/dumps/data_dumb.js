import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "breezy_bdd";
const now = new Date();

// Configuration
const USERS_COUNT = 337;
const POSTS_PER_USER = 7;
const COMMENTS_PER_USER = 20;
const ROLE_USER = new ObjectId("6849efc6bd8dc2e321172c79");

const AVATAR_URLS = [
  "1749214669771-911823678.gif",
  "1749713669755-621390355.png",
  "1749824531489-54769329.gif",
  "1749864953025-258947954.jpg",
  "1749864963022-518074788.jpg",
  "1749864974040-277207196.PNG",
  "1749865024759-123915179.png",
  "1749864985955-515787396.PNG"
];

const MESSAGE_IMAGE_URLS = [
  "1749214669771-911823678.gif",
  "1749713669755-621390355.png",
  "1749824531489-54769329.gif",
  "1749864953025-258947954.jpg",
  "1749864963022-518074788.jpg",
  "1749864974040-277207196.PNG",
  "1749865024759-123915179.png",
  "1749864985955-515787396.PNG"
];

const MESSAGE_PHRASES = [
  "Salut, comment tu vas ?",
  "On se retrouve ce soir ?",
  "Tu as vu le dernier épisode ?",
  "Merci pour ton aide !",
  "Je t'envoie le document.",
  "On se capte demain ?",
  "Haha, bien vu !",
  "Bonne journée !",
  "Tu peux m'appeler ?",
  "C'est validé pour moi.",
  "Je suis dispo à 18h.",
  "On avance sur le projet ?",
  "Top, merci !",
  "Tu as des nouvelles ?",
  "À bientôt sur Breezy !"
];

// Utils
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomWord() {
  const ws = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do"];
  return ws[Math.floor(Math.random() * ws.length)];
}
function randomSentence(min=5, max=12) {
  const len = min + Math.floor(Math.random() * (max - min));
  let s = [];
  for (let i=0; i<len; i++) s.push(randomWord());
  return s.join(' ');
}
function randomDateInLast30Days() {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return past;
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  // Génération des utilisateurs
  let users = [];
  for (let i = 0; i < USERS_COUNT; i++) {
    users.push({
      username: `user${i}_${Math.floor(Math.random()*10000)}`,
      email: `user${i}@example.com`,
      password: "$2b$10$np5ZM6bsJzb89CrBJdD7mO2jKZhk9Y2kEPy.mwF9FtTL5k2P4tnKy",
      avatar: randomItem(AVATAR_URLS),
      bio: randomSentence(),
      role_id: ROLE_USER,
      createdAt: now,
      updatedAt: now
    });
  }
  await db.collection("users").deleteMany({});
  const userInsertRes = await db.collection("users").insertMany(users);
  const userIds = Object.values(userInsertRes.insertedIds);
  console.log(`${userIds.length} utilisateurs insérés.`);

  // Génération des follows
  const GROUP_COUNT = 5;
  const GROUP_SIZE = Math.floor(userIds.length / GROUP_COUNT);
  let follows = [];

  for (let g=0; g<GROUP_COUNT; g++) {
    const start = g*GROUP_SIZE;
    const end = (g === GROUP_COUNT-1 ? userIds.length : start + GROUP_SIZE);
    const group = userIds.slice(start, end);
    for (let i=0; i<group.length; i++) {
      const follower = group[i];
      const possible = group.filter((_, idx) => idx !== i);
      possible.sort(() => Math.random()-0.5);
      const count = Math.floor(possible.length * (0.6 + Math.random()*0.3));
      possible.slice(0, count).forEach(f => follows.push({
        follower, following: f, createdAt: now
      }));
    }
  }
  for (let i=0; i<GROUP_COUNT*8; i++) {
    const ga = Math.floor(Math.random()*GROUP_COUNT);
    const gb = (ga + 1 + Math.floor(Math.random()*(GROUP_COUNT-1)))%GROUP_COUNT;
    const a = userIds[ga * GROUP_SIZE + Math.floor(Math.random()*GROUP_SIZE)];
    const b = userIds[gb * GROUP_SIZE + Math.floor(Math.random()*GROUP_SIZE)];
    if (a && b && !a.equals(b)) follows.push({ follower: a, following: b, createdAt: now });
  }
  const influencerCount = Math.floor(GROUP_COUNT * 1.5);
  const shuffledAll = [...userIds].sort(() => Math.random()-0.5).slice(0, influencerCount);
  shuffledAll.forEach(inf => {
    const others = userIds.filter(u => !u.equals(inf)).sort(() => Math.random()-0.5);
    const count = 10 + Math.floor(Math.random()*21);
    others.slice(0, count).forEach(u => {
      follows.push({ follower: u, following: inf, createdAt: now });
    });
  });
  await db.collection("follows").deleteMany({});
  if (follows.length) {
    await db.collection("follows").insertMany(follows);
    console.log(`${follows.length} liens de follow insérés.`);
  }

  // Génération des posts
  let posts = [];
  userIds.forEach(uid => {
    for (let j=0; j<POSTS_PER_USER; j++) {
      const others = userIds.filter(u => !u.equals(uid)).sort(() => Math.random()-0.5);
      const likesCount = Math.floor(Math.random() * 11);
      const likes = others.slice(0, likesCount);
      posts.push({
        author: uid,
        content: randomSentence(),
        image: randomItem(AVATAR_URLS),
        likes,
        createdAt: now,
        updatedAt: now
      });
    }
  });
  await db.collection("posts").deleteMany({});
  await db.collection("posts").insertMany(posts);
  console.log(`${posts.length} posts insérés.`);

  // Génération des commentaires
  const allPostIds = (await db.collection("posts").find({}, {_id:1}).toArray()).map(p => p._id);
  let comments = [];
  userIds.forEach(uid => {
    const shuffledPosts = [...allPostIds].sort(() => Math.random()-0.5);
    for (let j=0; j<Math.min(COMMENTS_PER_USER, shuffledPosts.length); j++) {
      comments.push({
        author: uid,
        post: shuffledPosts[j],
        content: randomSentence(),
        createdAt: now,
        updatedAt: now
      });
    }
  });
  await db.collection("comments").deleteMany({});
  if (comments.length) {
    await db.collection("comments").insertMany(comments);
    console.log(`${comments.length} commentaires insérés.`);
  }

  // Génération des messages privés cohérents avec images pour une partie
  let messages = [];
  userIds.forEach(fromId => {
    const nbMessages = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < nbMessages; i++) {
      let toId;
      do {
        toId = randomItem(userIds);
      } while (toId.equals(fromId));
      const content = randomItem(MESSAGE_PHRASES);
      const createdAt = randomDateInLast30Days();

      // 30% des messages ont des images
      let images = [];
      if (Math.random() < 0.3) {
        const nbImages = 1 + Math.floor(Math.random() * 2); // 1 ou 2 images
        images = Array.from({ length: nbImages }, () => randomItem(MESSAGE_IMAGE_URLS));
      }

      // 10% des messages ont une vidéo (optionnel)
      let videos = [];
      if (Math.random() < 0.1) {
        videos = ["sample-video.mp4"]; // Mets ici tes chemins de vidéos si tu en as
      }

      messages.push({
        from: fromId,
        to: toId,
        content,
        createdAt,
        updatedAt: createdAt,
        read: Math.random() < 0.7,
        images,
        videos
      });
    }
  });
  await db.collection("messages").deleteMany({});
  if (messages.length) {
    await db.collection("messages").insertMany(messages);
    console.log(`${messages.length} messages privés insérés.`);
  }

  console.log("✅ Script terminé.");
  await client.close();
}

main().catch(err => {
  console.error("Erreur lors de l'exécution du script :", err);
}).finally(() => {
  process.exit(0);
});