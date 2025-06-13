import { useState, useEffect } from "react";
import { HiSearch, HiPencil, HiPlus } from "react-icons/hi";
import { getRoles } from "../../services/rolesServices";

export default function AdminRoles() {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles().then(data => {
      setRoles(data);
      setLoading(false);
    });
  }, []);

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-folly">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-folly">Rôles</h2>
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-folly hover:bg-celestial-blue text-seasalt transition text-sm font-semibold" title="Ajouter un rôle">
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
        {!loading && filteredRoles.length === 0 && (
          <li className="text-xs text-folly py-2">Aucun rôle trouvé.</li>
        )}
        {!loading &&
          filteredRoles.length > 0 &&
          filteredRoles.map(r => (
            <li key={r._id} className="flex justify-between items-center py-2">
              <span className="font-semibold text-rich-black">{r.name}</span>
              <button className="p-2 rounded-full bg-folly hover:bg-celestial-blue transition" title="Modifier">
                <HiPencil className="text-white" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}