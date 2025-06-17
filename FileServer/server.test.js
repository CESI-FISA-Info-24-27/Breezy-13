import request from 'supertest';
import Jwt from 'jsonwebtoken';
import app from './server.js';

// Récupération du secret JWT
const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

// Génération des tokens pour les tests
const validToken = Jwt.sign({ userId: 123, username: 'testuser' }, JWT_SECRET, { expiresIn: '1h' });
const invalidToken = 'invalid.token.here';

// Fermer le serveur après tous les tests si app.close() est exposé (sinon, retirer cette section)
if (typeof app.close === 'function') {
  afterAll((done) => {
    app.close(done);
  });
}

describe('File Upload API', () => {
  describe('Authentication Middleware', () => {
    test('should reject request without token', async () => {
      const res = await request(app).post('/upload');
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Accès non autorisé. Token manquant.');
    });

    test('should reject request with invalid token', async () => {
      const res = await request(app)
        .post('/upload')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Token invalide.');
    });
  });

  describe('Single File Upload', () => {
    test('should upload a valid file successfully', async () => {
      const res = await request(app)
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
      const res = await request(app)
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
      const req = request(app).post('/upload-multiple').set('Authorization', `Bearer ${validToken}`);

      for (let i = 1; i <= 6; i++) {
        req.attach('files', Buffer.from(`file ${i} content`), `file${i}.jpg`);
      }

      const res = await req;
      expect(res.status).toBe(500);
    });
  });

  describe('Get File Endpoint', () => {
    test('should return 404 if file does not exist', async () => {
      const res = await request(app)
        .get('/files/nonexistentfile.jpg')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Fichier non trouvé.');
    });
  });

  describe('Static File Serving with Authentication', () => {
    test('should deny access without token', async () => {
      const res = await request(app).get('/uploads/somefile.jpg');
      expect(res.status).toBe(401);
    });
  });
});