import { useState, useEffect } from "react";
import { HiSearch, HiTrash } from "react-icons/hi";
import { getComments, deleteComment } from "../../services/commentsServices";

function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-opacity-5s backdrop-blur-sm flex items-center justify-center z-50">
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

const COMMENTS_PER_PAGE = 8;

export default function AdminComments() {
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  // Modale suppression
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    getComments().then(data => {
      setComments(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteComment(id);
    setComments(comments => comments.filter(c => c._id !== id));
    setConfirmModalOpen(false);
  };

  const filteredComments = comments.filter(c =>
    (c.content?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (c.author?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (c.post?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (c._id?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredComments.length / COMMENTS_PER_PAGE);
  const paginatedComments = filteredComments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-celestial-blue">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer ce commentaire ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(commentToDelete?._id)}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-celestial-blue">Commentaires</h2>
      </div>
      <div className="flex items-center gap-2">
        <HiSearch className="text-celestial-blue text-xl" />
        <input
          className="flex-1 rounded px-3 py-2 border border-celestial-blue focus:outline-none focus:ring-2 focus:ring-sea-green"
          placeholder="Rechercher un commentaire..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-seasalt">
        {loading && <li>Chargement...</li>}
        {!loading && paginatedComments.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun commentaire trouvé.</li>
        )}
        {!loading &&
          paginatedComments.length > 0 &&
          paginatedComments.map(c => (
            <li key={c._id} className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-rich-black">{c.content}</span>
                <span className="block text-xs text-sea-green">{c.author} sur &quot;{c.post}&quot;</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => { setCommentToDelete(c); setConfirmModalOpen(true); }}
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