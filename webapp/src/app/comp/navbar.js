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
  const isHome = pathname === "/" || pathname === "/homepage";
  const isProfile = pathname === "/profilpage";
  const isNotifications = pathname === "/notifiationspage";
  const isMessages = pathname === "/messagespage";

  return (
    <nav className="h-screen w-64 flex flex-col min-h-screen px-4 py-6 bg-[var(--color-celestial-blue)] shadow-full">
      <ul className="flex-1 flex flex-col gap-2">
        <li>
          <Link
            href="/homepage"
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
            href="/profilpage"
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
            href="/notifiationspage"
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
            href="/messagespage"
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
    </nav>
  );
}