import { useState, useEffect } from "react";
import { getFollows } from "../../services/followsServices";

export default function SideBarFollow(props) {
  const [follows, setFollows] = useState([]);
  const [showCount, setShowCount] = useState(5);

  useEffect(() => {
    async function fetchFollows() {
      try {
        const data = await getFollows();
        setFollows(data || []);
      } catch (err) {
        setFollows([]);
      }
    }
    fetchFollows();
  }, []);

  const handleShowMore = () => {
    setShowCount((prev) => Math.min(prev + 5, follows.length));
  };

  return (
    <aside
      className="fixed right-0 z-50 w-64 bg-[var(--color-celestial-blue)] shadow-lg flex flex-col px-4 py-6 transition-all duration-300"
      style={props.style}
    >
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-[var(--color-seasalt)] tracking-tight">Comptes suivis</h2>
        <hr className="w-14/15 mx-auto h-0.5 border-0 bg-seasalt my-5 rounded" />
      </div>
      <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {follows.length === 0 ? (
          <li className="text-[var(--color-seasalt)] text-sm opacity-70">Vous ne suivez personne.</li>
        ) : (
          <>
            {follows.slice(0, showCount).map((follow) => (
              <li
                key={follow._id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--color-seasalt)]/10 text-[var(--color-seasalt)] hover:bg-[var(--color-seasalt)]/20 transition font-medium"
              >
                <span className="w-8 h-8 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)]">
                  {follow.username[0]}
                </span>
                <span className="truncate">{follow.username}</span>
              </li>
            ))}
            {follows.length >= 5 && showCount < follows.length && (
              <li>
                <button
                  className="w-full mt-4 px-4 py-2 rounded bg-folly text-seasalt font-semibold hover:bg-sea-green transition"
                  onClick={handleShowMore}
                >
                  Afficher plus
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </aside>
  );
}