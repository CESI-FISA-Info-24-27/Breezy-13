import request from 'supertest';
import Jwt from 'jsonwebtoken';
import app from './server.js';

<<<<<<< HEAD
<<<<<<< HEAD
const PORT = 10000; // Port différent de celui de prod pour éviter les conflits

=======
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
const PORT = 10000; // Port différent de celui de prod pour éviter les conflits

>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
// Récupération du secret JWT
const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

// Génération des tokens pour les tests
const validToken = Jwt.sign({ userId: 123, username: 'testuser' }, JWT_SECRET, { expiresIn: '1h' });
const invalidToken = 'invalid.token.here';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
// On ouvre le server
let server;

beforeAll(() => {
  server = app.listen(PORT);
});
afterAll((done) => {
  server.close(done);
});
<<<<<<< HEAD
=======
// Fermer le serveur après tous les tests si app.close() est exposé (sinon, retirer cette section)
if (typeof app.close === 'function') {
  afterAll((done) => {
    app.close(done);
  });
}
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)

describe('File Upload API', () => {
  describe('Authentication Middleware', () => {
    test('should reject request without token', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server).post('/upload');
=======
      const res = await request(app).post('/upload');
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server).post('/upload');
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Accès non autorisé. Token manquant.');
    });

    test('should reject request with invalid token', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server)
=======
      const res = await request(app)
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server)
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
        .post('/upload')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Token invalide.');
    });
  });

  describe('Single File Upload', () => {
    test('should upload a valid file successfully', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server)
=======
      const res = await request(app)
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server)
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
        .post('/upload')
        .set('Authorization', `Bearer ${validToken}`)
        .attach('file', Buffer.from('test file content'), 'test.jpg');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Fichier téléchargé avec succès.');
      expect(res.body.filePath).toMatch(/^\/uploads\/.+\.jpg$/);
    });
  });

  describe('Multiple Files Upload', () => {
    test('should upload multiple valid files successfully', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server)
=======
      const res = await request(app)
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server)
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
        .post('/upload-multiple')
        .set('Authorization', `Bearer ${validToken}`)
        .attach('files', Buffer.from('file 1 content'), 'file1.jpg')
        .attach('files', Buffer.from('file 2 content'), 'file2.mp4');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Fichiers téléchargés avec succès.');
      expect(res.body.filePaths.length).toBe(2);
      expect(res.body.filePaths[0]).toMatch(/^\/uploads\/.+\.(jpg|mp4)$/);
    });

    test('should reject if more than 5 files are uploaded', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const req = request(server).post('/upload-multiple').set('Authorization', `Bearer ${validToken}`);
=======
      const req = request(app).post('/upload-multiple').set('Authorization', `Bearer ${validToken}`);
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const req = request(server).post('/upload-multiple').set('Authorization', `Bearer ${validToken}`);
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)

      for (let i = 1; i <= 6; i++) {
        req.attach('files', Buffer.from(`file ${i} content`), `file${i}.jpg`);
      }

      const res = await req;
      expect(res.status).toBe(500);
    });
  });

  describe('Get File Endpoint', () => {
    test('should return 404 if file does not exist', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server)
=======
      const res = await request(app)
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server)
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
        .get('/files/nonexistentfile.jpg')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Fichier non trouvé.');
    });
  });

  describe('Static File Serving with Authentication', () => {
    test('should deny access without token', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await request(server).get('/uploads/somefile.jpg');
=======
      const res = await request(app).get('/uploads/somefile.jpg');
>>>>>>> efa4989 (feat : Test unitaire fonctionnel sur le serveur de fichier + mise en place d'un github action pour lancer les tests automatiquements #39 #40)
=======
      const res = await request(server).get('/uploads/somefile.jpg');
>>>>>>> 40b0c8e (feat : réglage tests unitaires sur le serveur de fichier #39 #40)
      expect(res.status).toBe(401);
    });
  });
});