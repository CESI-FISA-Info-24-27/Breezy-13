"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home-page";
  const isProfile = pathname === "/profil-page";
  const isNotifications = pathname === "/notifications-page";
  const isMessages = pathname === "/messages-page";

  return (
    <nav className="h-screen w-64 flex flex-col min-h-screen px-4 py-6 bg-[var(--color-celestial-blue)] shadow-full">
      <Link href="/home-page" className="flex items-center mb-7">
        <Image
          src="/logo.png"
          alt="TwiX logo"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="ml-4 text-2xl font-extrabold tracking-tight text-[var(--color-seasalt)]">
          TwiX
        </span>
      </Link>
      <hr className="border-[var(--color-seasalt)] mb-6" />
      <ul className="flex-1 flex flex-col gap-2">
        <li>
          <Link
            href="/home-page"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
              isHome
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
            {isHome ? <HiOutlineHome size={22} /> : <HiHome size={22} />}
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <Link
            href="/profil-page"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
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
            <span>Profil</span>
          </Link>
        </li>
        <li>
          <Link
            href="/notifications-page"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition relative ${
              isNotifications
                ? "bg-[var(--color-seasalt)] text-[var(--color-celestial-blue)] shadow"
                : "text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20"
            }`}
          >
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
        </li>
        <li>
          <Link
            href="/messages-page"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
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
            <span>Messages</span>
          </Link>
        </li>
      </ul>
      <div className="mt-8">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[var(--color-folly)] text-[var(--color-seasalt)] font-semibold hover:bg-[var(--color-sea-green)] transition shadow">
          Déconnexion
        </button>
      </div>
    </nav>
  );
}