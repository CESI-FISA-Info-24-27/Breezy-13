import { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { HiSearch, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { getRoles, createRole, updateRole, deleteRole } from "../../services/RolesServices";
<<<<<<< HEAD
=======
import { HiSearch, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
<<<<<<< HEAD
import { getRoles, createRole, updateRole, deleteRole } from "../../services/rolesServices";
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
=======
import { getRoles, createRole, updateRole, deleteRole } from "../../services/RolesServices";
>>>>>>> a177e93 (feat : fix pour le merge)
=======
>>>>>>> 7ea8f23 (feat : fix pour le merge)

// Fonction utilitaire pour compléter les permissions manquantes
function buildCompletePermissions(partialPermissions) {
  const allResources = ["/roles", "/users", "/posts", "/comments", "/follows", "/auth"];
  const allMethods = ["GET", "POST", "PUT", "DELETE"];
  const complete = {};
  for (const resource of allResources) {
    complete[resource] = {};
    for (const method of allMethods) {
      // Certains endpoints n'ont pas tous les verbes (ex: /auth n'a que POST)
      if (resource === "/auth" && method !== "POST") continue;
      complete[resource][method] = !!(partialPermissions?.[resource]?.[method]);
    }
  }
  return complete;
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

// Modale création/édition de rôle
function RoleModal({ open, onClose, onSave, initialRole }) {
  const [name, setName] = useState(initialRole?.name || "");
  const [permissions, setPermissions] = useState(initialRole?.permissions || {});

  useEffect(() => {
    setName(initialRole?.name || "");
    setPermissions(initialRole?.permissions || {});
  }, [initialRole, open]);

  // Pour simplifier, on affiche les permissions sous forme de cases à cocher
  const allResources = ["/roles", "/users", "/posts", "/comments", "/follows", "/auth"];
  const allMethods = ["GET", "POST", "PUT", "DELETE"];

  function handlePermissionChange(resource, method, value) {
    setPermissions(prev => ({
      ...prev,
      [resource]: {
        ...prev[resource],
        [method]: value
      }
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const completePermissions = buildCompletePermissions(permissions);
    onSave({ name, permissions: completePermissions });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 min-w-[340px] shadow-lg flex flex-col gap-4 animate-fade-in"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-lg">{initialRole ? "Modifier le rôle" : "Créer un rôle"}</div>
        <div>
          <label className="block text-sm font-semibold mb-1">Nom du rôle</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Permissions</label>
          <div className="overflow-x-auto">
            <table className="text-xs border">
              <thead>
                <tr>
                  <th className="p-1 border"></th>
                  {allMethods.map(m => (
                    <th key={m} className="p-1 border">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allResources.map(resource => (
                  <tr key={resource}>
                    <td className="p-1 border">{resource}</td>
                    {allMethods.map(method => (
                      <td key={method} className="p-1 border text-center">
                        {/* On n'affiche la case à cocher que si la méthode est valide pour la ressource */}
                        {!(resource === "/auth" && method !== "POST") ? (
                          <input
                            type="checkbox"
                            checked={!!permissions?.[resource]?.[method]}
                            onChange={e => handlePermissionChange(resource, method, e.target.checked)}
                          />
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Annuler</button>
          <button type="submit" className="px-3 py-1 rounded bg-folly text-white">{initialRole ? "Enregistrer" : "Créer"}</button>
        </div>
      </form>
    </div>
  );
}

const ROLES_PER_PAGE = 10;
<<<<<<< HEAD
=======
import { HiSearch, HiPencil, HiPlus } from "react-icons/hi";
import { getRoles } from "../../services/rolesServices";
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)

export default function AdminRoles() {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  // Pagination
  const [page, setPage] = useState(1);

  // Modales
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

<<<<<<< HEAD
=======
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  useEffect(() => {
    getRoles().then(data => {
      setRoles(data);
      setLoading(false);
    });
  }, []);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  const handleDelete = async (id) => {
    await deleteRole(id);
    const data = await getRoles();
    setRoles(data);
    setConfirmModalOpen(false);
  };

  const handleSaveRole = async (role) => {
    if (roleToEdit) {
      await updateRole(roleToEdit._id, role);
    } else {
      await createRole(role);
    }
    // Recharge la liste depuis l'API pour être sûr d'avoir les bons rôles
    const data = await getRoles();
    setRoles(data);
    setRoleModalOpen(false);
    setRoleToEdit(null);
  };

  // Correction ici : on vérifie que r.name est bien une string avant d'appeler toLowerCase()
<<<<<<< HEAD
  const filteredRoles = roles.filter(r =>
    typeof r?.name === "string" && r.name && r.name.toLowerCase().includes(search.toLowerCase()) ||
    typeof r?._id === "string" && r._id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredRoles.length / ROLES_PER_PAGE);
  const paginatedRoles = filteredRoles.slice(
    (page - 1) * ROLES_PER_PAGE,
    page * ROLES_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-folly">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer ce rôle ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(roleToDelete?._id)}
      />
      <RoleModal
        open={roleModalOpen}
        onClose={() => { setRoleModalOpen(false); setRoleToEdit(null); }}
        onSave={handleSaveRole}
        initialRole={roleToEdit}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-folly">Rôles</h2>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-folly hover:bg-celestial-blue text-seasalt transition text-sm font-semibold"
          title="Ajouter un rôle"
          onClick={() => { setRoleModalOpen(true); setRoleToEdit(null); }}
        >
=======
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  const filteredRoles = roles.filter(r =>
    typeof r?.name === "string" && r.name && r.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredRoles.length / ROLES_PER_PAGE);
  const paginatedRoles = filteredRoles.slice(
    (page - 1) * ROLES_PER_PAGE,
    page * ROLES_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-folly">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer ce rôle ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(roleToDelete?._id)}
      />
      <RoleModal
        open={roleModalOpen}
        onClose={() => { setRoleModalOpen(false); setRoleToEdit(null); }}
        onSave={handleSaveRole}
        initialRole={roleToEdit}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-folly">Rôles</h2>
<<<<<<< HEAD
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-folly hover:bg-celestial-blue text-seasalt transition text-sm font-semibold" title="Ajouter un rôle">
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-folly hover:bg-celestial-blue text-seasalt transition text-sm font-semibold"
          title="Ajouter un rôle"
          onClick={() => { setRoleModalOpen(true); setRoleToEdit(null); }}
        >
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
          <HiPlus /> Ajouter
        </button>
      </div>
      <div className="flex items-center gap-2">
        <HiSearch className="text-folly text-xl" />
        <input
          className="flex-1 rounded px-3 py-2 border border-folly focus:outline-none focus:ring-2 focus:ring-celestial-blue"
          placeholder="Rechercher un rôle..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-seasalt">
        {loading && <li>Chargement...</li>}
<<<<<<< HEAD
<<<<<<< HEAD
        {!loading && paginatedRoles.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun rôle trouvé.</li>
        )}
        {!loading &&
          paginatedRoles.length > 0 &&
          paginatedRoles.map(r => (
            <li key={r._id} className="flex justify-between items-center py-2">
              <span className="font-semibold text-rich-black">{r.name}</span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-folly hover:bg-celestial-blue transition"
                  title="Modifier"
                  onClick={() => { setRoleModalOpen(true); setRoleToEdit(r); }}
                >
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => { setRoleToDelete(r); setConfirmModalOpen(true); }}
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
=======
        {!loading && filteredRoles.length === 0 && (
=======
        {!loading && paginatedRoles.length === 0 && (
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
          <li className="text-xs text-folly py-2">Aucun rôle trouvé.</li>
        )}
        {!loading &&
          paginatedRoles.length > 0 &&
          paginatedRoles.map(r => (
            <li key={r._id} className="flex justify-between items-center py-2">
              <span className="font-semibold text-rich-black">{r.name}</span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-folly hover:bg-celestial-blue transition"
                  title="Modifier"
                  onClick={() => { setRoleModalOpen(true); setRoleToEdit(r); }}
                >
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => { setRoleToDelete(r); setConfirmModalOpen(true); }}
                >
                  <HiTrash className="text-white" />
                </button>
              </div>
            </li>
          ))}
      </ul>
<<<<<<< HEAD
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
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