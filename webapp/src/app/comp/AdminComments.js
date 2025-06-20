import { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { HiSearch, HiTrash } from "react-icons/hi";
import { getComments, deleteComment } from "../../services/CommentsServices";
=======
import { HiSearch, HiTrash, HiPencil } from "react-icons/hi";
import { getComments, deleteComment, updateComment } from "../../services/commentsServices";

function EditModal({ open, comment, onClose, onSave }) {
  const [content, setContent] = useState(comment?.content || "");

  useEffect(() => {
    setContent(comment?.content || "");
  }, [comment]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-[320px] shadow-lg flex flex-col gap-4 animate-fade-in">
        <h3 className="font-bold text-lg">Éditer le commentaire</h3>
        <textarea
          className="border rounded p-2 w-full"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Annuler</button>
          <button
            className="px-3 py-1 rounded bg-sea-green text-white transition-transform duration-150 hover:scale-110 hover:bg-sea-green/80"
            onClick={() => onSave({ ...comment, content })}
            disabled={content.trim() === ""}
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
import { HiSearch, HiTrash } from "react-icons/hi";
<<<<<<< HEAD
import { getComments, deleteComment } from "../../services/commentsServices";
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
=======
import { getComments, deleteComment } from "../../services/CommentsServices";
>>>>>>> a177e93 (feat : fix pour le merge)

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

<<<<<<< HEAD
<<<<<<< HEAD
const COMMENTS_PER_PAGE = 8;

=======
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
const COMMENTS_PER_PAGE = 8;

>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
export default function AdminComments() {
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
<<<<<<< HEAD
  // Pagination
  const [page, setPage] = useState(1);
=======
  // Modale édition
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
  // Pagination
  const [page, setPage] = useState(1);
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)

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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  const handleEdit = async (updatedComment) => {
    await updateComment(updatedComment._id, { content: updatedComment.content });
    setComments(comments =>
      comments.map(c => c._id === updatedComment._id ? { ...c, content: updatedComment.content } : c)
    );
    setEditModalOpen(false);
  };

=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
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
<<<<<<< HEAD
      <EditModal
        open={editModalOpen}
        comment={commentToEdit}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEdit}
      />
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
        {loading && <li>Chargement...</li>}
        {!loading && paginatedComments.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun commentaire trouvé.</li>
        )}
        {!loading &&
          paginatedComments.length > 0 &&
          paginatedComments.map(c => (
<<<<<<< HEAD
            <li key={c._id} className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-rich-black">{c.content}</span>
                <span className="block text-xs text-sea-green">{c.author} sur &quot;{c.post}&quot;</span>
              </div>
              <div className="flex gap-2">
                <button
=======
        {(() => {
          if (loading) {
            return <li>Chargement...</li>;
          }
          if (filteredComments.length === 0) {
            return <li className="text-xs text-folly py-2">Aucun commentaire trouvé.</li>;
          }
          return filteredComments.map(c => (
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
            <li key={c._id} className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-rich-black">{c.content}</span>
                <span className="block text-xs text-sea-green">{c.author} sur &quot;{c.post}&quot;</span>
              </div>
              <div className="flex gap-2">
                <button
<<<<<<< HEAD
                  className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition"
                  title="Modifier"
                  onClick={() => { setCommentToEdit(c); setEditModalOpen(true); }}
                >
                  <HiPencil className="text-white" />
                </button>
                <button
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => { setCommentToDelete(c); setConfirmModalOpen(true); }}
                >
                  <HiTrash className="text-white" />
                </button>
              </div>
            </li>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          ));
        })()}
      </ul>
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
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
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
    </div>
  );
}