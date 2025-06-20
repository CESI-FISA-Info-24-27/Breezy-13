"use client";

import { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi";

export default function ProfilEditionModal({ isOpen, onClose, user }) {
  const [username, setUsername] = useState(user?.username || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [description, setDescription] = useState(user?.description || "");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUsername(user?.username || "");
      setMail(user?.mail || "");
      setDescription(user?.description || "");
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mx-4 sm:mx-0 relative animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base sm:text-xl font-bold mb-4 text-celestial-blue">Éditer le profil</h2>
<<<<<<< HEAD
<<<<<<< HEAD
        <hr className="w-49/50 mx-auto h-0.5 border-0 bg-rich-black my-5 rounded" />
=======
        <hr className="w-25/26 mx-auto h-0.5 border-0 bg-rich-black my-5 rounded" />
>>>>>>> d77b3f2 (Modal de modif et modif affichage horodatage post)
=======
        <hr className="w-49/50 mx-auto h-0.5 border-0 bg-rich-black my-5 rounded" />
>>>>>>> 4d53bdc (Modif taille hr dans modale edition profil)
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">Nom d'utilisateur</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-celestial-blue-dark">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
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