"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../comp/Navbar";
import MobileNavbar from "../comp/mobileNavbar";
import Header from "../comp/Header";
import { getMessages, createMessage } from "../../services/MessagesServices";
import { getUsers } from "../../services/UsersServices";
import { uploadFile, getFile } from "../../services/FileServerServices";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { FiImage, FiSend } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import Cookies from "js-cookie";

// Récupère l'id utilisateur courant (à adapter selon ton auth)
function getCurrentUserId() {
    const token = Cookies.get("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || null;
}

const gf = new GiphyFetch("8eiWtqYUvKoVmvw2ANUsAmF48I8tltjy");

// Composant pour afficher une image sécurisée via le fileServerServices
function SecureImage({ fileName, alt, className }) {
    const [imgSrc, setImgSrc] = useState("/default-avatar.png");

    useEffect(() => {
        let isMounted = true;
        if (!fileName) {
            setImgSrc("/default-avatar.png");
            return;
        }
        getFile(fileName)
            .then(blob => {
                if (isMounted) setImgSrc(URL.createObjectURL(blob));
            })
            .catch(() => {
                if (isMounted) setImgSrc("/default-avatar.png");
            });
        return () => {
            isMounted = false;
            if (imgSrc && imgSrc.startsWith("blob:")) URL.revokeObjectURL(imgSrc);
        };
        // eslint-disable-next-line
    }, [fileName]);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            style={{ objectFit: "cover" }}
        />
    );
}

// Composant pour afficher une vidéo sécurisée via le fileServerServices
function SecureVideo({ fileName, className }) {
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!fileName) {
            setVideoSrc(null);
            return;
        }
        getFile(fileName)
            .then(blob => {
                if (isMounted) setVideoSrc(URL.createObjectURL(blob));
            })
            .catch(() => {
                if (isMounted) setVideoSrc(null);
            });
        return () => {
            isMounted = false;
            if (videoSrc && videoSrc.startsWith("blob:")) URL.revokeObjectURL(videoSrc);
        };
        // eslint-disable-next-line
    }, [fileName]);

    if (!videoSrc) return null;
    return (
        <video
            src={videoSrc}
            controls
            className={className}
        />
    );
}

function GifPicker({ onSelect, onClose }) {
    const [search, setSearch] = useState("");
    const fetchGifs = React.useCallback(
        (offset) =>
            search
                ? gf.search(search, { offset, limit: 9 })
                : gf.trending({ offset, limit: 9 }),
        [search]
    );
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#23272a] rounded-2xl shadow-2xl p-4 max-w-lg w-full relative">
                <div className="flex items-center mb-4 relative">
                    <input
                        className="flex-1 px-3 py-2 rounded-lg bg-[#2c2f33] text-white placeholder-gray-400 focus:outline-none"
                        placeholder="Rechercher un GIF..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button
                        className="ml-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-folly/20 transition"
                        onClick={onClose}
                        aria-label="Fermer"
                        style={{ minWidth: 32, minHeight: 32 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: 350 }}>
                    <Grid
                        key={search}
                        width={400}
                        columns={3}
                        fetchGifs={fetchGifs}
                        onGifClick={gif => {
                            onSelect(gif.images.fixed_height.url);
                            onClose();
                        }}
                        noLink
                        hideAttribution
                    />
                </div>
            </div>
        </div>
    );
}

function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return "à l'instant";
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
    if (diff < 172800) return "hier";
    return `${Math.floor(diff / 86400)} j`;
}

