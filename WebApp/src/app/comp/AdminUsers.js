import { useState, useEffect } from "react";
import { HiSearch, HiUserRemove, HiUserAdd, HiPencil } from "react-icons/hi";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { getUsers, createUser, updateUser, deleteUser } from "../../services/UsersServices";
import { getRoles } from "../../services/RolesServices";
import Image from "next/image";
import Cookies from "js-cookie";

// Composant pour charger un avatar protégé par cookie
function SecureAvatar({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState("/default-avatar.png");
  const [size, setSize] = useState({ width: 48, height: 48 }); // Valeurs par défaut

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
        if (!res.ok) throw new Error("Erreur chargement avatar");
        const blob = await res.blob();
        if (isMounted) {
          const objectUrl = URL.createObjectURL(blob);
          setImgSrc(objectUrl);

          // Récupérer la taille de l'image pour garder le ratio
          const img = new window.Image();
          img.onload = () => setSize({ width: img.width, height: img.height });
          img.src = objectUrl;
        }
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
    <Image
      src={imgSrc}
      alt={alt}
      width={size.width}
      height={size.height}
      className={className}
      unoptimized
=======
import { getUsers, deleteUser } from "../../services/usersServices";
=======
import { getUsers, createUser, updateUser, deleteUser } from "../../services/usersServices";
import { getRoles } from "../../services/rolesServices";
<<<<<<< HEAD
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
=======
=======
import { getUsers, createUser, updateUser, deleteUser } from "../../services/UsersServices";
import { getRoles } from "../../services/RolesServices";
>>>>>>> a177e93 (feat : fix pour le merge)
=======
import { getUsers, createUser, updateUser, deleteUser } from "../../services/UsersServices";
import { getRoles } from "../../services/RolesServices";
>>>>>>> 7ea8f23 (feat : fix pour le merge)
=======
import { getUsers, createUser, updateUser, deleteUser } from "../../services/UsersServices";
import { getRoles } from "../../services/RolesServices";
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
import Image from "next/image";
>>>>>>> 3b5e475 (fix: Correction balise img et  ' dans les titres)
import Cookies from "js-cookie";

// Composant pour charger un avatar protégé par cookie
function SecureAvatar({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState("/default-avatar.png");
  const [size, setSize] = useState({ width: 48, height: 48 }); // Valeurs par défaut

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
        if (!res.ok) throw new Error("Erreur chargement avatar");
        const blob = await res.blob();
        if (isMounted) {
          const objectUrl = URL.createObjectURL(blob);
          setImgSrc(objectUrl);

          // Récupérer la taille de l'image pour garder le ratio
          const img = new window.Image();
          img.onload = () => setSize({ width: img.width, height: img.height });
          img.src = objectUrl;
        }
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
    <Image
      src={imgSrc}
      alt={alt}
      width={size.width}
      height={size.height}
      className={className}
      unoptimized
    />
  );
}

// Modale de confirmation suppression
function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
<<<<<<< HEAD
    <img
      src={imgUrl || "/default-avatar.png"}
      alt={alt}
      className="w-12 h-12 rounded-full object-cover border border-sea-green"
>>>>>>> bbfb259 (Component pour la page admin #22)
    />
  );
}

<<<<<<< HEAD
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

=======
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

>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
// Modale création/édition d'utilisateur
function UserModal({ open, onClose, onSave, initialUser, roles }) {
  const [username, setUsername] = useState(initialUser?.username || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(initialUser?.avatar || "");
  const [bio, setBio] = useState(initialUser?.bio || "");
  const [role_id, setRoleId] = useState(initialUser?.role_id || "");

  useEffect(() => {
    setUsername(initialUser?.username || "");
    setEmail(initialUser?.email || "");
    setPassword("");
    setAvatar(initialUser?.avatar || "");
    setBio(initialUser?.bio || "");
    setRoleId(initialUser?.role_id || "");
  }, [initialUser, open]);

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username.trim(),
      email: email.trim(),
      avatar: avatar.trim(),
      bio: bio.trim(),
      role_id,
    };
    if (!initialUser && password) user.password = password;
    else if (password) user.password = password;
    onSave(user);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg p-6 min-w-[340px] shadow-lg flex flex-col gap-4 animate-fade-in"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="font-bold text-lg">{initialUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</div>
        <div>
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="block text-sm font-semibold mb-1">Nom d&apos;utilisateur</label>
=======
          <label className="block text-sm font-semibold mb-1">Nom d'utilisateur</label>
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
=======
          <label className="block text-sm font-semibold mb-1">Nom d&apos;utilisateur</label>
>>>>>>> 3b5e475 (fix: Correction balise img et  ' dans les titres)
          <input className="w-full border rounded px-3 py-2" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Mot de passe {initialUser ? "(laisser vide pour ne pas changer)" : ""}</label>
          <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} autoComplete="new-password" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Avatar (URL)</label>
          <input className="w-full border rounded px-3 py-2" value={avatar} onChange={e => setAvatar(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Bio</label>
          <input className="w-full border rounded px-3 py-2" value={bio} onChange={e => setBio(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Rôle</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={role_id}
            onChange={e => setRoleId(e.target.value)}
            required
          >
            <option value="">Sélectionner un rôle</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>Annuler</button>
          <button type="submit" className="px-3 py-1 rounded bg-folly text-white">{initialUser ? "Enregistrer" : "Créer"}</button>
        </div>
      </form>
    </div>
  );
}

const USERS_PER_PAGE = 4;

<<<<<<< HEAD
export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  // Modales
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

=======
=======
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
  // Pagination
  const [page, setPage] = useState(1);

  // Modales
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
<<<<<<< HEAD
<<<<<<< HEAD
    getRoles().then(data => setRoles(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const data = await getUsers();
      setUsers(data);
      setConfirmModalOpen(false);
    } catch (err) {
      alert("Erreur lors de la suppression : " + (err?.response?.data?.error || err.message));
      console.error("Erreur suppression :", err?.response?.data || err);
    }
  };

  const handleSaveUser = async (user) => {
    const { _id, createdAt, updatedAt, ...userToSend } = user;
    if (!userToSend.password) delete userToSend.password;

    try {
      if (userToEdit) {
        await updateUser(userToEdit._id, userToSend);
      } else {
        await createUser(userToSend);
      }
      const data = await getUsers();
      setUsers(data);
      setUserModalOpen(false);
      setUserToEdit(null);
    } catch (err) {
      alert("Erreur API : " + (err?.response?.data?.error || JSON.stringify(err?.response?.data) || err.message));
      console.error("Erreur API :", err?.response?.data || err);
    }
=======
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users => users.filter(u => u._id !== id));
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
    getRoles().then(data => setRoles(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const data = await getUsers();
      setUsers(data);
      setConfirmModalOpen(false);
    } catch (err) {
      alert("Erreur lors de la suppression : " + (err?.response?.data?.error || err.message));
      console.error("Erreur suppression :", err?.response?.data || err);
    }
  };

  const handleSaveUser = async (user) => {
    const { _id, createdAt, updatedAt, ...userToSend } = user;
    if (!userToSend.password) delete userToSend.password;

    try {
      if (userToEdit) {
        await updateUser(userToEdit._id, userToSend);
      } else {
        await createUser(userToSend);
      }
      const data = await getUsers();
      setUsers(data);
      setUserModalOpen(false);
      setUserToEdit(null);
    } catch (err) {
      alert("Erreur API : " + (err?.response?.data?.error || JSON.stringify(err?.response?.data) || err.message));
      console.error("Erreur API :", err?.response?.data || err);
    }
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
  };

  const filteredUsers = users.filter(u =>
    (u.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 20f1ba1 (feat: Ajout des filtres par _id)
    (u.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (u._id?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-sea-green">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer cet utilisateur ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(userToDelete?._id)}
      />
      <UserModal
        open={userModalOpen}
        onClose={() => { setUserModalOpen(false); setUserToEdit(null); }}
        onSave={handleSaveUser}
        initialUser={userToEdit}
        roles={roles}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-sea-green">Utilisateurs</h2>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-sea-green hover:bg-celestial-blue text-seasalt transition text-sm font-semibold"
          title="Ajouter un utilisateur"
          onClick={() => { setUserModalOpen(true); setUserToEdit(null); }}
        >
=======
    (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  // Pagination calcul
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  // Remettre à la page 1 si la recherche change
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-sea-green">
      <ConfirmModal
        open={confirmModalOpen}
        message="Voulez-vous vraiment supprimer cet utilisateur ?"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete(userToDelete?._id)}
      />
      <UserModal
        open={userModalOpen}
        onClose={() => { setUserModalOpen(false); setUserToEdit(null); }}
        onSave={handleSaveUser}
        initialUser={userToEdit}
        roles={roles}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-sea-green">Utilisateurs</h2>
<<<<<<< HEAD
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-sea-green hover:bg-celestial-blue text-seasalt transition text-sm font-semibold" title="Ajouter un utilisateur">
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
        <button
          className="flex items-center gap-1 px-3 py-1 rounded bg-sea-green hover:bg-celestial-blue text-seasalt transition text-sm font-semibold"
          title="Ajouter un utilisateur"
          onClick={() => { setUserModalOpen(true); setUserToEdit(null); }}
        >
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
          <HiUserAdd /> Ajouter
        </button>
      </div>
      <div className="flex items-center gap-2">
        <HiSearch className="text-sea-green text-xl" />
        <input
          className="flex-1 rounded px-3 py-2 border border-sea-green focus:outline-none focus:ring-2 focus:ring-celestial-blue"
          placeholder="Rechercher un utilisateur..."
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
        {!loading && paginatedUsers.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun utilisateur trouvé.</li>
        )}
        {!loading &&
          paginatedUsers.length > 0 &&
          paginatedUsers.map(u => (
<<<<<<< HEAD
            <li key={u._id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                <SecureAvatar
                  src={u.avatar}
                  alt={u.username}
                  className="w-12 h-12 rounded-full object-cover border border-sea-green"
                />
=======
        {(() => {
          if (loading) {
            return <li>Chargement...</li>;
          }
          if (filteredUsers.length === 0) {
            return <li className="text-xs text-folly py-2">Aucun utilisateur trouvé.</li>;
          }
          return filteredUsers.map(u => (
            <li key={u._id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                <ProtectedAvatar src={u.avatar} alt={u.username} />
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
            <li key={u._id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                <SecureAvatar
                  src={u.avatar}
                  alt={u.username}
                  className="w-12 h-12 rounded-full object-cover border border-sea-green"
                />
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
                <div>
                  <div className="font-semibold text-rich-black">{u.username}</div>
                  <div className="text-xs text-celestial-blue">{u.email}</div>
                  <div className="text-xs text-sea-green">{u.bio}</div>
                  <div className="text-xs text-folly">
<<<<<<< HEAD
<<<<<<< HEAD
                    Rôle : {roles.find(r => r._id === u.role_id)?.name || u.role_id}
=======
                    Rôle : {u.role_id}
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
                    Rôle : {roles.find(r => r._id === u.role_id)?.name || u.role_id}
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
                  </div>
                  <div className="text-xs text-gray-400">
                    Créé le : {new Date(u.createdAt).toLocaleDateString()}
                  </div>
<<<<<<< HEAD
<<<<<<< HEAD
                  <div className="text-xs text-gray-400">
                    Modifié le : {new Date(u.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition"
                  title="Modifier"
                  onClick={() => { setUserModalOpen(true); setUserToEdit(u); }}
                >
=======
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition" title="Modifier">
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
                  <div className="text-xs text-gray-400">
                    Modifié le : {new Date(u.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition"
                  title="Modifier"
                  onClick={() => { setUserModalOpen(true); setUserToEdit(u); }}
                >
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
<<<<<<< HEAD
<<<<<<< HEAD
                  onClick={() => { setUserToDelete(u); setConfirmModalOpen(true); }}
=======
                  onClick={() => handleDelete(u._id)}
>>>>>>> bbfb259 (Component pour la page admin #22)
=======
                  onClick={() => { setUserToDelete(u); setConfirmModalOpen(true); }}
>>>>>>> cf34fc3 (feat: Finalisation des components de la page d'administration)
                >
                  <HiUserRemove className="text-white" />
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