"use client";

import Link from "next/link";
import Image from "next/image";
<<<<<<< HEAD
<<<<<<< Updated upstream
import { useState } from "react";
=======
=======
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
<<<<<<< HEAD
import { createUser, updateUser } from "../../services/UsersServices";
import { login } from "../../services/AuthServices";
>>>>>>> Stashed changes

export default function Register() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { createUser, updateUser } from "../../services/usersServices";
import { login } from "../../services/authService";

export default function Register() {
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
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
<<<<<<< HEAD
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
=======
  const [avatarPreview, setAvatarPreview] = useState(
    "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EThumbs%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EDiceBear%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fwww.dicebear.com%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3E%E2%80%9EThumbs%E2%80%9D%20(https%3A%2F%2Fwww.dicebear.com)%20by%20%E2%80%9EDiceBear%E2%80%9D%2C%20licensed%20under%20%E2%80%9ECC0%201.0%E2%80%9D%20(https%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Crect%20fill%3D%22%2369d2e7%22%20width%3D%22100%22%20height%3D%22100%22%20x%3D%220%22%20y%3D%220%22%20%2F%3E%3Cg%20transform%3D%22translate(-5%2C%204)%20rotate(-5%2050%2070)%22%3E%3Cpath%20d%3D%22M95%2053.33C95%2029.4%2074.85%2010%2050%2010S5%2029.4%205%2053.33V140h90V53.33Z%22%20fill%3D%22%23f1f4dc%22%2F%3E%3Cg%20transform%3D%22translate(29%2033)%22%3E%3Cg%20transform%3D%22translate(15%2C%20-3)%20rotate(18%2021%2021)%22%3E%3Cg%20transform%3D%22translate(0%205)%22%3E%3Cpath%20d%3D%22M14%208c0%203.31-1.34%206-3%206s-3-2.69-3-6%201.34-6%203-6%203%202.69%203%206ZM34%208c0%203.31-1.34%206-3%206s-3-2.69-3-6%201.34-6%203-6%203%202.69%203%206Z%22%20fill%3D%22%23000000%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(6%2023)%22%3E%3Cpath%20d%3D%22M15.5%2010c-5.07%200-9.3-5.23-8.37-5.88.93-.65%203.45%202.15%208.37%202.15%204.92%200%207.44-2.88%208.37-2.15.93.73-3.3%205.88-8.37%205.88Z%22%20fill%3D%22%23000000%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
  );
  const [avatarError, setAvatarError] = useState("");
=======
>>>>>>> ae7a5a9 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
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
<<<<<<< HEAD
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
=======
  const [errorMsg, setErrorMsg] = useState("");
>>>>>>> ae7a5a9 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
=======


  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  // Utilise la variable d'environnement pour l'URL du serveur de fichiers
  const FILE_SERVER_URL = process.env.NEXT_PUBLIC_FILE_SERVER_URL;

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      setAvatarFile(file);
=======
      const validTypes = ["image/png", "image/jpeg", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5 Mo
      if (!validTypes.includes(file.type)) {
        setAvatarError("Seuls les fichiers PNG, JPEG ou GIF sont autorisés.");
        return;
      }
      if (file.size > maxSize) {
        setAvatarError("L'image ne doit pas dépasser 5 Mo.");
        return;
      }
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
=======
      setAvatarFile(file);
>>>>>>> ae7a5a9 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
=======
      setAvatarFile(file);
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  async function uploadAvatar() {
    if (!avatarFile) return "";
    const formData = new FormData();
    formData.append("file", avatarFile);

    const token = Cookies.get("token") || localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers,
    });
    if (!res.ok) throw new Error("Erreur upload avatar");
    const data = await res.json();
    return data.path; // ex: "http://localhost:5000/files/1749865024759-123915179.png"
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  const handleRegister = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    // Validation des mots de passe
    if (!form.password || form.password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
=======
    if (!form.password || form.password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
=======
    if (!form.password || form.password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
>>>>>>> ae7a5a9 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
=======
    if (!form.password || form.password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
      return;
    }
    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    setPasswordError("");

    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      // Création de l'utilisateur avec avatar par défaut
=======
      // 1. Création du compte avec avatar par défaut
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
      await createUser({
        username: form.username,
        password: form.password,
        email: form.email,
        avatar: "/default-avatar.png",
        bio: form.bio,
      });

<<<<<<< HEAD
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
=======
      const res = await axios.post("/api/users", {
=======
      // 1. Création du compte avec avatar par défaut
      await createUser({
>>>>>>> ae7a5a9 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
        username: form.username,
        password: form.password,
        email: form.email,
        avatar: "/default-avatar.png",
        bio: form.bio,
      });

=======
>>>>>>> 471b8f8 (feat: Ajout de l'avatar sur un profil utilisateur (pas fini))
      // 2. Connexion automatique après inscription
      const loginRes = await login(form.email, form.password, true);
      const token = loginRes.token;
      Cookies.set("token", token, { path: "/" });

      // Vérifie la structure de loginRes pour récupérer l'id utilisateur
      const userId =
        loginRes.user?._id ||
        loginRes.user?.id ||
        loginRes.id ||
        loginRes.userId;

      if (!userId) {
        throw new Error("Impossible de récupérer l'identifiant utilisateur après connexion.");
      }

      // 3. Upload de l'avatar si un fichier a été sélectionné
      let avatarPath = "/default-avatar.png";
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const uploadRes = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!uploadRes.ok) throw new Error("Erreur upload avatar");
        const uploadData = await uploadRes.json();
        avatarPath = uploadData.path;

        // 4. Mise à jour du profil utilisateur avec le nouvel avatar
        await updateUser(userId, { avatar: avatarPath });
      }

      setSuccessMsg("Compte créé avec succès ! Redirection vers la connexion...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert("Erreur : " + error.response.data.error);
      } else {
        alert("Erreur lors de la création de l'utilisateur");
      }
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
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
<<<<<<< HEAD
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
=======
              onChange={e => setPassword(e.target.value)}
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
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
<<<<<<< HEAD
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
=======
              onChange={e => setConfirmPassword(e.target.value)}
>>>>>>> e896908 (feat: Fonctionnement de la page de register)
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