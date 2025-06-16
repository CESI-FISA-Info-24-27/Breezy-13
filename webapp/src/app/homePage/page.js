"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../comp/navbar";
import Post from "../comp/post";
import SideBarFollow from "../comp/sidebarFollow";
import Footer from "../comp/footer";
import { PostsList } from "../comp/postsList";
import Header from "../comp/header";

export default function HomePage() {
  const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
  const [headerHeight, setHeaderHeight] = useState(64); // hauteur initiale du header (px)
  const [sidebarTop, setSidebarTop] = useState(64);
  const headerRef = useRef(null);

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

  return (
    <div className="relative min-h-screen bg-seasalt">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={headerStyle}
      >
        <Header />
      </div>
      {/* Sidebars avec top dynamique */}
      <div
        className="fixed left-0 w-64 z-40 transition-all duration-300"
        style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
      >
        <Navbar />
      </div>
      <div
        className="fixed right-0 w-64 z-40 transition-all duration-300"
        style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
      >
-        <SideBarFollow />
+        <SideBarFollow style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }} />
      </div>
      {/* Décale le contenu principal sous le header */}
      <main
        className="ml-64 mr-64 p-8 min-h-[calc(100vh-64px)] transition-all duration-300"
        style={{ paddingTop: `${sidebarTop + 16}px` }} // 16px de marge supplémentaire si besoin
      >
        <h1 className="text-2xl font-bold pb-5">Page d&apos;accueil</h1>
        <hr className="text-2xl font-bold pb-5" />
        <Post />
        <hr className="mt-7 text-rich-black" />
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