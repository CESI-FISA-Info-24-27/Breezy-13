import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ProfilEditionModal from "./ProfilEditionModal";

export default function ProfilPreview({user}) {
    const [modalOpen, setModalOpen] = useState(false);

    // On vérifie que l'utilisateur soit le même que l'utilisateur connecté
    const canEdit = user._id === "685c057e357c56a7155326aa";

    return (
        <div className="w-full relative flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6">
            {/* Bouton édition en haut à droite */}
            {canEdit && (
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-celestial-blue text-seasalt hover:bg-folly hover:text-seasalt transition"
                title="Modifier le profil"
                onClick={() => setModalOpen(true)}
            >
                <HiPencil className="text-xl" />
            </button>)}
            <div className="text-xl font-bold text-seasalt mb-1">
            {user?.username || "Nom d'utilisateur inconnu"}
            </div>
            <div className="text-sm text-seasalt/80 mb-2">
            {user?.email || "Email inconnu"}
            </div>
            <div className="text-base text-seasalt text-center">
            {user?.bio || "Pas de description."}
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
