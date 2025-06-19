import React from "react";
import Navbar from "../comp/Navbar";
import Post from "../comp/Post";
import SideBarFollow from "../comp/SidebarFollow";
import Footer from "../comp/Footer";
import { PostsList } from "../comp/PostsList";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-seasalt">
      <div className="fixed left-0 top-0 h-screen w-64 z-40">
        <Navbar />
      </div>
      <div className="fixed right-0 top-0 h-screen w-64 z-40">
        <SideBarFollow />
      </div>
      <main className="ml-64 mr-64 p-8 flex-1">
        <h1 className="text-2xl font-bold pb-5">Page d&apos;accueil</h1>
        <hr className="text-2xl font-bold pb-5"></hr>
        <Post />
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