import crypto from 'crypto';
import nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

/**
 * Service pour la vérification d'utilisateurs
 * @class VerificationServices
 */
class VerificationServices {
    /**
     * Génère un token de vérification unique
     * @returns {string} - Token de vérification
     */
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Génère une date d'expiration pour le token (24 heures)
     * @returns {Date} - Date d'expiration
     */
    generateTokenExpiration() {
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        return expiration;
    }

    /**
     * Envoie un email de vérification
     * @param {string} email - Email du destinataire
     * @param {string} token - Token de vérification
     * @param {string} username - Nom d'utilisateur
     */
    async sendVerificationEmail(email, token, username) {
        console.log('📧 Tentative d\'envoi d\'email de vérification...');
        console.log('Destinataire:', email);
        console.log('Token:', token);
        console.log('SMTP Config:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER
        });

        // Configuration du transporteur email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify?token=${token}`;

        console.log('URL de vérification:', verificationUrl);

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: 'Vérification de votre compte TwiX',
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <h1 style="color: #2D5AA0;">Bienvenue sur TwiX, ${username} !</h1>
                    <p>Merci de vous être inscrit sur notre plateforme. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #FF6B6B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                            Vérifier mon compte
                        </a>
                    </div>
                    <p>Ce lien expirera dans 24 heures.</p>
                    <p>Si vous n'avez pas créé de compte, ignorez ce message.</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        TwiX - Votre réseau social de confiance
                    </p>
                </div>
            `
        };

        try {
            console.log('📤 Envoi de l\'email en cours...');
            const info = await transporter.sendMail(mailOptions);
            console.log('✅ Email de vérification envoyé avec succès !');
            console.log('Message ID:', info.messageId);
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
            console.error('Détails de l\'erreur:', error.message);
            throw new Error('Erreur lors de l\'envoi de l\'email de vérification: ' + error.message);
        }
    }

    /**
     * Génère un token temporaire pour l'upload d'avatar
     * @param {string} userId - ID de l'utilisateur
     * @returns {string} - Token temporaire
     */
    generateTempUploadToken(userId) {
        const payload = {
            userId,
            type: 'temp_upload',
            exp: Math.floor(Date.now() / 1000) + (60 * 30) // 30 minutes
        };
        
        return crypto.createHmac('sha256', process.env.JWT_SECRET)
            .update(JSON.stringify(payload))
            .digest('hex');
    }

    /**
     * Vérifie un token temporaire d'upload
     * @param {string} token - Token à vérifier
     * @param {string} userId - ID de l'utilisateur
     * @returns {boolean} - True si valide
     */
    verifyTempUploadToken(token, userId) {
        try {
            const payload = {
                userId,
                type: 'temp_upload',
                exp: Math.floor(Date.now() / 1000) + (60 * 30)
            };
            
            const expectedToken = crypto.createHmac('sha256', process.env.JWT_SECRET)
                .update(JSON.stringify(payload))
                .digest('hex');
            
            // Vérification approximative (dans une vraie app, stockez l'heure de création)
            return token === expectedToken || this.isTokenStillValid(token, userId);
        } catch (error) {
            return false;
        }
    }

    /**
     * Vérifie si un token est encore valide (approximatif)
     * @param {string} token - Token à vérifier
     * @param {string} userId - ID de l'utilisateur
     * @returns {boolean} - True si potentiellement valide
     */
    isTokenStillValid(token, userId) {
        // Vérification approximative pour les 30 dernières minutes
        for (let i = 0; i < 30; i++) {
            const testTime = Math.floor(Date.now() / 1000) - (60 * i);
            const payload = {
                userId,
                type: 'temp_upload',
                exp: testTime + (60 * 30)
            };
            
            const testToken = crypto.createHmac('sha256', process.env.JWT_SECRET)
                .update(JSON.stringify(payload))
                .digest('hex');
                
            if (token === testToken && testTime + (60 * 30) > Math.floor(Date.now() / 1000)) {
                return true;
            }
        }
        return false;
    }
}

export default new VerificationServices();
