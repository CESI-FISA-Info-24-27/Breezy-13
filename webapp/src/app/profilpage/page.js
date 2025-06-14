import React from "react";
import Navbar from "../comp/navbar";
import ProfilPreview from "../comp/profilPreview";
import Footer from "../comp/footer";
import { PostsList } from "../comp/postsList";

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