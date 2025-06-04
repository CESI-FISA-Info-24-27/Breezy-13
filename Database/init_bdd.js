import { MongoClient } from 'mongodb';

async function initDatabase() {
    const uri = 'mongodb://localhost:27017'; // Exemple pour une base locale
    const dbName = 'breezy_bdd'; // Nom de la base de données

    const client = new MongoClient(uri);

    try {
        console.log('Tentative de connexion à MongoDB...');
        await client.connect();
        console.log('Connexion réussie !');

        const db = client.db(dbName);

        // Initialisation des collections avec des exemples de données
        console.log('Initialisation des collections...');

        // Collection "roles" avec permissions
        const roles = [
            {
                role_id: 1,
                name: 'Administrator',
                permissions: 'all' // L'administrateur a tous les droits
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
                    '/auth': { POST: true },
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
                    '/auth': { POST: true },
                }
            }
        ];
        await db.collection('roles').insertMany(roles);

        // Collection "users"
        const users = [
            {
                username: 'admin',
                email: 'admin@example.com',
                password: 'choucroute', // Remplacez par un mot de passe hashé
                avatar: 'https://example.com/avatar1.png',
                bio: 'Admin user',
                role_id: 1, // Ajout du rôle Administrator
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'user1',
                email: 'user1@example.com',
                password: 'choucroute', // Remplacez par un mot de passe hashé
                avatar: 'https://example.com/avatar2.png',
                bio: 'First user',
                role_id: 2, // Ajout du rôle User
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        await db.collection('users').insertMany(users);

        // Collection "comments"
        const comments = [
            { author: 'user1', post: 'post1', content: 'Great post!', createdAt: new Date() },
            { author: 'user1', post: 'post2', content: 'Interesting read.', createdAt: new Date() }
        ];
        await db.collection('comments').insertMany(comments);

        // Collection "follows"
        const follows = [
            { follower: 'user1', following: 'admin', createdAt: new Date() },
            { follower: 'admin', following: 'user1', createdAt: new Date() }
        ];
        await db.collection('follows').insertMany(follows);

        // Collection "posts"
        const posts = [
            { author: 'admin', content: 'Welcome to Breezy!', image: 'https://example.com/image1.png', likes: ['user1'], createdAt: new Date(), updatedAt: new Date() },
            { author: 'user1', content: 'Hello everyone!', image: 'https://example.com/image2.png', likes: ['admin'], createdAt: new Date(), updatedAt: new Date() }
        ];
        await db.collection('posts').insertMany(posts);

        // Collection "revokedTokens"
        const revokedTokens = [
            { token: 'exampleRevokedToken1', reason: 'User logged out', revokedAt: new Date() },
            { token: 'exampleRevokedToken2', reason: 'Security issue', revokedAt: new Date() }
        ];
        await db.collection('revokedTokens').insertMany(revokedTokens);

        console.log('Base de données initialisée avec succès !');

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error);
    } finally {
        await client.close();
        console.log('Connexion fermée.');
    }
}

initDatabase();