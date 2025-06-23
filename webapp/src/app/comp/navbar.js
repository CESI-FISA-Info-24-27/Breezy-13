"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
              isHome
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {isHome ? <HiOutlineHome size={22} /> : <HiHome size={22} />}
            {!showNotifications && <span>Accueil</span>}
          </Link>
        </li>
        <li>
          <Link
            href="/profil-page"
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
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
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {showNotifications ? <HiOutlineBell size={22} /> : <HiBell size={22} />}
            {!showNotifications && <span>Notifications</span>}
            {!showNotifications && (
              <span className="ml-auto bg-[var(--color-folly)] text-[var(--color-seasalt)] text-xs rounded-full px-2 py-0.5 font-bold shadow">
                3
              </span>
            )}
          </button>
        </li>
        <li>
          <Link
            href="/messagespage"
            className={`flex items-center gap-3 ${
              showNotifications ? "px-0 justify-center" : "px-4"
            } py-2 rounded-lg font-medium transition ${
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
    </nav>
  );
}