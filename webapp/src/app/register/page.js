"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createUser, updateUser, getUsers } from "../../services/usersServices";
import { login } from "../../services/authServices";
import { uploadFile } from "../../services/fileServerServices";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    avatar: "",
    bio: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  const [avatarError, setAvatarError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  // Utilise la variable d'environnement pour l'URL du serveur de fichiers
  const FILE_SERVER_URL = process.env.NEXT_PUBLIC_FILE_SERVER_URL;

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation des mots de passe
    if (!form.password || form.password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    setPasswordError("");

    try {
      // Création de l'utilisateur avec avatar par défaut
      await createUser({
        username: form.username,
        password: form.password,
        email: form.email,
        avatar: "/default-avatar.png",
        bio: form.bio,
      });

      // Connexion automatique
      const { token } = await login(form.email, form.password, true);
      Cookies.set("token", token, { path: "/" });

      // Récupération de l'utilisateur créé (filtre par email pour être sûr)
      const users = await getUsers({ email: form.email });
      const user = Array.isArray(users) ? users[0] : users;
      if (!user) throw new Error("Utilisateur non trouvé après inscription.");

      // Upload de l'avatar si sélectionné
      let avatarPath = "/default-avatar.png";
      if (avatarFile) {
        const uploadData = await uploadFile(avatarFile);
        // On récupère le chemin complet depuis l'API, puis on le transforme en URL utilisable
        if (uploadData?.filePath || uploadData?.path) {
          // On gère les deux cas selon la réponse de l'API
          const fileName = (uploadData.filePath || uploadData.path).split("/").pop();
          avatarPath = `${FILE_SERVER_URL}/files/${fileName}`;
        }
      }

      // Mise à jour du profil utilisateur avec le nouvel avatar
      await updateUser(user._id, {
        username: user.username,
        email: user.email,
        password: user.password,
        avatar: avatarPath,
        bio: form.bio,
        role_id: user.role_id
      });

      setSuccessMsg("Compte créé avec succès ! Redirection vers la connexion...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Erreur lors de la création de l'utilisateur";
      alert("Erreur : " + msg);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celestial-blue via-sea-green to-folly animate-fade-in">
      <div className="w-full max-w-md bg-seasalt/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 mb-2">
          <Image
            className="w-16 rounded-full shadow-lg object-cover"
            src="/logo.png"
            alt="logo"
            width={64}
            height={64}
            priority
          />
          <span className="text-3xl font-extrabold text-celestial-blue font-sans tracking-tight drop-shadow">
            TwiX
          </span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-rich-black text-center animate-slide-down">
          Créez votre compte
        </h1>
        {successMsg && (
          <div className="mt-4 text-green-600 text-center animate-pulse">
            {successMsg}
          </div>
        )}
        <form className="w-full flex flex-col gap-5 animate-fade-in-slow" onSubmit={handleRegister} onChange={handleChange}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-rich-black">
              Nom d&apos;utilisateur <span className="text-folly">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
              placeholder="Votre pseudo unique"
              required
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              minLength={3}
              maxLength={32}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-rich-black">
              Email <span className="text-folly">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
              placeholder="nom@entreprise.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-rich-black">
              Mot de passe <span className="text-folly">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
              placeholder="••••••••"
              required
              minLength={8}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$"
              title="Au moins 8 caractères, dont une lettre et un chiffre"
              autoComplete="new-password"
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
            <p className="text-xs text-rich-black/60 mt-1">
              Au moins 8 caractères, une lettre et un chiffre.
            </p>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-rich-black">
              Confirmer le mot de passe <span className="text-folly">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
              placeholder="Répétez le mot de passe"
              required
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
            />
            {passwordError && (
              <p className="text-xs text-folly mt-1">{passwordError}</p>
            )}
          </div>
          <div>
            <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-rich-black">
              Avatar <span className="text-folly">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={avatarPreview}
                  alt="Aperçu avatar"
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-4 border-sea-green shadow-lg w-16 h-16 bg-seasalt"
                />
              </div>
              <label className="cursor-pointer inline-block px-4 py-2 bg-sea-green text-seasalt rounded-lg font-semibold shadow hover:bg-folly transition">
                Choisir une image
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png,image/jpeg,image/gif"
                  className="hidden"
                  value={form.avatar}
                  required
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            {avatarError && (
              <p className="text-xs text-folly mt-1">{avatarError}</p>
            )}
            <p className="text-xs text-rich-black/60 mt-1">
              PNG, JPEG ou GIF. 5 Mo max.
            </p>
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 text-sm font-medium text-rich-black">
              Bio <span className="text-rich-black/50">(facultatif)</span>
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={2}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none resize-none"
              placeholder="Parlez-nous un peu de vous..."
              maxLength={200}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-folly text-seasalt font-semibold text-lg shadow-md hover:bg-sea-green hover:text-seasalt transition-all duration-200 focus:ring-4 focus:ring-folly/40"
          >
            S&apos;inscrire
          </button>
          <p className="text-center text-sm text-rich-black/70">
            Déjà un compte ?{" "}
            <Link href="/login" className="font-bold text-folly hover:underline transition">
              Connectez-vous
            </Link>
          </p>
        </form>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-down {
          animation: slide-down 0.8s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </section>
  );
}