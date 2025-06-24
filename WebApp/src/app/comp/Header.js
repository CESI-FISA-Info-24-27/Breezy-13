"use client";

import Image from "next/image";
import { HiSearch, HiMenu } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { disconnect } from "../../services/AuthServices";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

    const handleDisconnect = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
        await disconnect();
        console.log('Déconnexion réussie');

        // Rediriger l'utilisateur
        router.push('/login');
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        alert(error.message || "Échec de la déconnexion");
    }
    };

  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-[var(--color-celestial-blue-dark)] shadow z-50">
      {/* Logo à gauche */}
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-full" />
        <span className="text-xl font-bold text-seasalt">TwiX</span>
      </div>

      <form className="flex items-center flex-1 justify-center max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-seasalt text-rich-black focus:outline-none focus:ring-2 focus:ring-sea-green transition"
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-celestial-blue text-xl" />
        </div>
      </form>

      <div className="flex items-center gap-4">
        <Image
          src="/default-avatar.png"
          alt="Profil"
          width={40}
          height={40}
          className="rounded-full border-2 border-sea-green"
        />
        <button
          className="p-2 rounded-full hover:bg-sea-green/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu" 
        >
          <HiMenu className="text-seasalt text-2xl" />
        </button>
        {menuOpen && (
          <div className="absolute right-8 top-16 bg-white rounded shadow-lg py-2 w-40 z-50">
            <Link href="/profil-page" className="block px-4 py-2 hover:bg-sea-green/10">Profil</Link>
            <button onClick={handleDisconnect} className="block px-4 py-2 hover:bg-folly/10">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
}
