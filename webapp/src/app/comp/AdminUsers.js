import { useState, useEffect } from "react";
import { HiSearch, HiUserRemove, HiUserAdd, HiPencil } from "react-icons/hi";
import { getUsers, deleteUser } from "../../services/usersServices";
import Cookies from "js-cookie";

function ProtectedAvatar({ src, alt }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    let url = null;
    async function fetchImage() {
      if (!src) return;
      try {
        const token = Cookies.get("token") || localStorage.getItem("token");
        const res = await fetch(src, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        setImgUrl(url);
      } catch {
        setImgUrl("/default-avatar.png");
      }
    }
    fetchImage();
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [src]);

  return (
    <img
      src={imgUrl || "/default-avatar.png"}
      alt={alt}
      className="w-12 h-12 rounded-full object-cover border border-sea-green"
    />
  );
}

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users => users.filter(u => u._id !== id));
  };

  const filteredUsers = users.filter(u =>
    (u.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-sea-green">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-sea-green">Utilisateurs</h2>
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-sea-green hover:bg-celestial-blue text-seasalt transition text-sm font-semibold" title="Ajouter un utilisateur">
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
                <div>
                  <div className="font-semibold text-rich-black">{u.username}</div>
                  <div className="text-xs text-celestial-blue">{u.email}</div>
                  <div className="text-xs text-sea-green">{u.bio}</div>
                  <div className="text-xs text-folly">
                    Rôle : {u.role_id}
                  </div>
                  <div className="text-xs text-gray-400">
                    Créé le : {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition" title="Modifier">
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => handleDelete(u._id)}
                >
                  <HiUserRemove className="text-white" />
                </button>
              </div>
            </li>
          ));
        })()}
      </ul>
    </div>
  );
}