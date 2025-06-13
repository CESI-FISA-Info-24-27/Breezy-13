import { useState, useEffect } from "react";
import { HiSearch, HiTrash, HiPencil } from "react-icons/hi";
import { getPosts, deletePost } from "../../services/postsServices";

export default function AdminPosts() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts => posts.filter(p => p._id !== id));
  };

  const filteredPosts = posts.filter(p =>
    p.content?.toLowerCase().includes(search.toLowerCase()) ||
    p.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-t-4 border-celestial-blue">
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
        {(() => {
          if (loading) {
            return <li>Chargement...</li>;
          }
          if (filteredPosts.length === 0) {
            return <li className="text-xs text-folly py-2">Aucun post trouvé.</li>;
          }
          return filteredPosts.map(p => (
            <li key={p._id} className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-rich-black">{p.content}</span>
                <span className="block text-xs text-sea-green">{p.author}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-celestial-blue hover:bg-sea-green transition" title="Modifier">
                  <HiPencil className="text-white" />
                </button>
                <button
                  className="p-2 rounded-full bg-folly hover:bg-rich-black transition"
                  title="Supprimer"
                  onClick={() => handleDelete(p._id)}
                >
                  <HiTrash className="text-white" />
                </button>
              </div>
            </li>
          ));
        })()}
      </ul>
    </div>
  );
}