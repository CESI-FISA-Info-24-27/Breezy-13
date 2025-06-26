"use client";

import {
  HiOutlineUserAdd,
  HiUserAdd,
  HiOutlineShare,
  HiShare,
  HiChat,
  HiOutlineChat,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { getUsers } from "../../services/UsersServices";
import { updatePost } from "../../services/PostsServices";
import SecureMedia from "../comp/SecureMedia";

const userID = "685c057e357c56a715532772";

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
}

export function PostsList({ posts }) {
  const [hovered, setHovered] = useState("");
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!posts || posts.length === 0) return;

      // On veut formatter les postes en fonction de ce qu'on doit afficher
      // On commence par récupérer la liste d'utilisateur
      let userIDs = posts.map((item) => item.author);

      // On récupère les utilisateurs associés
      let users = await getUsers({ id: userIDs });

      // On fusionne les informations nécessaires dans displayPosts
      let tempDisplayPosts = posts.map((element) => {
        let selectedUser = users.find((item) => item._id === element.author);
        return {
          _id: element._id,
          author: selectedUser?.username || "Inconnu",
          authorID: selectedUser?._id,
          profilPic: selectedUser?.avatar || "",
          content: element.content,
          image: element.image,
          likes: element.likes,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        };
      });

      setDisplayPosts(tempDisplayPosts);
    };

    fetchPosts();
    setIsClient(true);
  }, [posts]);

  function likePost(postId) {
    setDisplayPosts((prevPosts) => 
      prevPosts.map((post) => 
      {
        if (post._id === postId) {
          const hasLiked = post.likes.includes(userID);
          const updatedLikes = hasLiked ? post.likes.filter(id => id !== userID) : [...post.likes, userID];

          // On met à jour l'API
          const updatedPost = {
            _id: post._id,
            author: post.authorID,
            content: post.content,
            image: post.image,
            likes: updatedLikes,
            createdAt: post.createdAt
          }
          updatePost(postId, updatedPost);

          return { ...post, likes: updatedLikes };
        }

        return post;
      })
    );
  }

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
              <li
                key={post._id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--color-seasalt)]/10 text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20 transition font-medium"
              >
                <SecureMedia
                  fileName={post.profilPic}
                  type="image"
                  alt="avatar"
                  className="w-8 h-8 max-w-[200px] max-h-[200px] rounded-full object-cover border"
                />
                <span className="truncate text-sm text-[var(--color-rich-black)]/70 ms-2">
                  {post.author}
                </span>
              </li>
              <span className="text-sm text-[var(--color-rich-black)]/70 ms-2">
                {isClient ? timeAgo(post.createdAt) : ""}
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
            {post.image ? (
              <SecureMedia
                fileName={post.image}
                type="image"
                alt="image"
                className=""
              />
            ) : (
              <div></div>
            )}
            <span className="ms-5 me-5 w-full text-lg font-lg text-[var(--color-rich-black)]">
              {post.content}
            </span>
          </div>
          <div className="mt-5 flex justify-start pt-3 gap-3">
            <button onClick={() => likePost(post._id)}>
              <span
                onMouseEnter={() => setHovered("heart" + post._id)}
                onMouseLeave={() => setHovered("")}
                className="cursor-pointer"
              >
                  <div className="flex flex-col items-center">
                      {hovered === "heart" + post._id ||
                      post.likes.includes(userID) ? (
                        <HiHeart className="text-[var(--color-celestial-blue)] text-2xl" />
                      ) : (
                        <HiOutlineHeart className="text-[var(--color-celestial-blue)] text-2xl" />
                      )}

                    {post.likes.length > 0 ? (
                      <span className="text-sm font-small text-[var(--color-celestial-blue)] mt-1 leading-none">
                        {post.likes.length}
                      </span>
                    ) : (
                      <div className="h-4"></div>
                    )}
                  </div>
              </span>
            </button>
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
            {/*<span
              onMouseEnter={() => setHovered("share" + post._id)}
              onMouseLeave={() => setHovered("")}
              className="cursor-pointer"
            >
              {hovered === "share" + post._id ? (
                <HiShare className="text-[var(--color-celestial-blue)] text-2xl" />
              ) : (
                <HiOutlineShare className="text-[var(--color-celestial-blue)] text-2xl" />
              )}
            </span>*/}
          </div>
        </div>
      ))}
    </div>
  );
}
