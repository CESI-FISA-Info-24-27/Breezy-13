import { HiUserGroup, HiDocumentText, HiChatAlt2 } from "react-icons/hi";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { getUsers } from "../../services/usersServices";
import { getPosts } from "../../services/postsServices";
import { getComments } from "../../services/commentsServices";
import { getFollows } from "../../services/followsServices";

const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then(mod => mod.default),
  { ssr: false }
);

const MAX_USERS_DISPLAYED = 200; // Limite d'utilisateurs affichés sur le graphe

export default function AdminStats() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userNodes, setUserNodes] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  // Pour filtrage dynamique complet
  const [allUsers, setAllUsers] = useState([]);
  const [allFollows, setAllFollows] = useState([]);

  // Pour la recherche utilisateur
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const graphRef = useRef(null);
  // Hauteur augmentée et responsive
  const [dimensions, setDimensions] = useState({ width: 600, height: 450 });

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [users, posts, comments, follows] = await Promise.all([
        getUsers(),
        getPosts(),
        getComments(),
        getFollows()
      ]);
      setUserCount(users.length);
      setPostCount(posts.length);
      setCommentCount(comments.length);

      setAllUsers(users);
      setAllFollows(follows);

      // Par défaut, on affiche un sous-ensemble
      const displayedUsers = users.slice(0, MAX_USERS_DISPLAYED);
      const displayedIds = new Set(displayedUsers.map(u => u._id));

      setUserNodes(displayedUsers.map(u => ({
        id: u._id,
        label: u.username || u.email || u._id,
        group: u.role_id || 1
      })));

      setUserLinks(
        follows
          .filter(f => displayedIds.has(f.follower) && displayedIds.has(f.following))
          .map(f => ({
            source: f.follower,
            target: f.following
          }))
      );
      setLoading(false);
    }
    fetchAll();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (graphRef.current) {
        setDimensions({
          width: graphRef.current.offsetWidth,
          height: Math.max(graphRef.current.offsetHeight, 600),
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recherche utilisateur
  useEffect(() => {
    if (search.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    const lower = search.trim().toLowerCase();
    setSearchResults(
      allUsers
        .filter(
          u =>
            (u.username && u.username.toLowerCase().includes(lower)) ||
            (u.email && u.email.toLowerCase().includes(lower))
        )
        .slice(0, 10)
    );
  }, [search, allUsers]);

  // UX : filtrage dynamique des liens selon le nœud sélectionné
  let filteredNodes = userNodes;
  let filteredLinks = userLinks;

  if (selectedUser) {
    // Affiche tous les voisins directs du user sélectionné, même hors du sous-ensemble initial
    const links = allFollows
      .filter(l => l.follower === selectedUser.id || l.following === selectedUser.id)
      .map(l => ({
        source: l.follower,
        target: l.following
      }));

    const neighborIds = new Set([
      selectedUser.id,
      ...links.map(l => l.source),
      ...links.map(l => l.target)
    ]);

    filteredNodes = allUsers
      .filter(u => neighborIds.has(u._id))
      .map(u => ({
        id: u._id,
        label: u.username || u.email || u._id,
        group: u.role_id || 1
      }));

    filteredLinks = links;
  }

  const userGraph = {
    nodes: filteredNodes,
    links: filteredLinks
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<HiUserGroup className="text-celestial-blue text-4xl" />}
          value={loading ? "..." : userCount}
          label="Utilisateurs"
          borderColor="border-celestial-blue"
          textColor="text-celestial-blue"
        />
        <StatCard
          icon={<HiDocumentText className="text-sea-green text-4xl" />}
          value={loading ? "..." : postCount}
          label="Posts"
          borderColor="border-sea-green"
          textColor="text-sea-green"
        />
        <StatCard
          icon={<HiChatAlt2 className="text-folly text-4xl" />}
          value={loading ? "..." : commentCount}
          label="Commentaires"
          borderColor="border-folly"
          textColor="text-folly"
        />
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border-t-4 border-celestial-blue">
        <h3 className="text-lg font-bold text-celestial-blue mb-4">
          Réseau des utilisateurs
          <span className="ml-2 text-xs text-gray-400">
            (clique sur un utilisateur pour voir ses liens)
          </span>
        </h3>
        {/* Barre de recherche utilisateur */}
        <div className="mb-4 flex flex-col gap-2 max-w-xs">
          <input
            className="border border-celestial-blue rounded px-3 py-2 focus:outline-none"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto z-10">
              {searchResults.map(u => (
                <li
                  key={u._id}
                  className="px-3 py-1 hover:bg-celestial-blue/10 cursor-pointer"
                  onClick={() => {
                    setSelectedUser({ id: u._id, label: u.username || u.email || u._id });
                    setSearch("");
                    setSearchResults([]);
                  }}
                >
                  {u.username} <span className="text-xs text-gray-400">{u.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div ref={graphRef} className="w-full min-h-[500px] relative">
          <ForceGraph2D
            graphData={userGraph}
            nodeAutoColorBy="group"
            nodeLabel="label"
            width={dimensions.width}
            height={dimensions.height}
            linkDirectionalArrowLength={3}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.2}
            linkWidth={2}
            linkDistance={20}
            d3VelocityDecay={0.1}
            onNodeClick={node => setSelectedUser(node)}
            onBackgroundClick={() => setSelectedUser(null)}
          />
        </div>
        {selectedUser && (
          <div className="mt-2 text-sm text-celestial-blue">
            Utilisateur sélectionné : <b>{selectedUser.label}</b> (<button className="underline" onClick={() => setSelectedUser(null)}>réinitialiser</button>)
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, borderColor, textColor }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4 border-t-4 ${borderColor} min-w-[120px]`}>
      <div className="mb-2">{icon}</div>
      <div className="truncate text-2xl font-extrabold text-rich-black max-w-[120px]">{value}</div>
      <div className={`font-semibold text-sm ${textColor} text-center`}>{label}</div>
    </div>
  );
}