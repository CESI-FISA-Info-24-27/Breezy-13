"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [avatarPreview, setAvatarPreview] = useState("/avatar-placeholder.png");

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celestial-blue via-sea-green to-folly animate-fade-in">
      <div className="w-full max-w-md bg-seasalt/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 mb-2">
          <Image
            className="w-16 h-16 rounded-full shadow-lg object-cover"
            src="/logo.png"
            alt="logo"
            width={64}
            height={64}
            priority
          />
          <span className="text-3xl font-extrabold text-celestial-blue font-sans tracking-tight drop-shadow">
            Beak
          </span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-rich-black text-center animate-slide-down">
          Créez votre compte
        </h1>
        <form className="w-full flex flex-col gap-5 animate-fade-in-slow">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-rich-black">
              Nom d&apos;utilisateur <span className="text-folly">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green focus:border-folly transition-all duration-200 outline-none"
              placeholder="Votre pseudo unique"
              required
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
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green focus:border-folly transition-all duration-200 outline-none"
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
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green focus:border-folly transition-all duration-200 outline-none"
              placeholder="••••••••"
              required
              minLength={8}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$"
              title="Au moins 8 caractères, dont une lettre et un chiffre"
              autoComplete="new-password"
            />
            <p className="text-xs text-rich-black/60 mt-1">
              Au moins 8 caractères, une lettre et un chiffre.
            </p>
          </div>
          <div>
            <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-rich-black">
              Avatar <span className="text-folly">*</span>
            </label>
            <div className="flex items-center gap-4">
              <Image
                src={avatarPreview}
                alt="Aperçu avatar"
                width={48}
                height={48}
                className="rounded-full object-cover border border-sea-green/40 bg-seasalt w-12 h-12"
              />
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                className="block w-full text-sm text-rich-black file:bg-sea-green file:text-seasalt file:rounded-lg file:border-0 file:py-2 file:px-4 file:font-semibold file:cursor-pointer"
                required
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 text-sm font-medium text-rich-black">
              Bio <span className="text-rich-black/50">(facultatif)</span>
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={2}
              className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green focus:border-folly transition-all duration-200 outline-none resize-none"
              placeholder="Parlez-nous un peu de vous..."
              maxLength={200}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-sea-green text-seasalt font-semibold text-lg shadow-md hover:bg-folly hover:text-seasalt transition-all duration-200 focus:ring-4 focus:ring-folly/40"
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