export default function MessagesPage() {
    const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
    const [headerHeight, setHeaderHeight] = useState(64);
    const [sidebarTop, setSidebarTop] = useState(64);
    const headerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [showGifModal, setShowGifModal] = useState(false);
    const fileInputRef = useRef(null);

    // Conversation sélectionnée (userId du destinataire)
    const [selectedConv, setSelectedConv] = useState(null);

    const userId = getCurrentUserId();

    // Récupérer les messages de l'utilisateur courant
    useEffect(() => {
        async function fetchMsgs() {
            setLoading(true);
            try {
                const msgsFrom = await getMessages({ from: userId });
                const msgsTo = await getMessages({ to: userId });
                const allMsgs = [...msgsFrom, ...msgsTo].filter(
                    (msg, idx, arr) =>
                        arr.findIndex(m => m._id === msg._id) === idx
                );
                setMessages(allMsgs);
            } catch (e) { }
            setLoading(false);
        }
        if (userId) fetchMsgs();
    }, [userId]);

    // Récupérer tous les utilisateurs pour afficher username/avatar
    useEffect(() => {
        async function fetchUsersList() {
            try {
                const res = await getUsers();
                setUsers(res);
            } catch (e) {}
        }
        fetchUsersList();
    }, []);

    function getUserInfo(id) {
        return users.find(u => u._id === id) || {};
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    }

    function handleGifSelect(gifUrl) {
        setSelectedGif(gifUrl);
    }

    async function handleSendMessage(e) {
        e.preventDefault();
        if (!selectedConv) return;

        let newMsg = { content: message, to: selectedConv };
        if (selectedFile) {
            // Upload via fileServerServices
            const uploadRes = await uploadFile(selectedFile);
            newMsg.images = [uploadRes.fileName || uploadRes.path || uploadRes.url];
        }
        if (selectedGif) {
            newMsg.images = [selectedGif];
        }
        if (!message && !selectedFile && !selectedGif) return;

        await createMessage(newMsg);
        setMessage("");
        setSelectedFile(null);
        setSelectedGif(null);

        // Recharge les messages après envoi
        const msgsFrom = await getMessages({ from: userId });
        const msgsTo = await getMessages({ to: userId });
        const allMsgs = [...msgsFrom, ...msgsTo].filter(
            (msg, idx, arr) =>
                arr.findIndex(m => m._id === msg._id) === idx
        );
        setMessages(allMsgs);
    }

    // Générer la liste des conversations (par userId autre que soi)
    const conversations = React.useMemo(() => {
        const map = {};
        messages.forEach(msg => {
            const other = msg.from === userId ? msg.to : msg.from;
            // On prend le message le plus récent (updatedAt > createdAt si modifié)
            const lastDate = new Date(msg.updatedAt || msg.createdAt);
            if (
                !map[other] ||
                new Date(map[other].updatedAt || map[other].createdAt) < lastDate
            ) {
                map[other] = msg;
            }
        });
        return Object.entries(map)
            .map(([otherId, msg]) => ({
                id: otherId,
                lastMessage: msg.content,
                lastMessageTime: msg.updatedAt || msg.createdAt,
            }))
            .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
    }, [messages, userId]);

    // Messages de la conversation sélectionnée, triés par date
    const currentMessages = React.useMemo(() => {
        if (!selectedConv) return [];
        return messages
            .filter(
                m =>
                    (m.from === userId && m.to === selectedConv) ||
                    (m.from === selectedConv && m.to === userId)
            )
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }, [messages, selectedConv, userId]);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
            setSidebarTop(headerRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 100);
            const translateY = Math.min(scrollY, 100);

            setHeaderStyle({
                opacity,
                transform: `translateY(-${translateY}px)`,
            });

            const ACCELERATION = 1.2;
            const sidebarTranslate = Math.min(scrollY * ACCELERATION, 100 * ACCELERATION);
            const visibleHeight = Math.max(headerHeight - sidebarTranslate, 0);
            setSidebarTop(visibleHeight);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [headerHeight]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative bg-seasalt h-screen">
            {/* Header */}
            <div
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
                style={headerStyle}
            >
                <Header />
            </div>

            <div className="flex pt-[64px] md:pt-0 h-screen">
                {/* Sidebar gauche */}
                <div
                    className="hidden md:block fixed left-0 w-64 z-40 transition-all duration-300"
                    style={{ top: `${sidebarTop}px`, height: `calc(100vh - ${sidebarTop}px)` }}
                >
                    <Navbar />
                </div>

                {/* Contenu principal */}
                <main
                    className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 pb-14 md:pb-0 transition-all duration-300 w-full flex flex-col md:flex-row gap-8"
                    style={{
                        paddingTop: `${sidebarTop + 16}px`,
                        paddingBottom: '3.5rem',
                        minHeight: `calc(100vh - ${sidebarTop + 16}px - 3.5rem)`,
                        height: 'auto',
                        marginLeft: isMobile ? 0 : '16rem',
                    }}
                >
                    {/* Liste des conversations */}
                    <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-4 border-t-4 border-celestial-blue min-w-[180px] max-w-xs flex flex-col h-full"
                        style={{ height: "100%" }}
                    >
                        <h2 className="text-xl font-bold text-celestial-blue mb-4 flex items-center gap-2">Listes des conversations</h2>
                        <ul className="divide-y divide-seasalt flex-1 overflow-y-auto">
                            {conversations.map(conv => {
                                const user = getUserInfo(conv.id);
                                return (
                                    <li
                                        key={conv.id}
                                        className={`py-3 px-2 hover:bg-celestial-blue/10 rounded cursor-pointer transition ${selectedConv === conv.id ? "bg-celestial-blue/10" : ""}`}
                                        onClick={() => setSelectedConv(conv.id)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                {user.avatar ? (
                                                    <SecureImage
                                                        fileName={user.avatar}
                                                        alt={user.username}
                                                        className="w-8 h-8 rounded-full object-cover border"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/default-avatar.png"
                                                        alt="avatar"
                                                        className="w-8 h-8 rounded-full object-cover border"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-semibold text-rich-black">{user.username || conv.id}</div>
                                                    <div className="text-xs text-gray-500">{conv.lastMessage}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                                                {conv.lastMessageTime && timeAgo(conv.lastMessageTime)}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>

                    {/* Zone de messages */}
                    <section className="flex-1 bg-white rounded-2xl shadow-lg p-4 border-t-4 border-sea-green flex flex-col min-w-0 h-full"
                        style={{ height: "100%" }}
                    >
                        <h2 className="text-xl font-bold text-sea-green mb-4">Messages privés</h2>
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {loading ? (
                                <div>Chargement...</div>
                            ) : (
                                currentMessages.map((msg, idx) => (
                                    <div
                                        key={msg._id || idx}
                                        className={`flex ${msg.from === userId ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.from === userId
                                            ? "bg-celestial-blue text-seasalt"
                                            : "bg-seasalt text-rich-black"
                                            }`}>
                                            <span>{msg.content}</span>
                                            {/* Affichage images sécurisées */}
                                            {msg.images && msg.images.map((img, i) => (
                                                img && !img.startsWith("http") ? (
                                                    <SecureImage
                                                        key={i}
                                                        fileName={img}
                                                        alt="img"
                                                        className="w-24 h-24 object-cover rounded-lg shadow mt-2"
                                                    />
                                                ) : img ? (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt="img"
                                                        className="w-24 h-24 object-cover rounded-lg shadow mt-2"
                                                    />
                                                ) : null
                                            ))}
                                            {/* Affichage vidéos sécurisées */}
                                            {msg.videos && msg.videos.map((vid, i) => (
                                                vid && !vid.startsWith("http") ? (
                                                    <SecureVideo
                                                        key={i}
                                                        fileName={vid}
                                                        className="w-32 h-24 rounded-lg shadow mt-2"
                                                    />
                                                ) : vid ? (
                                                    <video
                                                        key={i}
                                                        src={vid}
                                                        controls
                                                        className="w-32 h-24 rounded-lg shadow mt-2"
                                                    />
                                                ) : null
                                            ))}
                                            <div className="text-xs text-right opacity-60">{timeAgo(msg.createdAt)}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {selectedFile && (
                                <div className="flex justify-end">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Aperçu"
                                        className="w-24 h-24 object-cover rounded-lg shadow"
                                    />
                                </div>
                            )}
                            {selectedGif && (
                                <div className="flex justify-end">
                                    <img
                                        src={selectedGif}
                                        alt="GIF sélectionné"
                                        className="w-24 h-24 object-cover rounded-lg shadow"
                                    />
                                </div>
                            )}
                        </div>
                        <form className="flex gap-2 mt-auto" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                className="flex-1 rounded-lg border border-sea-green px-3 py-2 focus:outline-none focus:ring-2 focus:ring-celestial-blue"
                                placeholder="Écrire un message..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                                onClick={() => fileInputRef.current.click()}
                                title="Envoyer une image"
                            >
                                <FiImage size={22} />
                            </button>
                            <button
                                type="button"
                                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                                onClick={() => setShowGifModal(true)}
                                title="Envoyer un GIF"
                            >
                                <FaRegSmile size={22} />
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-celestial-blue text-seasalt font-semibold shadow hover:bg-sea-green transition flex items-center justify-center"
                                title="Envoyer"
                            >
                                <FiSend size={22} />
                            </button>
                        </form>
                        {showGifModal && (
                            <GifPicker
                                onSelect={handleGifSelect}
                                onClose={() => setShowGifModal(false)}
                            />
                        )}
                    </section>
                </main>
            </div>
            <div className="md:hidden">
                <MobileNavbar />
            </div>
        </div>
    );
}