import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "breezy_bdd";
const now = new Date();

// Configuration
const USERS_COUNT = 337;
const POSTS_PER_USER = 7;
const COMMENTS_PER_USER = 20;

// IDs des rôles
const ROLE_ADMIN = new ObjectId("6849efc6bd8dc2e321172c78");
const ROLE_USER = new ObjectId("6849efc6bd8dc2e321172c79");
const ROLE_GUEST = new ObjectId("6849efc6bd8dc2e321172c7a");

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

// Données plus réalistes
const FIRST_NAMES = [
  "Alex", "Jordan", "Casey", "Taylor", "Morgan", "Riley", "Avery", "Quinn", "Sage", "River",
  "Marie", "Julie", "Sophie", "Emma", "Léa", "Chloé", "Camille", "Sarah", "Laura", "Clara",
  "Thomas", "Nicolas", "Alexandre", "Antoine", "Maxime", "Pierre", "Julien", "Adrien", "Romain", "Benjamin",
  "Lucas", "Hugo", "Louis", "Arthur", "Enzo", "Gabriel", "Raphaël", "Nathan", "Noah", "Ethan"
];

const LAST_NAMES = [
  "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Durand", "Leroy", "Moreau",
  "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier",
  "Morel", "Girard", "Andre", "Lefevre", "Mercier", "Dupont", "Lambert", "Bonnet", "Francois", "Martinez"
];

const BIO_TEMPLATES = [
  "Passionné(e) de {hobby} | {location}",
  "{profession} | Amoureux/se de {hobby}",
  "Explorateur/trice de {hobby} | {motto}",
  "{profession} passionné(e) | {location}",
  "{hobby} addict | {motto}",
  "Créatif/ve | {hobby} | {location}",
  "{profession} | {motto}",
  "Amateur/trice de {hobby} | Toujours curieux/se",
  "Vie simple, plaisirs {hobby} | {location}",
  "{motto} | {profession}"
];

const HOBBIES = [
  "photographie", "cuisine", "voyage", "lecture", "musique", "sport", "art", "nature", 
  "technologie", "cinéma", "danse", "jardinage", "randonnée", "yoga", "gaming"
];

const PROFESSIONS = [
  "Développeur/se", "Designer", "Étudiant(e)", "Entrepreneur/se", "Artiste", "Professeur(e)",
  "Ingénieur(e)", "Marketing", "Consultant(e)", "Journaliste", "Photographe", "Chef(fe)"
];

const LOCATIONS = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Lille", "Strasbourg",
  "Montpellier", "Nantes", "Rennes", "Grenoble", "Angers", "Tours", "Clermont-Ferrand"
];

const MOTTOS = [
  "La vie est belle", "Carpe diem", "Toujours positif/ve", "Créer et partager",
  "L'aventure m'appelle", "Simple et authentique", "Passionné(e) de vie",
  "Curieux/se de tout", "Rêver grand", "Vivre intensément"
];

const POST_TEMPLATES = [
  "Magnifique {moment} aujourd'hui ! {feeling} 🌟",
  "Rien de tel qu'un bon {activity} pour {benefit} 😊",
  "Découverte du jour : {discovery}. Vous connaissez ?",
  "{weather_comment} Parfait pour {activity} !",
  "Moment {emotion} avec {people}. {gratitude} ❤️",
  "Nouvelle {achievement} ! {reflection} 🎉",
  "{question} Vos avis m'intéressent !",
  "Inspiration du jour : {inspiration} ✨",
  "{sharing} pour égayer votre journée 📸",
  "Weekend parfait : {weekend_activity}. Et vous ?"
];

const POST_VARIABLES = {
  moment: ["coucher de soleil", "lever de soleil", "après-midi", "soirée", "matinée"],
  feeling: ["Que c'est beau", "Instant magique", "Pure beauté", "Moment parfait"],
  activity: ["café", "livre", "balade", "sport", "cuisine", "musique", "film"],
  benefit: ["se détendre", "réfléchir", "se ressourcer", "décompresser", "inspirer"],
  discovery: ["ce café", "ce livre", "cet endroit", "cette série", "ce restaurant"],
  weather_comment: ["Quel beau soleil !", "Temps parfait aujourd'hui !", "Belle journée !"],
  emotion: ["parfait", "magique", "génial", "formidable", "extraordinaire"],
  people: ["ma famille", "mes amis", "mes proches", "l'équipe"],
  gratitude: ["Grateful", "Reconnaissant(e)", "Que du bonheur", "So lucky"],
  achievement: ["étape franchie", "objectif atteint", "projet terminé", "défi relevé"],
  reflection: ["Fier(e) du chemin parcouru", "Next step loading", "L'aventure continue"],
  question: ["Quel est votre endroit préféré ?", "Vos recommandations lecture ?", "Film du moment ?"],
  inspiration: ["'La vie sourit aux audacieux'", "'Croire en soi'", "'Chaque jour est un nouveau départ'"],
  sharing: ["Petite photo", "Moment capturé", "Image du jour", "Souvenir"],
  weekend_activity: ["détente totale", "sortie nature", "temps famille", "projets perso"]
};

