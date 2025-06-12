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

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/homepage";
  const isProfile = pathname === "/profilpage";
  const isNotifiations = pathname === "/notifiationspage";
  const isMessages = pathname === "/messagespage";

  return (
    <div className="h-screen">
      <Sidebar
        aria-label="Default sidebar example"
        theme={customSidebarTheme}
      >
        <SidebarLogo href="#" img="/logo.png" imgAlt="TwiX logo">
          TwiX
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              href="/homepage"
              icon={isHome ? HiOutlineHome : HiHome}
              className={isHome ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Page d'accueil
            </SidebarItem>
            <SidebarItem
              href="/profilpage"
              icon={isProfile ? HiOutlineUserCircle : HiUserCircle}
              className={isProfile ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Profil
            </SidebarItem>
            <SidebarItem
              href="/notifiationspage"
              icon={isNotifiations ? HiOutlineBell : HiBell}
              label="3"
              className={isNotifiations ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Notifications
            </SidebarItem>
            <SidebarItem
              href="/messagespage"
              icon={isMessages ? HiOutlineChat : HiChat}
              className={isMessages ? "bg-accent text-seasalt" : "hover:bg-accent/80"}
            >
              Messages
            </SidebarItem>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem
              className="hover:bg-accent/80"
            >
              Deconnexion
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}