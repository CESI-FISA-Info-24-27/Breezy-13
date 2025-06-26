"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../services/UsersServices";

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
  const [avatarError, setAvatarError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (5 Mo max)
      if (file.size > 5 * 1024 * 1024) {
        setAvatarError("Le fichier est trop volumineux. Limite : 5 Mo.");
        return;
      }
      
      // Vérifier le type de fichier
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setAvatarError("Type de fichier non autorisé. Utilisez PNG, JPEG ou GIF.");
        return;
      }
      
      setAvatarError(""); // Nettoyer les erreurs
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
      // 1. Création de l'utilisateur avec avatar par défaut
      const createResult = await createUser({
        username: form.username,
        password: form.password,
        email: form.email,
        avatar: "/default-avatar.png",
        bio: form.bio,
      });

      console.log("Utilisateur créé:", createResult);
      const user = createResult.user;

      // 2. Upload de l'avatar si sélectionné
      if (avatarFile && user.tempUploadToken) {
        try {
          console.log("Upload de l'avatar en cours...");
          const formData = new FormData();
          formData.append("file", avatarFile);

          const uploadRes = await fetch("http://localhost:5000/upload-avatar-registration", {
            method: "POST",
            headers: {
              'X-Temp-Token': user.tempUploadToken,
              'X-User-Id': user.id
            },
            body: formData
          });

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            console.log("Avatar uploadé et mis à jour:", uploadData);
            setAvatarError(""); // Nettoyer les erreurs précédentes
          } else {
            const errorText = await uploadRes.text();
            console.error("Erreur upload:", errorText);
            setAvatarError("Erreur lors de l'upload de l'avatar. Vous pourrez le changer plus tard.");
          }
        } catch (uploadError) {
          console.error("Erreur upload avatar:", uploadError);
          setAvatarError("Erreur lors de l'upload de l'avatar. Vous pourrez le changer plus tard.");
          // On continue même si l'upload échoue
        }
      }

      setSuccessMsg(`Compte créé avec succès ! Un email de vérification a été envoyé à ${form.email}. Veuillez vérifier votre boîte de réception.`);
      
      // Redirection vers une page de confirmation
      setTimeout(() => router.push(`/verify-pending?email=${encodeURIComponent(form.email)}`), 3000);
    } catch (error) {
      console.error("Erreur création compte:", error);
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Erreur lors de la création de l'utilisateur";
      setPasswordError("Erreur : " + msg);
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
        {(passwordError || avatarError) && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {passwordError && <p>{passwordError}</p>}
            {avatarError && <p>{avatarError}</p>}
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