const COMMENT_TEMPLATES = [
  "Magnifique ! 😍", "J'adore ! ❤️", "Superbe photo !", "Trop cool ! 👏",
  "Merci pour le partage 🙏", "Inspirant ! ✨", "Génial ! 🔥", "Belle découverte !",
  "Top ! 👌", "Parfait ! 💯", "Wahou ! 😮", "Excellent ! 👍",
  "Merci pour l'info !", "Intéressant ! 🤔", "Bien vu ! 💡", "Exactement ! ✅"
];

const MESSAGE_PHRASES = [
  "Salut ! Comment ça va ?", "Hey ! Tu fais quoi de beau ?", "Coucou ! Des nouvelles ?",
  "Hello ! Ça roule ?", "Salut ! J'espère que tu vas bien 😊", "Hey ! Tu as passé un bon weekend ?",
  "Merci pour ton dernier post, j'ai adoré !", "Tu m'as donné envie avec ta photo !",
  "On se fait un café bientôt ?", "Dis-moi, tu connais un bon {place} ?",
  "J'ai pensé à toi en voyant ça 😊", "Tu as des nouvelles de {mutual_friend} ?",
  "Super ta story ! Où c'était ?", "Haha ton post m'a fait rire ! 😂",
  "Bon courage pour {activity} !", "Alors, ce {event} ? Ça s'est bien passé ?",
  "Merci pour le conseil ! 🙏", "Tu avais raison pour {subject} !",
  "Passe une excellente journée ! ☀️", "À bientôt j'espère ! 😊"
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

function generateRealisticPost() {
  const template = randomItem(POST_TEMPLATES);
  let post = template;
  
  // Remplacer les variables dans le template
  Object.keys(POST_VARIABLES).forEach(key => {
    if (post.includes(`{${key}}`)) {
      post = post.replace(`{${key}}`, randomItem(POST_VARIABLES[key]));
    }
  });
  
  return post;
}

function generateRealisticBio() {
  const template = randomItem(BIO_TEMPLATES);
  return template
    .replace('{hobby}', randomItem(HOBBIES))
    .replace('{profession}', randomItem(PROFESSIONS))
    .replace('{location}', randomItem(LOCATIONS))
    .replace('{motto}', randomItem(MOTTOS));
}

function generateUsername(firstName, lastName) {
  const variations = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 10)}`
  ];
  return randomItem(variations);
}

function generateRealisticMessage(fromUser, toUser) {
  let message = randomItem(MESSAGE_PHRASES);
  
  // Remplacer les variables si présentes
  if (message.includes('{place}')) {
    const places = ['restaurant', 'café', 'bar', 'endroit'];
    message = message.replace('{place}', randomItem(places));
  }
  if (message.includes('{activity}')) {
    message = message.replace('{activity}', randomItem(['le projet', 'le boulot', 'l\'exam', 'la présentation']));
  }
  if (message.includes('{event}')) {
    message = message.replace('{event}', randomItem(['rendez-vous', 'entretien', 'événement', 'meeting']));
  }
  if (message.includes('{subject}')) {
    message = message.replace('{subject}', randomItem(['le restaurant', 'le film', 'le livre', 'l\'endroit']));
  }
  if (message.includes('{mutual_friend}')) {
    message = message.replace('{mutual_friend}', randomItem(FIRST_NAMES));
  }
  
  return message;
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  // Génération des rôles
  const roles = [
    {
      "_id": ROLE_ADMIN,
      "name": "Admin",
      "permissions": {
        "/roles": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/users": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/posts": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/comments": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/follows": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/auth": {
          "POST": true
        }
      }
    },
    {
      "_id": ROLE_USER,
      "name": "User",
      "permissions": {
        "/roles": {
          "GET": false,
          "POST": false,
          "PUT": false,
          "DELETE": false
        },
        "/users": {
          "GET": true,
          "POST": false,
          "PUT": true,
          "DELETE": false
        },
        "/posts": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/comments": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true
        },
        "/follows": {
          "GET": true,
          "POST": true,
          "PUT": false,
          "DELETE": true
        },
        "/auth": {
          "POST": true
        }
      }
    },
    {
      "_id": ROLE_GUEST,
      "name": "Guest",
      "permissions": {
        "/roles": {
          "GET": false,
          "POST": false,
          "PUT": false,
          "DELETE": false
        },
        "/users": {
          "GET": false,
          "POST": true,
          "PUT": false,
          "DELETE": false
        },
        "/posts": {
          "GET": true,
          "POST": false,
          "PUT": false,
          "DELETE": false
        },
        "/comments": {
          "GET": true,
          "POST": false,
          "PUT": false,
          "DELETE": false
        },
        "/follows": {
          "GET": false,
          "POST": false,
          "DELETE": false
        },
        "/auth": {
          "POST": true
        }
      }
    }
  ];

  await db.collection("roles").deleteMany({});
  await db.collection("roles").insertMany(roles);
  console.log(`${roles.length} rôles insérés.`);

  // Génération des utilisateurs
  let users = [];
  
  // Créer un utilisateur admin
  users.push({
    username: "admin",
    email: "admin@breezy.com",
    password: "$2b$10$RBtjASMjXSNVo6ihgpEWg.gg/zX57UsF2a4B2TLezTL9FOi/JbdQu", // password: "password"
    avatar: randomItem(AVATAR_URLS),
    bio: "Administrateur de Breezy",
    role_id: ROLE_ADMIN,
    isVerified: true,
    verificationToken: null,
    verificationTokenExpires: null,
    createdAt: now,
    updatedAt: now
  });

  // Créer les utilisateurs normaux
  for (let i = 0; i < USERS_COUNT; i++) {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);
    const username = generateUsername(firstName, lastName);
    const email = `${username.replace(/\./g, '')}@example.com`;
    const bio = generateRealisticBio();
    const createdAt = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000); // Créé dans la dernière année
    
    users.push({
      username,
      email,
      password: "$2b$10$RBtjASMjXSNVo6ihgpEWg.gg/zX57UsF2a4B2TLezTL9FOi/JbdQu",
      avatar: randomItem(AVATAR_URLS),
      bio,
      role_id: ROLE_USER,
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
      createdAt,
      updatedAt: createdAt
    });
  }
  await db.collection("users").deleteMany({});
  const userInsertRes = await db.collection("users").insertMany(users);
  const userIds = Object.values(userInsertRes.insertedIds);
  console.log(`${userIds.length} utilisateurs insérés (dont 1 admin).`);

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
  userIds.forEach((uid, userIndex) => {
    const user = users[userIndex];
    const userCreatedAt = user.createdAt;
    
    for (let j = 0; j < POSTS_PER_USER; j++) {
      const others = userIds.filter(u => !u.equals(uid)).sort(() => Math.random() - 0.5);
      const likesCount = Math.floor(Math.random() * 15); // Plus de variété dans les likes
      const likes = others.slice(0, likesCount);
      
      // Date du post entre la création du compte et maintenant
      const postDate = new Date(
        userCreatedAt.getTime() + 
        Math.random() * (now.getTime() - userCreatedAt.getTime())
      );
      
      const content = generateRealisticPost();
      const hasImage = Math.random() < 0.4; // 40% des posts ont une image
      
      posts.push({
        author: uid,
        content,
        image: hasImage ? randomItem(AVATAR_URLS) : null,
        likes,
        createdAt: postDate,
        updatedAt: postDate
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
    const shuffledPosts = [...allPostIds].sort(() => Math.random() - 0.5);
    const commentsCount = Math.floor(Math.random() * COMMENTS_PER_USER) + 5; // Au moins 5 commentaires
    
    for (let j = 0; j < Math.min(commentsCount, shuffledPosts.length); j++) {
      const postId = shuffledPosts[j];
      const content = randomItem(COMMENT_TEMPLATES);
      
      // Date du commentaire après la création du post
      const post = posts.find(p => p._id && p._id.equals && p._id.equals(postId));
      const postDate = post ? post.createdAt : now;
      const commentDate = new Date(
        postDate.getTime() + 
        Math.random() * (now.getTime() - postDate.getTime())
      );
      
      comments.push({
        author: uid,
        post: postId,
        content,
        createdAt: commentDate,
        updatedAt: commentDate
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
  
  // Récupérer les relations de follow pour des messages plus cohérents
  const followRelations = await db.collection("follows").find({}).toArray();
  const followersMap = new Map();
  
  followRelations.forEach(follow => {
    if (!followersMap.has(follow.follower.toString())) {
      followersMap.set(follow.follower.toString(), []);
    }
    followersMap.get(follow.follower.toString()).push(follow.following);
  });
  
  userIds.forEach((fromId, fromIndex) => {
    const fromUser = users[fromIndex];
    const followers = followersMap.get(fromId.toString()) || [];
    
    // Messages principalement avec les personnes qu'on suit
    const possibleRecipients = followers.length > 0 ? 
      [...followers, ...userIds.filter(u => !u.equals(fromId)).slice(0, 3)] : 
      userIds.filter(u => !u.equals(fromId));
    
    const nbMessages = 5 + Math.floor(Math.random() * 8); // Entre 5 et 12 messages
    
    for (let i = 0; i < nbMessages && i < possibleRecipients.length; i++) {
      const toId = possibleRecipients[i];
      const toIndex = userIds.findIndex(u => u.equals(toId));
      const toUser = users[toIndex];
      
      const content = generateRealisticMessage(fromUser, toUser);
      const createdAt = randomDateInLast30Days();

      // 25% des messages ont des images
      let images = [];
      if (Math.random() < 0.25) {
        const nbImages = 1 + Math.floor(Math.random() * 2); // 1 ou 2 images
        images = Array.from({ length: nbImages }, () => randomItem(MESSAGE_IMAGE_URLS));
      }

      // 5% des messages ont une vidéo
      let videos = [];
      if (Math.random() < 0.05) {
        videos = ["sample-video.mp4"];
      }

      messages.push({
        from: fromId,
        to: toId,
        content,
        createdAt,
        updatedAt: createdAt,
        read: Math.random() < 0.8, // 80% des messages sont lus
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