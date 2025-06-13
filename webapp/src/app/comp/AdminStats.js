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

export default function AdminStats() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userNodes, setUserNodes] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const graphRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 350 });

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
  
      const userIds = new Set(users.map(u => u._id));
      setUserNodes(users.map(u => ({
        id: u._id,
        label: u.username || u.email || u._id,
        group: u.role_id || 1
      })));
      setUserLinks(
        follows
          .filter(f => userIds.has(f.follower) && userIds.has(f.following))
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
          height: graphRef.current.offsetHeight,
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userGraph = {
    nodes: userNodes,
    links: userLinks
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
        <h3 className="text-lg font-bold text-celestial-blue mb-4">Réseau des utilisateurs</h3>
        <div ref={graphRef} className="w-full h-96 relative">
          <ForceGraph2D
            graphData={userGraph}
            nodeAutoColorBy="group"
            nodeLabel="label"
            width={dimensions.width}
            height={dimensions.height}
            linkDirectionalArrowLength={3} // longueur de la flèche
            linkDirectionalArrowRelPos={1} // position de la flèche (1 = extrémité)
            linkCurvature={0.2} // courbure des liens
            linkWidth={2} // épaisseur des liens
            linkDistance={50} // distance minimale entre les liens
            // Zoom pour ajuster la vue
            d3VelocityDecay={0.4} // vitesse de décélération pour le zoom
          />
        </div>
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