<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import { HiOutlineUserAdd, HiUserAdd, HiOutlineShare, HiShare, HiChat, HiOutlineChat, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useState, useEffect } from "react";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (isNaN(diff) || diff < 0) return "";

  if (diff < 60) return `il y a ${diff} seconde${diff > 1 ? "s" : ""}`;
  const min = Math.floor(diff / 60);
  if (min < 60) return `il y a ${min} minute${min > 1 ? "s" : ""}`;
  const h = Math.floor(diff / 3600);
  if (h < 24) return `il y a ${h} heure${h > 1 ? "s" : ""}`;
  const d = Math.floor(diff / 86400);
  if (d < 30) return `il y a ${d} jour${d > 1 ? "s" : ""}`;
  const m = Math.floor(diff / 2592000);
  if (m < 12) return `il y a ${m} mois`;
  const y = Math.floor(diff / 31536000);
  return `il y a ${y} an${y > 1 ? "s" : ""}`;
=======
import { Button, Card, Label } from "flowbite-react";
import Image from "next/image";
import { HiOutlineUserAdd, HiOutlineUserRemove, HiOutlineShare, HiShare } from "react-icons/hi";
=======
"use client";

import Image from "next/image";
import { HiOutlineUserAdd, HiUserAdd, HiOutlineShare, HiShare, HiChat, HiOutlineChat, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useState } from "react";

export function PostsList({ posts }) {
  const [hovered, setHovered] = useState("");

  const displayPosts = posts && posts.length > 0 ? posts : demoPosts;

  if (!displayPosts || displayPosts.length === 0) {
    return (
      <div className="w-full max-w-full bg-[var(--color-celestial-blue)] rounded-lg shadow p-6 mb-6 text-[var(--color-seasalt)] opacity-70">
        Aucun post à afficher.
      </div>
    );
  }
>>>>>>> dc16337 (Fin de la page d'accueil)

  return (
    <div
      className="w-full max-w-full space-y-6"
      style={{ "--color-celestial-blue": "#1976c5" }}
    >
      {displayPosts.map((post) => (
        <div
          key={post._id}
          className="flex flex-col gap-4 w-full bg-[var(--color-outer-space)] rounded-xl shadow-lg p-6 border-2 border-[var(--color-sea-green)]"
        >
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <span className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)] mr-3 text-lg">
                {post.username[0]}
              </span>
              <span className="mb-0 text-lg font-bold text-[var(--color-rich-black)]">
                {post.username}
              </span>
              <span className="text-sm text-[var(--color-rich-black)]/70 ms-2">
               {post.date}
              </span>
            </div>
            <span
              onMouseEnter={() => setHovered("useradd" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "useradd" + post._id ? (
                <HiUserAdd className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineUserAdd className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
          </div>
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <span className="ms-5 me-5 w-full text-lg font-lg text-[var(--color-rich-black)]">
              {post.content}
            </span>
          </div>
          <div className="mt-5 flex justify-start pt-3 gap-3">
            <span
              onMouseEnter={() => setHovered("heart" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "heart" + post._id ? (
                <HiHeart className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineHeart className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
            <span
              onMouseEnter={() => setHovered("chat" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "chat" + post._id ? (
                <HiChat className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineChat className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
            <span
              onMouseEnter={() => setHovered("share" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "share" + post._id ? (
                <HiShare className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineShare className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
<<<<<<< HEAD:webapp/src/app/comp/postsList.js
<<<<<<< HEAD
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
}

export function PostsList({ posts }) {
  const [hovered, setHovered] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayPosts = posts && posts.length > 0 ? posts : [];

  if (!displayPosts || displayPosts.length === 0) {
    return (
      <div className="w-full max-w-full bg-[var(--color-celestial-blue)] rounded-lg shadow p-6 mb-6 text-[var(--color-seasalt)] opacity-70">
        Aucun post à afficher.
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-6" style={{ "--color-celestial-blue": "#1976c5" }}>
      {displayPosts.map((post) => (
        <div key={post._id} className="flex flex-col gap-4 w-full bg-[var(--color-outer-space)] rounded-xl shadow-lg p-6 border-2 border-[var(--color-sea-green)]">
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <span className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)] mr-3 text-lg">
                {post.username[0]}
              </span>
              <span className="mb-0 text-lg font-bold text-[var(--color-rich-black)]">
                {post.username}
              </span>
              <span className="text-sm text-[var(--color-rich-black)]/70 ms-2">
                {isClient ? timeAgo(post.date) : "\u00A0"}
              </span>
            </div>
            <span
              onMouseEnter={() => setHovered("useradd" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "useradd" + post._id ? (
                <HiUserAdd className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineUserAdd className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <span className="ms-5 me-5 w-full text-lg font-lg text-[var(--color-rich-black)]">
              {post.content}
            </span>
          </div>
          <div className="mt-5 flex justify-start pt-3 gap-3">
            <span
              onMouseEnter={() => setHovered("heart" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "heart" + post._id ? (
                <HiHeart className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineHeart className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
            <span
              onMouseEnter={() => setHovered("chat" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "chat" + post._id ? (
                <HiChat className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineChat className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
            <span
              onMouseEnter={() => setHovered("share" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "share" + post._id ? (
                <HiShare className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineShare className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
=======
>>>>>>> dc16337 (Fin de la page d'accueil)
}
=======
}
>>>>>>> 7db8774 (Rename postsList.js to PostsList.js):webapp/src/app/comp/PostsList.js
