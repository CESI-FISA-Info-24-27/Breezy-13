const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/breezy_bdd';

export function connectDB()
{
    mongoose.connect(MONGO_URI)
            .then(() => console.log("MongoDB connecté !"))
            .catch(err => console.error('Erreur connexion MongoDB :', err));
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:   { type: String },
  bio:      { type: String },
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);