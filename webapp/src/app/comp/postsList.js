"use client";

import Image from "next/image";
import { HiOutlineUserAdd, HiUserAdd, HiOutlineShare, HiShare, HiChat, HiOutlineChat, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useState } from "react";

export function PostsList({ posts }) {
  const [hovered, setHovered] = useState("");

  // Valeur par défaut pour tester si aucune prop n'est passée
  const demoPosts = [
    { _id: "1", username: "eloncuck", avatar: "/logo.png", content: "Achetez mes voitures !" },
    { _id: "2", username: "billgrates", avatar: "/logo.png", content: "Windows c'est mieux." },
    { _id: "3", username: "terracist", avatar: "/logo.png", content: "TwiX c'était mieux avant." },
    { _id: "4", username: "arkuni", avatar: "/logo.png", content: "TwiX<Beak" }
  ];
  const displayPosts = posts && posts.length > 0 ? posts : demoPosts;

  if (!displayPosts || displayPosts.length === 0) {
    return (
      <div className="w-full max-w-full bg-[var(--color-celestial-blue)] rounded-lg shadow p-6 mb-6 text-[var(--color-seasalt)] opacity-70">
        Aucun post à afficher.
      </div>
    );
  }

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
          {/* <hr className="border-[var(--color-celestial-blue)]/30" /> */
          //Je sais pas si on la garde celle la
          }
          <div>
            <span className="ms-5 me-5 w-full text-lg font-lg text-[var(--color-rich-black)]">
              {post.content}
            </span>
          </div>
          <div className="mt-5 flex justify-start pt-3 gap-3">
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
          </div>
        </div>
      ))}
    </div>
  );
}