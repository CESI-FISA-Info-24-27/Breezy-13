<<<<<<< HEAD
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ProfilEditionModal from "./ProfilEditionModal";

export default function ProfilPreview() {
    const [modalOpen, setModalOpen] = useState(false);

    const user = {
        _id: "1",
        username: "elonmuck",
=======
export default function ProfilPreview() {
    const user = {
        _id: "1",
        username: "eloncuck",
>>>>>>> 8764791 (Init profil page)
        avatar: "/logo.png",
        mail: "elon@bg.com",
        description: "Achetez mes voitures !"
    };

    return (
<<<<<<< HEAD
        <div className="w-full relative flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6">
            {/* Bouton édition en haut à droite */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-celestial-blue text-seasalt hover:bg-folly hover:text-seasalt transition"
                title="Modifier le profil"
                onClick={() => setModalOpen(true)}
            >
                <HiPencil className="text-xl" />
            </button>
=======
        <div className="flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6 w-80">
>>>>>>> 8764791 (Init profil page)
            <span className="w-20 h-20 rounded-full bg-[var(--color-seasalt)]/30 flex items-center justify-center font-bold uppercase text-[var(--color-celestial-blue)] text-3xl mb-4">
                {user.username[0]}
            </span>
            <div className="text-xl font-bold text-[var(--color-seasalt)] mb-1">{user.username}</div>
            <div className="text-sm text-[var(--color-seasalt)]/80 mb-2">{user.mail}</div>
            <div className="text-base text-[var(--color-seasalt)] text-center">{user.description}</div>
<<<<<<< HEAD
            {/* Modal d'édition du profil */}
            <ProfilEditionModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                user={user}
            />
=======
>>>>>>> 8764791 (Init profil page)
        </div>
    );
}