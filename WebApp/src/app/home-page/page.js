"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../comp/Navbar";
import Post from "../comp/Post";
import SideBarFollow from "../comp/SidebarFollow";
import Footer from "../comp/Footer";
import Header from "../comp/Header";
import MobileNavbar from "../comp/MobileNavbar";
import { PostsList } from "../comp/PostsList";

export default function HomePage() {
  const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarTop, setSidebarTop] = useState(64);
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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

      setHeaderStyle(prev =>
        prev.opacity !== opacity || prev.transform !== `translateY(-${translateY}px)`
          ? { opacity, transform: `translateY(-${translateY}px)` }
          : prev
      );

      const ACCELERATION = 1.2;
      const sidebarTranslate = Math.min(scrollY * ACCELERATION, 100 * ACCELERATION);
      const visibleHeight = Math.max(headerHeight - sidebarTranslate, 0);
      setSidebarTop(prev => (prev !== visibleHeight ? visibleHeight : prev));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  useEffect(() => {
    // Fonction pour vérifier la largeur de l'écran
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // 768px = breakpoint "md"
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Définition de demoPosts
  const demoPosts = [
    { _id: "1", username: "elonmuck", avatar: "/logo.png", content: "Achetez mes voitures !" , date: "2023-10-01T12:00:00Z" },
    { _id: "2", username: "BillGrates", avatar: "/logo.png", content: "Windows c'est mieux." , date: "2023-10-01T12:00:00Z" },
    { _id: "3", username: "Terracist", avatar: "/logo.png", content: "TwiX c'était mieux avant." , date: "2023-10-01T12:00:00Z" },
    { _id: "4", username: "Arkuni", avatar: "/logo.png", content: "TwiX<Beak" , date: "2023-10-01T12:00:00Z" }
  ];

  return (
    <div className="relative min-h-screen bg-seasalt">
      {/* Header */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={headerStyle}
      >
        <Header />
      </div>

      <div className="flex pt-[64px] md:pt-0">
        {/* Sidebar gauche (desktop/tablette uniquement) */}
        <div
          className="hidden md:block fixed left-0 w-64 z-40 transition-all duration-300"
          style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
        >
          <Navbar />
        </div>

        {/* Sidebar droite (desktop/tablette uniquement) */}
        <div
          className="hidden md:block fixed right-0 w-64 z-40 transition-all duration-300"
          style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
        >
          <SideBarFollow style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }} />
        </div>

        {/* Contenu principal */}
        <main
          className="flex-1 md:ml-64 md:mr-64 p-4 sm:p-6 lg:p-8 pb-14 md:pb-0 transition-all duration-300 w-full"
          style={{
            paddingTop: `${sidebarTop + 16}px`,
            paddingBottom: '3.5rem', // 56px pour la MobileNavbar
          }}
        >
          <h1 className="text-2xl font-bold pb-5">Page d&apos;accueil</h1>
          <hr className="pb-5" />
          <Post />
          <hr className="mt-7 text-rich-black" />
          <div className="mt-8 mb-4">
            <PostsList posts={demoPosts} />
          </div>
          <Footer>
            <span>© {new Date().getFullYear()} Mon Footer Personnalisé</span>
          </Footer>
        </main>
      </div>

      {/* MobileNavbar affichée uniquement sur mobile */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}