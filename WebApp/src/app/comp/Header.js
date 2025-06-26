"use client";

import { useAuth } from "../../../context/UserContext";
import { disconnect } from "../../services/AuthServices"; //Import nécessaire pour la déconnexion avec gestion des revoked token
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import SecureMedia from "./SecureMedia";


export default function Header({ existingQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(existingQuery || "");
  const { userId, user } = useAuth();

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  
  const router = useRouter();
  let profilPageURI = `/profil-page/${userId}`;
  
  const handleSearch = (e) => 
  {
    e.preventDefault();

    // On récupère l'URL actuelle
    let currentPath = window.location.pathname;

    // On vérifie qu'elle soit compatible
    if(!currentPath.includes("home-page") && !currentPath.includes("profil-page"))
    {
        // Sinon par défaut on redirigera vers la home-page
        currentPath = "/home-page";
    }

    // On construit la nouvelle URL avec params mis à jour
    const newSearch = encodeURIComponent(query);
    const newUrl = `${currentPath}${newSearch ? `?content=${newSearch}` : ""}`;

    router.push(newUrl);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      if (menuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [menuOpen]);

  //Fonction permettant la déconnexion avec la gestion de revoked token
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
  }

  const handleReturnMenu = (e) => {
    e.preventDefault();
    router.push('/home-page');
  }

  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-[var(--color-celestial-blue-dark)] shadow z-50">
      {/* Logo à gauche */}
      <div className="cursor-pointer flex items-center gap-3" onClick={handleReturnMenu}>
        <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-full" />
        <span className="text-xl font-bold text-seasalt">TwiX</span>
      </div>

      {/* Barre de recherche centrée */}
      <form className="flex items-center flex-1 justify-center max-w-md mx-8" onSubmit={handleSearch}>
        <div className="relative w-full">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-celestial-blue text-xl pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-seasalt text-rich-black focus:outline-none focus:ring-2 focus:ring-sea-green transition"
          />
        </div>
      </form>

      {/* Profil + menu burger à droite */}
      <div className="flex items-center gap-4 relative">
        <Link href={profilPageURI} className="cursor-pointer">
          <SecureMedia fileName={user?.avatar} type="image" alt="avatar" className="w-10 h-10 rounded-full object-cover border" />
        </Link>
        
        <button
          ref={buttonRef}
          className="cursor-pointer p-2 rounded-full hover:bg-sea-green/20 transition"
          onClick={() => setMenuOpen(open => !open)}
          aria-label="Ouvrir le menu"
          type="button"
        >
          <HiMenu className="text-seasalt text-2xl" />
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-16 bg-white rounded shadow-lg py-2 w-40 z-50"
          >
            <Link href={profilPageURI} className="cursor-pointer block px-4 py-2 hover:bg-celestial-blue/10">Profil</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-sea-green my-2 rounded" />
            <Link href="/about" className="cursor-pointer block px-4 py-2 hover:bg-sea-green/10">About</Link>
            <Link href="/privacy-policy" className="cursor-pointer block px-4 py-2 hover:bg-sea-green/10">Privacy Policy</Link>
            <Link href="/contact" className="cursor-pointer block px-4 py-2 hover:bg-sea-green/10">Contact</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-folly my-2 rounded" />
            <button onClick={handleDisconnect} className="cursor-pointer block px-4 py-2 hover:bg-folly/10">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
}
