"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiOutlineHome, HiHome, HiBell, HiOutlineBell, HiChat, HiOutlineChat, HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";

const customSidebarTheme = {
  root: {
    base: "h-full bg-celestial_blue-500 text-seasalt min-h-screen", // ta couleur ici
    collapsed: {
      on: "w-16",
      off: "w-64"
    },
    inner: "h-full overflow-y-auto overflow-x-hidden rounded px-3 py-4"
  },
}

export default function MyNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/homePage";
  const isProfile = pathname === "/profilPage";
  const isNotifiations = pathname === "/notifiationsPage";
  const isMessages = pathname === "/messagesPage";

  return (
    <div className="h-screen">
      <Sidebar
        aria-label="Default sidebar example"
        theme={customSidebarTheme}
      >
        {/* <div className="flex items-center justify-center my-6 space-x-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full border-4 border-seasalt shadow"
          />
          <span className="text-2xl font-bold text-seasalt tracking-wide drop-shadow">
            TwiX
          </span>
        </div> */}
        <SidebarLogo href="#" img="/logo.png" imgAlt="TwiX logo">
          TwiX
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              href="/homePage"
              icon={isHome ? HiOutlineHome : HiHome}
              className={isHome ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Page d'accueil
            </SidebarItem>
            <SidebarItem
              href="/profilPage"
              icon={isProfile ? HiOutlineUserCircle : HiUserCircle}
              className={isProfile ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Profil
            </SidebarItem>
            <SidebarItem
              href="/notifiationsPage"
              icon={isNotifiations ? HiOutlineBell : HiBell}
              label="3"
              className={isNotifiations ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Notifications
            </SidebarItem>
            <SidebarItem
              href="/messagesPage"
              icon={isMessages ? HiOutlineChat : HiChat}
              className={isMessages ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Messages
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}