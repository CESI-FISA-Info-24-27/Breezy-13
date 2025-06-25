import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ProfilEditionModal from "./ProfilEditionModal";

export default function ProfilPreview({user}) {
    console.log('user dans ProfilPreview :', user);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="w-full relative flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6">
            {/* Bouton édition en haut à droite */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-celestial-blue text-seasalt hover:bg-folly hover:text-seasalt transition"
                title="Modifier le profil"
                onClick={() => setModalOpen(true)}
            >
                <HiPencil className="text-xl" />
            </button>
            <span className="...">
            {user?.username?.[0] || "?"}
            </span>
            <div className="text-xl font-bold text-seasalt mb-1">
            {user?.username || "Nom d'utilisateur inconnu"}
            </div>
            <div className="text-sm text-seasalt/80 mb-2">
            {user?.email || "Email inconnu"}
            </div>
            <div className="text-base text-seasalt text-center">
            {user?.description || "Pas de description."}
            </div>
            {/* Modal d'édition du profil */}
            <ProfilEditionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                user={user}
            />
        </div>
    );
}
