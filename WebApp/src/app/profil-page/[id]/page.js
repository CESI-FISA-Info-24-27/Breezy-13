"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../comp/Navbar";
import Footer from "../../comp/Footer";
import Header from "../../comp/Header";
import ProfilPreview from "../../comp/ProfilPreview";
import { PostsList } from "../../comp/PostsList";
import MobileNavbar from "../../comp/MobileNavbar";
import { getUsers } from "../../../services/UsersServices"
import { getPosts } from "../../../services/PostsServices"
import { useParams } from 'next/navigation';

const pagination = 5;

export default function ProfilPage() 
{
  const { id: userId } = useParams();

  const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarTop, setSidebarTop] = useState(64);
  const headerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [endID, setEndID] = useState(pagination);

  const searchParams = useSearchParams();
  let contentFilter = searchParams.get("content") || "";

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
    // Fonction pour vérifier la largeur de l'écran
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // 768px = breakpoint "md"
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUsers({ id: userId });
      setUser(fetchedUser[0]);

      const fetchedPost = await getPosts({ author: userId, content: contentFilter });
      setMyPosts(fetchedPost);
    };

    fetchData();
  }, [userId, contentFilter]);

  function fetchMorePosts()
  {
    setEndID(prev => prev + pagination);
  }

  return (
    <div className="relative min-h-screen bg-seasalt">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={headerStyle}
      >
        <Header existingQuery={contentFilter}/>
      </div>

      <div className="flex pt-[64px] md:pt-0">
        <div
          className="hidden md:block fixed left-0 w-64 z-40 transition-all duration-300"
          style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
        >
          <Navbar />
        </div>

        {/* Contenu principal */}
        <main
          className="flex-1 md:ml-64 md:mr-64 p-4 sm:p-6 lg:p-8 pb-14 md:pb-0 transition-all duration-300 w-full"
          style={{
            paddingTop: `${sidebarTop + 16}px`,
            paddingBottom: '3.5rem', // 56px pour la MobileNavbar
          }}
        >
          <ProfilPreview user={user} />
          <hr className="w-1/2 mx-auto h-0.5 border-0 bg-seasalt my-5 rounded" />
          <PostsList posts={myPosts.slice(0, endID)} />
          {!myPosts || endID >= myPosts.length ? (<div></div>) : (
              <button className="w-full mt-4 px-4 py-2 rounded bg-folly text-seasalt font-semibold hover:bg-sea-green transition" onClick={fetchMorePosts}>
                  Afficher plus
              </button>
            )}
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
