import { useState, useEffect } from "react";
import { HiSearch, HiTrash, HiPencil } from "react-icons/hi";
import { getPosts, updatePost, deletePost } from "../../services/postsServices";
import Image from "next/image";
import Cookies from "js-cookie";

// Composant pour charger une image protégée par cookie
function SecureImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState("/default-avatar.png");

  useEffect(() => {
    if (!src) {
      setImgSrc("/default-avatar.png");
      return;
    }
    let isMounted = true;
    const fetchImage = async () => {
      try {
        const token = Cookies.get("token") || localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(src, {
          credentials: "include",
          headers,
        });
        if (!res.ok) throw new Error("Erreur chargement image");
        const blob = await res.blob();
        if (isMounted) setImgSrc(URL.createObjectURL(blob));
      } catch {
        if (isMounted) setImgSrc("/default-avatar.png");
      }
    };
    fetchImage();
    return () => {
      isMounted = false;
      if (imgSrc && imgSrc.startsWith("blob:")) URL.revokeObjectURL(imgSrc);
    };
    // eslint-disable-next-line
  }, [src]);

  return (
    <div
      className={`${className} flex items-center justify-center bg-gray-100 rounded-lg shadow`}
      style={{ position: "relative", width: 120, height: 120, overflow: "hidden" }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        layout="fill"
        objectFit="contain" // <-- Affiche l'image entière sans crop
        className="transition-transform duration-200 hover:scale-105"
        unoptimized
        sizes="120px"
      />
    </div>
  );
}

// Modale de confirmation suppression
function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-[320px] shadow-lg flex flex-col gap-4 animate-fade-in">
        <div className="font-bold text-lg">Confirmation</div>
        <div>{message}</div>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>Annuler</button>
          <button
            className="px-3 py-1 rounded bg-folly text-white transition-transform duration-150 hover:scale-110 hover:bg-folly/80"
            onClick={onConfirm}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// Modale édition de post
function PostModal({ open, onClose, onSave, initialPost }) {
  const [content, setContent] = useState(initialPost?.content || "");
  const [image, setImage] = useState(initialPost?.image || "");

  useEffect(() => {
    setContent(initialPost?.content || "");
    setImage(initialPost?.image || "");
  }, [initialPost, open]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...initialPost, content, image });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 min-w-[340px] shadow-lg flex flex-col gap-4 animate-fade-in"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-lg">Modifier le post</div>
        <div>
          <label className="block text-sm font-semibold mb-1">Contenu</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Image (URL)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Annuler</button>
          <button type="submit" className="px-3 py-1 rounded bg-folly text-white">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}

const POSTS_PER_PAGE = 4;

export default function AdminPosts() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  // Modales
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    getPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deletePost(id);
    const data = await getPosts();
    setPosts(data);
    setConfirmModalOpen(false);
  };

  const handleSavePost = async (post) => {
    await updatePost(post._id, post);
    const data = await getPosts();
    setPosts(data);
    setPostModalOpen(false);
    setPostToEdit(null);
  };

  const filteredPosts = posts.filter(p =>
    (typeof p.content === "string" && p.content.toLowerCase().includes(search.toLowerCase())) ||
    (typeof p.author === "string" && p.author.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-celestial-blue">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer ce post ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(postToDelete?._id)}
      />
      <PostModal
        open={postModalOpen}
        onClose={() => { setPostModalOpen(false); setPostToEdit(null); }}
        onSave={handleSavePost}
        initialPost={postToEdit}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-celestial-blue">Posts</h2>
      </div>
      <div className="flex items-center gap-2">
        <HiSearch className="text-celestial-blue text-xl" />
        <input
          className="flex-1 rounded px-3 py-2 border border-celestial-blue focus:outline-none focus:ring-2 focus:ring-sea-green"
          placeholder="Rechercher un post..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-seasalt">
        {loading && <li>Chargement...</li>}
        {!loading && paginatedPosts.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun post trouvé.</li>
        )}
        {!loading &&
          paginatedPosts.length > 0 &&
          paginatedPosts.map(p => (
            <li key={p._id} className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-rich-black">{p.content}</span>
                <span className="block text-xs text-sea-green">{p.author}</span>
                {p.image && (
                  <SecureImage src={p.image} alt="post" className="mt-1 max-h-16 rounded" />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition"
                  title="Modifier"
                  onClick={() => { setPostModalOpen(true); setPostToEdit(p); }}
                >
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => { setPostToDelete(p); setConfirmModalOpen(true); }}
                >
                  <HiTrash className="text-white" />
                </button>
              </div>
            </li>
          ))}
      </ul>
      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-2 py-1 rounded bg-gray-200"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Précédent
          </button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 rounded bg-gray-200"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}