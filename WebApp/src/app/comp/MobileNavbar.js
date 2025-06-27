"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineBell,
  HiBell,
  HiOutlineChat,
  HiChat,
  HiOutlineUserCircle,
  HiUserCircle,
} from "react-icons/hi";

export default function MobileNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/homepage";
  const isProfile = pathname === "/profilpage";
  const isNotifications = pathname === "/notifiationspage";
  const isMessages = pathname === "/messages";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-celestial-blue)] text-seasalt shadow-t z-50 border-t border-seasalt/10">
      <ul className="flex justify-around items-center h-14">
        <li>
          <Link href="/homepage">
            {isHome ? <HiHome size={24} /> : <HiOutlineHome size={24} />}
          </Link>
        </li>
        <li>
          <Link href="/profilpage">
            {isProfile ? <HiUserCircle size={24} /> : <HiOutlineUserCircle size={24} />}
          </Link>
        </li>
        <li className="relative">
          <Link href="/homepage">
            {isNotifications ? <HiBell size={24} /> : <HiOutlineBell size={24} />}
            {/* Badge fictif */}
            <span className="absolute -top-1 -right-2 bg-folly text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </Link>
        </li>
        <li>
          <Link href="/messages">
            {isMessages ? <HiChat size={24} /> : <HiOutlineChat size={24} />}
          </Link>
        </li>
      </ul>
    </nav>
  );
}