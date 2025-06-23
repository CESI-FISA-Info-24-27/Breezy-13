import { HiArrowCircleLeft } from "react-icons/hi";

export default function FollowsList({ onBack, requests = [] }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6">
      <button
        className="mb-6 flex items-center text-celestial-blue hover:text-sea-green font-semibold"
        onClick={onBack}
      >
        <HiArrowCircleLeft className="inline-block mr-2" size={32} />
        Retour
      </button>
      <h2 className="text-xl font-bold text-celestial-blue mb-4">Demandes de suivi</h2>
      {requests.length === 0 ? (
        <div className="text-gray-400 text-center py-8">Aucune demande en attente.</div>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="flex items-center bg-seasalt rounded-lg p-3 shadow">
              <img
                src={req.avatar || "/default-avatar.png"}
                alt={req.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-celestial-blue mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-rich-black">{req.username}</div>
                <div className="text-xs text-gray-500">{req.date && new Date(req.date).toLocaleString("fr-FR")}</div>
              </div>
              <button className="ml-2 px-3 py-1 rounded bg-sea-green text-seasalt font-semibold hover:bg-celestial-blue transition">
                Accepter
              </button>
              <button className="ml-2 px-3 py-1 rounded bg-folly text-seasalt font-semibold hover:bg-rich-black transition">
                Refuser
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}