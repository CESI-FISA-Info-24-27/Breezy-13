"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
import {
  HiOutlineHome,
  HiHome,
  HiBell,
  HiOutlineBell,
  HiChat,
  HiOutlineChat,
  HiUserCircle,
  HiOutlineUserCircle,
} from "react-icons/hi";
<<<<<<< HEAD
<<<<<<< HEAD
import Notifications from "./Notifications";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ sidebarTop = 64 }) {
  const pathname = usePathname();

  const [showNotifications, setShowNotifications] = useState(false);
  const notifBtnRef = useRef(null);
  const [notifPanelVisible, setNotifPanelVisible] = useState(false);

  const isHome = pathname === "/" || pathname === "/home-page" && showNotifications === false;
  const isProfile = pathname === "/profil-page" && showNotifications === false;
  const isMessages = pathname === "/messagespage" && showNotifications === false; 

  // Fermer le panneau si clic en dehors
  useEffect(() => {
    function handleClick(e) {
      if (
        notifBtnRef.current &&
        !notifBtnRef.current.contains(e.target) &&
        !document.getElementById("notif-panel")?.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showNotifications]);

  useEffect(() => {
    if (showNotifications) {
      setNotifPanelVisible(true);
    }
  }, [showNotifications]);

  function handleNotifPanelTransitionEnd() {
    if (!showNotifications) setNotifPanelVisible(false);
  }

  return (
    <nav
      className={`h-screen flex flex-col min-h-screen px-4 py-3 bg-[var(--color-celestial-blue)] shadow-full relative transition-all duration-300 ${
        showNotifications ? "w-20" : "w-64"
      }`}
    >
      <ul className="flex-1 flex flex-col gap-2">
        <li>
          <Link
            href="/home-page"
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
=======
=======
import Notifications from "./Notifications";
import { useEffect, useRef, useState } from "react";
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)

export default function Navbar({ sidebarTop = 64 }) {
  const pathname = usePathname();
<<<<<<< HEAD
<<<<<<< HEAD
  const isHome = pathname === "/" || pathname === "/home-page";
  const isProfile = pathname === "/profil-page";
  const isNotifications = pathname === "/notifications-page";
<<<<<<< HEAD
  const isMessages = pathname === "/messages";
=======
  const isMessages = pathname === "/messages-page";
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
=======
  const isHome = pathname === "/" || pathname === "/homepage";
  const isProfile = pathname === "/profilpage";
  const isNotifications = pathname === "/notifiationspage";
  const isMessages = pathname === "/messagespage";
>>>>>>> afb6387 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
=======

  const [showNotifications, setShowNotifications] = useState(false);
  const notifBtnRef = useRef(null);
  const [notifPanelVisible, setNotifPanelVisible] = useState(false);

  const isHome = pathname === "/" || pathname === "/home-page" && showNotifications === false;
  const isProfile = pathname === "/profil-page" && showNotifications === false;
  const isMessages = pathname === "/messagespage" && showNotifications === false; 

  // Fermer le panneau si clic en dehors
  useEffect(() => {
    function handleClick(e) {
      if (
        notifBtnRef.current &&
        !notifBtnRef.current.contains(e.target) &&
        !document.getElementById("notif-panel")?.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showNotifications]);

  useEffect(() => {
    if (showNotifications) {
      setNotifPanelVisible(true);
    }
  }, [showNotifications]);

  function handleNotifPanelTransitionEnd() {
    if (!showNotifications) setNotifPanelVisible(false);
  }
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)

  return (
    <nav
      className={`h-screen flex flex-col min-h-screen px-4 py-3 bg-[var(--color-celestial-blue)] shadow-full relative transition-all duration-300 ${
        showNotifications ? "w-20" : "w-64"
      }`}
    >
      <ul className="flex-1 flex flex-col gap-2">
        <li>
          <Link
            href="/home-page"
<<<<<<< HEAD
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
              isHome
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {isHome ? <HiOutlineHome size={22} /> : <HiHome size={22} />}
<<<<<<< HEAD
<<<<<<< HEAD
            {!showNotifications && <span>Accueil</span>}
=======
            <span>Accueil</span>
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            {!showNotifications && <span>Accueil</span>}
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
          </Link>
        </li>
        <li>
          <Link
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            href="/profil-page"
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
<<<<<<< HEAD
=======
            href="/profilpage"
=======
            href="/profil-page"
>>>>>>> a177e93 (feat : fix pour le merge)
=======
            href="/profil-page"
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
            href="/profil-page"
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
              isProfile
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {isProfile ? (
              <HiOutlineUserCircle size={22} />
            ) : (
              <HiUserCircle size={22} />
            )}
<<<<<<< HEAD
<<<<<<< HEAD
            {!showNotifications && <span>Profil</span>}
          </Link>
        </li>
        <li>
          <button
            ref={notifBtnRef}
            type="button"
            onClick={() => setShowNotifications((v) => !v)}
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition relative w-full text-left ${
              showNotifications
=======
            <span>Profil</span>
          </Link>
        </li>
        <li>
          <Link
            href="/notifications-page"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition relative ${
              isNotifications
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            {!showNotifications && <span>Profil</span>}
          </Link>
        </li>
        <li>
          <button
            ref={notifBtnRef}
            type="button"
            onClick={() => setShowNotifications((v) => !v)}
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition relative w-full text-left ${
              showNotifications
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
            {showNotifications ? <HiOutlineBell size={22} /> : <HiBell size={22} />}
            {!showNotifications && <span>Notifications</span>}
            {!showNotifications && (
              <span className="ml-auto bg-[var(--color-folly)] text-[var(--color-seasalt)] text-xs rounded-full px-2 py-0.5 font-bold shadow">
                3
              </span>
<<<<<<< HEAD
            )}
          </button>
=======
            {isNotifications ? (
              <HiOutlineBell size={22} />
            ) : (
              <HiBell size={22} />
            )}
            <span>Notifications</span>
            <span className="ml-auto bg-[var(--color-folly)] text-[var(--color-seasalt)] text-xs rounded-full px-2 py-0.5 font-bold shadow">
              3
            </span>
          </Link>
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            )}
          </button>
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
        </li>
        <li>
          <Link
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            href="/messagespage"
<<<<<<< HEAD
<<<<<<< HEAD
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
=======
=======
            href="/messages"
>>>>>>> 20c8975 (fix: Correction path pour les messages privés)
=======
            href="/messages-page"
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
=======
            href="/messagespage"
>>>>>>> afb6387 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
              isMessages
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {isMessages ? (
              <HiOutlineChat size={22} />
            ) : (
              <HiChat size={22} />
            )}
<<<<<<< HEAD
<<<<<<< HEAD
            {!showNotifications && <span>Messages</span>}
          </Link>
        </li>
      </ul>
      {notifPanelVisible && (
        <div
          id="notif-panel"
          className={`fixed left-20 z-50 transition-all duration-300 ease-in-out ${
            showNotifications
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-10 opacity-0 pointer-events-none"
          }`}
          style={{
            top: sidebarTop,
            height: `calc(100vh - ${sidebarTop}px)`,
            minWidth: 320,
            width: 384,
            background: "white",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
          onTransitionEnd={handleNotifPanelTransitionEnd}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg">Notifications</span>
            <button
              className="text-folly text-2xl font-bold"
              onClick={() => setShowNotifications(false)}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Notifications />
          </div>
        </div>
      )}
=======
            <span>Messages</span>
          </Link>
        </li>
      </ul>
<<<<<<< HEAD
      <div className="mt-8">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[var(--color-folly)] text-[var(--color-seasalt)] font-semibold hover:bg-[var(--color-sea-green)] transition shadow">
          Déconnexion
        </button>
      </div>
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
>>>>>>> 31fcbf1 (Header trop classe)
=======
            {!showNotifications && <span>Messages</span>}
          </Link>
        </li>
      </ul>
      {notifPanelVisible && (
        <div
          id="notif-panel"
          className={`fixed left-20 z-50 transition-all duration-300 ease-in-out ${
            showNotifications
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-10 opacity-0 pointer-events-none"
          }`}
          style={{
            top: sidebarTop,
            height: `calc(100vh - ${sidebarTop}px)`,
            minWidth: 320,
            width: 384,
            background: "white",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
          onTransitionEnd={handleNotifPanelTransitionEnd}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg">Notifications</span>
            <button
              className="text-folly text-2xl font-bold"
              onClick={() => setShowNotifications(false)}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Notifications />
          </div>
        </div>
      )}
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
    </nav>
  );
}
