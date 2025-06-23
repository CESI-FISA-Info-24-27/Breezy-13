import { HiOutlineUserAdd, HiArrowCircleRight } from "react-icons/hi";
<<<<<<< HEAD
import FollowsList from "./FollowsList";

export default function Follows({ showDetails, setShowDetails }) {
  if (showDetails) {
    const demoRequests = [
      { id: 1, username: "elonmuck", avatar: "/elonmuck.png", date: "2024-06-20T10:00:00Z" },
      { id: 2, username: "billgrates", avatar: "/billgrates.png", date: "2024-06-19T15:30:00Z" }
    ];
    return <FollowsList onBack={() => setShowDetails(false)} requests={demoRequests} />;
  }
=======
import { useState } from "react";

export default function Follows() {
  const [showDetails, setShowDetails] = useState(false);
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)

  return (
    <div className="flex items-center m-6">
      <span className="w-10 h-10 flex-shrink-0 rounded-full bg-celestial-blue flex items-center justify-center font-bold uppercase text-seasalt mr-3 text-lg">
        <HiOutlineUserAdd />
      </span>
      <div className="flex flex-col">
        <span className="text-rich-black text-lg font-semibold">Demande de suivi</span>
        <span className="text-gray-500 text-sm">Vous avez une nouvelle demande</span>
      </div>
      <button
<<<<<<< HEAD
        className="ml-auto text-folly font-semibold text-lg flex items-center focus:outline-none hover:text-sea-green"
        onClick={() => setShowDetails(true)}
        title="Voir plus"
      >
        <HiArrowCircleRight size={40} />
      </button>
=======
        className="ml-auto text-sea-green font-semibold text-lg flex items-center focus:outline-none"
        onClick={() => setShowDetails((v) => !v)}
        title="Voir plus"
      >
        <HiArrowCircleRight size={50} />
      </button>
      {showDetails && (
        <div className="absolute right-0 top-16 bg-white rounded shadow-lg p-4 z-50">
        </div>
      )}
>>>>>>> 90a7db2 (Page de notif avant modif de la navbar)
    </div>
  );
}