"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../comp/Navbar";
import Post from "../comp/Post";
import SideBarFollow from "../comp/SidebarFollow";
import Footer from "../comp/Footer";
import Header from "../comp/Header";
import MobileNavbar from "../comp/MobileNavbar";
import { PostsList } from "../comp/PostsList";
<<<<<<< HEAD
<<<<<<< HEAD
import { getPosts } from "../../services/postsServices";
=======
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)

export default function HomePage() {
  const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarTop, setSidebarTop] = useState(64);
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
<<<<<<< HEAD
  const [posts, setPosts] = useState([]);
=======
>>>>>>> a177e93 (feat : fix pour le merge)

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

  useEffect(() => {
<<<<<<< HEAD
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
=======
    // Fonction pour vérifier la largeur de l'écran
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // 768px = breakpoint "md"
>>>>>>> a177e93 (feat : fix pour le merge)
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data || []);
      } catch (err) {
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);

=======
>>>>>>> a177e93 (feat : fix pour le merge)
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
<<<<<<< HEAD
          <Navbar sidebarTop={sidebarTop} />
=======
          <Navbar />
>>>>>>> a177e93 (feat : fix pour le merge)
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
<<<<<<< HEAD
            <PostsList posts={posts} /> {/* <-- Utilise les vrais posts */}
=======
            <PostsList />
>>>>>>> a177e93 (feat : fix pour le merge)
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
