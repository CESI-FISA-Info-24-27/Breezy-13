"use client";

<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiSearch } from "react-icons/hi";
import Image from "next/image";
=======
import Image from "next/image";
import { HiSearch, HiMenu } from "react-icons/hi";
import { useState } from "react";
>>>>>>> 31fcbf1 (Header trop classe)
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
<<<<<<< HEAD
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
=======
>>>>>>> 31fcbf1 (Header trop classe)

  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-[var(--color-celestial-blue-dark)] shadow z-50">
      {/* Logo à gauche */}
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-full" />
        <span className="text-xl font-bold text-seasalt">TwiX</span>
      </div>

<<<<<<< HEAD
      {/* Barre de recherche centrée */}
      <form className="flex items-center flex-1 justify-center max-w-md mx-8">
        <div className="relative w-full">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-celestial-blue text-xl pointer-events-none" />
=======
      <form className="flex items-center flex-1 justify-center max-w-md mx-8">
        <div className="relative w-full">
>>>>>>> 31fcbf1 (Header trop classe)
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-seasalt text-rich-black focus:outline-none focus:ring-2 focus:ring-sea-green transition"
          />
<<<<<<< HEAD
        </div>
      </form>

      {/* Profil + menu burger à droite */}
      <div className="flex items-center gap-4 relative">
=======
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-celestial-blue text-xl" />
        </div>
      </form>

      <div className="flex items-center gap-4">
>>>>>>> 31fcbf1 (Header trop classe)
        <Image
          src="/default-avatar.png"
          alt="Profil"
          width={40}
          height={40}
          className="rounded-full border-2 border-sea-green"
        />
        <button
<<<<<<< HEAD
          ref={buttonRef}
          className="p-2 rounded-full hover:bg-sea-green/20 transition"
          onClick={() => setMenuOpen(open => !open)}
          aria-label="Ouvrir le menu"
          type="button"
=======
          className="p-2 rounded-full hover:bg-sea-green/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
>>>>>>> 31fcbf1 (Header trop classe)
        >
          <HiMenu className="text-seasalt text-2xl" />
        </button>
        {menuOpen && (
<<<<<<< HEAD
          <div
            ref={menuRef}
            className="absolute right-0 top-16 bg-white rounded shadow-lg py-2 w-40 z-50"
          >
            <Link href="/profilpage" className="block px-4 py-2 hover:bg-celestial-blue/10">Profil</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-sea-green my-2 rounded" />
            <Link href="/profilpage" className="block px-4 py-2 hover:bg-sea-green/10">About</Link>
            <Link href="/profilpage" className="block px-4 py-2 hover:bg-sea-green/10">Privacy Policy</Link>
            <Link href="/profilpage" className="block px-4 py-2 hover:bg-sea-green/10">Contact</Link>
            <hr className="w-4/5 mx-auto h-0.5 border-0 bg-folly my-2 rounded" />
=======
          <div className="absolute right-8 top-16 bg-white rounded shadow-lg py-2 w-40 z-50">
            <Link href="/profilpage" className="block px-4 py-2 hover:bg-sea-green/10">Profil</Link>
>>>>>>> 31fcbf1 (Header trop classe)
            <Link href="/logout" className="block px-4 py-2 hover:bg-folly/10">Déconnexion</Link>
          </div>
        )}
      </div>
    </header>
  );
}