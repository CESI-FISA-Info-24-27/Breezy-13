import React from "react";
import Navbar from "../comp/navbar";
import Post from "../comp/post";
import SideBarFollow from "../comp/sidebarFollow";
import Footer from "../comp/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed left-0 top-0 h-screen w-64 z-40">
        <Navbar />
      </div>
      <div className="fixed right-0 top-0 h-screen w-64 z-40">
        <SideBarFollow />
      </div>
      <main className="ml-64 mr-64 p-8 flex-1">
        <h1 className="text-2xl font-bold pb-5">Page d'accueil</h1>
        <hr className="text-2xl font-bold pb-5"></hr>
        <Post />
      </main>
      <div className="ml-64 mr-64">
        <Footer />
      </div>
    </div>
  );
}