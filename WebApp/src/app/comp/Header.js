"use client";


import { disconnect } from "../../services/AuthServices"; //Import nécessaire pour la déconnexion avec gestion des revoked token
import { useState, useRef, useEffect, useContext } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from '../../../context/UserContext';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const { token } = useContext(AuthContext);


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


  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-[var(--color-celestial-blue-dark)] shadow z-50">
      {/* Logo à gauche */}
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-full" />
        <span className="text-xl font-bold text-seasalt">TwiX {token}</span>
      </div>

      {/* Barre de recherche centrée */}
      <form className="flex items-center flex-1 justify-center max-w-md mx-8">
        <div className="relative w-full">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-celestial-blue text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-seasalt text-rich-black focus:outline-none focus:ring-2 focus:ring-sea-green transition"
          />
        </div>
      </form>

      {/* Profil + menu burger à droite */}
      <div className="flex items-center gap-4 relative">
        <Image
          src="/default-avatar.png"
          alt="Profil"
          width={40}
          height={40}
          className="rounded-full border-2 border-sea-green"
        />
        <button
          ref={buttonRef}
          className="p-2 rounded-full hover:bg-sea-green/20 transition"
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
            <Link href="/profil-page" className="block px-4 py-2 hover:bg-celestial-blue/10">Profil</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-sea-green my-2 rounded" />
            <Link href="/profil-page" className="block px-4 py-2 hover:bg-sea-green/10">About</Link>
            <Link href="/profil-page" className="block px-4 py-2 hover:bg-sea-green/10">Privacy Policy</Link>
            <Link href="/profil-page" className="block px-4 py-2 hover:bg-sea-green/10">Contact</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-folly my-2 rounded" />
            <button onClick={handleDisconnect} className="block px-4 py-2 hover:bg-folly/10">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
}
