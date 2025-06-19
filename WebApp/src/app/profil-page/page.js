<<<<<<< HEAD
"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../comp/Navbar";
<<<<<<< HEAD
<<<<<<< HEAD
import SideBarFollow from "../comp/SidebarFollow";
import Footer from "../comp/Footer";
import { PostsList } from "../comp/PostsList";
import Header from "../comp/Header";
import MobileNavbar from "../comp/MobileNavbar";
import ProfilPreview from "../comp/ProfilPreview";
=======
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)
import Footer from "../comp/Footer";
import Header from "../comp/Header";
import ProfilPreview from "../comp/ProfilPreview";
import { PostsList } from "../comp/PostsList";
<<<<<<< HEAD
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)

export default function HomePage() {
  const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarTop, setSidebarTop] = useState(64);
  const headerRef = useRef(null);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [isMobile, setIsMobile] = useState(false);

  const demoPosts = [
      { _id: "1", username: "elonmuck", avatar: "/logo.png", content: "Achetez mes voitures !" , date: "2025-06-20T08:55:00Z" },
      { _id: "2", username: "elonmuck", avatar: "/logo.png", content: "Windows c'est mieux." , date: "2025-06-20T04:00:00Z" },
      { _id: "3", username: "elonmuck", avatar: "/logo.png", content: "TwiX c'était mieux avant." , date: "2025-06-19T08:00:00Z" },
      { _id: "4", username: "elonmuck", avatar: "/logo.png", content: "TwiX<Beak" , date: "2025-04-01T12:00:00Z" },
      { _id: "5", username: "elonmuck", avatar: "/logo.png", content: "TwiX<Beak" , date: "2023-04-01T12:00:00Z" }
    ];
=======
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
  const [isMobile, setIsMobile] = useState(false);
>>>>>>> 3d47564 (Push de stabilisation apres rebase)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
      setSidebarTop(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 100);
      const translateY = Math.min(scrollY, 100);

      setHeaderStyle({
        opacity,
        transform: `translateY(-${translateY}px)`,
      });

      const ACCELERATION = 1.2;
      const sidebarTranslate = Math.min(scrollY * ACCELERATION, 100 * ACCELERATION);
      const visibleHeight = Math.max(headerHeight - sidebarTranslate, 0);
      setSidebarTop(visibleHeight);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
  useEffect(() => {
    // Fonction pour vérifier la largeur de l'écran
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // 768px = breakpoint "md"
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

<<<<<<< HEAD
=======
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
  return (
    <div className="relative min-h-screen bg-seasalt">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={headerStyle}
      >
        <Header />
      </div>

      <div className="flex pt-[64px] md:pt-0">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        {/* Sidebar gauche (desktop/tablette uniquement) */}
=======
        {/* Sidebar gauche */}
>>>>>>> a177e93 (feat : fix pour le merge)
=======
        {/* Sidebar gauche */}
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
        <div
          className="hidden md:block fixed left-0 w-64 z-40 transition-all duration-300"
          style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
        >
<<<<<<< HEAD
<<<<<<< HEAD
          <Navbar sidebarTop={sidebarTop} />
        </div>

        {/* Sidebar droite (desktop/tablette uniquement) */}
        <div
          className="hidden md:block fixed right-0 w-64 z-40 transition-all duration-300"
          style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
        >
          <SideBarFollow style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }} />
=======
          <Navbar />
>>>>>>> a177e93 (feat : fix pour le merge)
=======
          <Navbar />
>>>>>>> 7ea8f23 (feat : fix pour le merge)
        </div>

        {/* Contenu principal */}
        <main
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
          className="flex-1 md:ml-64 md:mr-64 p-4 sm:p-6 lg:p-8 pb-14 md:pb-0 transition-all duration-300 w-full"
          style={{
            paddingTop: `${sidebarTop + 16}px`,
            paddingBottom: '3.5rem', // 56px pour la MobileNavbar
          }}
<<<<<<< HEAD
        >
          <ProfilPreview />
          <hr className="mt-7 text-rich-black" />
          <div className="mt-8 mb-4">
            <PostsList posts={demoPosts} />
          </div>
=======
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)
          className="flex-1 md:ml-64 md:mr-64 p-4 sm:p-6 lg:p-8 pb-20 transition-all duration-300 w-full"
          style={{ paddingTop: `${sidebarTop + 16}px` }}
        >
          <ProfilPreview />
<<<<<<< HEAD
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
        >
          <ProfilPreview />
          <h1>TEST</h1>
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
          <Footer>
            <span>© {new Date().getFullYear()} Mon Footer Personnalisé</span>
          </Footer>
        </main>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)

      {/* MobileNavbar affichée uniquement sur mobile */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======
    </div>
  );
}
>>>>>>> a177e93 (feat : fix pour le merge)
=======
    </div>
  );
}
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
import React from "react";
import Navbar from "../comp/Navbar";
import ProfilPreview from "../comp/ProfilPreview";
import Footer from "../comp/Footer";
import { PostsList } from "../comp/PostsList";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-seasalt">
      <div className="fixed left-0 top-0 h-screen w-64 z-40">
        <Navbar />
      </div>
      <main className="ml-64 mr-64 p-8 flex-1">
        <ProfilPreview />
        <hr className="mt-7 text-rich-black"></hr>
        <div className="mt-8 mb-4">
          <PostsList />
        </div>
      </main>
      <div className="ml-64 mr-64">
        <Footer>
          <span>© {new Date().getFullYear()} Mon Footer Personnalisé</span>
        </Footer>
      </div>
    </div>
  );
}
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
=======
>>>>>>> 3d47564 (Push de stabilisation apres rebase)
