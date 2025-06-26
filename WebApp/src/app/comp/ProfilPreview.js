"use client"

import { HiOutlineUserAdd, HiUserAdd } from "react-icons/hi";
import { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi";
import ProfilEditionModal from "./ProfilEditionModal";
import SecureMedia from "./SecureMedia";
import { getFollows, getFollowsFrom, createFollow, deleteFollow } from "../../services/FollowsServices";
import { useAuth } from "../../../context/UserContext";

export default function ProfilPreview({user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [hovered, setHovered] = useState("");
    const [follows, setFollows] = useState([]);

    // On vérifie que l'utilisateur soit le même que l'utilisateur connecté
    const { userId } = useAuth()
    const canEdit = user._id === userId;

    useEffect(() => 
    { 
        const fetchFollows = async () => 
        {
            try 
            {
            // On récupère les followers
            let fetchedFollows = await getFollowsFrom(userId);
            // On récupère les ids des followers
            let usersID = fetchedFollows.map(item => item.follower);

            // On met à jour les followers
            setFollows(usersID);
            } 
            catch (error) 
            {
            console.error("Erreur lors du chargement des follows :", error);
            }
        };

        fetchFollows();
    }, [userId]);

    function subscribe(selectedUserID) 
    {
        // Si on follow déjà l'utilisateur
        if(follows.includes(selectedUserID))
        {
            // On récupère le following en question
            getFollows({ following: userId, follower: selectedUserID }).then((followsToDelete) => {
            // Si on l'a trouvé, on le delete
            if(followsToDelete && followsToDelete.length > 0)
            {
                deleteFollow(followsToDelete[0]._id).then(() => {
                // Après la suppression, on met à jour les follows
                setFollows(prev => prev.filter(id => id !== selectedUserID));
                })
            }
            });
        }
        else
        {
            // Sinon on crée le follow
            createFollow({ following: userId, follower: selectedUserID }).then(() => {
                // Et on met à jour la liste des followers
                setFollows(prev => [...prev, selectedUserID]);
            });
        }
    }

    return (
        <div className="w-full relative flex flex-col items-center bg-[var(--color-celestial-blue)] rounded-xl shadow-lg p-6">
            {/* Bouton édition en haut à droite */}
            {canEdit ? (
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-celestial-blue text-seasalt hover:bg-folly hover:text-seasalt transition"
                title="Modifier le profil"
                onClick={() => setModalOpen(true)}
            >
                <HiPencil className="text-xl" />
            </button>) : (<span
                            onClick={() => subscribe(user._id)}
                            onMouseEnter={() => setHovered("useradd" + user._id)}
                            onMouseLeave={() => setHovered("")}
                            className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-celestial-blue text-seasalt"
                          >
                            {hovered === "useradd" + user._id || follows.includes(user._id) ? (
                              <HiUserAdd className="text-2xl" />
                            ) : (
                              <HiOutlineUserAdd className="text-2xl" />
                            )}
                          </span>)}
            <SecureMedia fileName={user?.avatar} type="image" alt="avatar" className="w-26 h-26 rounded-full object-cover border" />
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
