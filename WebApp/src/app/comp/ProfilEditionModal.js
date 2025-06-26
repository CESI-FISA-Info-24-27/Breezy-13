"use client";

import { useState, useEffect } from "react";
import { updateUser } from "../../services/UsersServices";
import SecureMedia from "./SecureMedia";

export default function ProfilEditionModal({
  isOpen,
  onClose,
  user,
  onUserUpdated = () => {},
}) {
  /* états */
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");

  const [avatarFile, setAvatarFile] = useState(null); // File choisi
  const [avatarURL, setAvatarURL] = useState("");     // pour l’aperçu

  const [initialUser, setInitialUser] = useState({
    username: "", mail: "", description: "", avatar: "",
  });

  /* bloque le scroll lorsque la modal est ouverte */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  /* recharge les valeurs au moment de l’ouverture */
  useEffect(() => {
    if (!isOpen) return;

    const { username = "", email = "", bio = "", avatar = "" } = user ?? {};
    setUsername(username);
    setMail(email);
    setDescription(bio);
    setAvatarFile(null);
    setAvatarURL(avatar);

    setInitialUser({ username, mail: email, description: bio, avatar });
  }, [isOpen, user]);

  /* helpers */
  const isEmailValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isModified =
    username !== initialUser.username ||
    mail !== initialUser.mail ||
    description !== initialUser.description ||
    avatarFile !== null;

  /* submit */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isModified) { onClose(); return; }
    if (!isEmailValid(mail)) { alert("Email invalide"); return; }

    try {
      let payload;
      if (avatarFile) {
        payload = new FormData();
        payload.append("avatar", avatarFile);
        payload.append("username", username);
        payload.append("email", mail);
        payload.append("bio", description);
        payload.append("role_id", user.role_id);
      } else {
        payload = {
          username,
          email: mail,
          bio: description,
          avatar: user.avatar,      // inchangé
          role_id: user.role_id,
        };
      }

      const updatedUser = await updateUser(user._id, payload);
      onUserUpdated(updatedUser);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour.");
    }
  }

  if (!isOpen) return null;

  /* rendu */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mx-4 sm:mx-0 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base sm:text-xl font-bold mb-4 text-celestial-blue">
          Éditer le profil
        </h2>
        <hr className="w-49/50 mx-auto h-0.5 border-0 bg-rich-black my-5 rounded" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* avatar */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  setAvatarURL(URL.createObjectURL(file));
                }
              }}
            />
            {avatarURL && (
              <div className="mt-3 flex justify-center">
                <SecureMedia
                  fileName={avatarURL}
                  type="image"
                  alt="aperçu avatar"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            )}
          </div>

          {/* username */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">
              Nom d'utilisateur
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>

          {/* bio */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* boutons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-rich-black hover:bg-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-folly text-seasalt font-semibold hover:bg-sea-green"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}