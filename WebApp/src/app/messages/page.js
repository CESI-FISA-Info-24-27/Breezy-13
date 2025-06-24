"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../comp/Navbar";
import MobileNavbar from "../comp/mobileNavbar";
import Header from "../comp/Header";
import { getMessages, createMessage } from "../../services/messagesServices";
import { getUsers } from "../../services/usersServices";
import { uploadFile } from "../../services/fileServerServices";
import { FiImage, FiSend } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import Cookies from "js-cookie";
import GifPicker from "../comp/GifPicker";
import SecureMedia from "../comp/SecureMedia";
import { timeOrHour } from "../../services/messagesUtils";

// Récupère l'id utilisateur courant (à adapter selon ton auth)
function getCurrentUserId() {
    const token = Cookies.get("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || null;
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

    const [selectedConv, setSelectedConv] = useState(null);

    const userId = getCurrentUserId();

    // Ref pour scroll auto sur le dernier message
    const messagesEndRef = useRef(null);

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

    // Envoi automatique du message dès qu'un fichier est sélectionné
    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file || !selectedConv) return;

        const ext = file.name.split('.').pop().toLowerCase();
        const uploadRes = await uploadFile(file);
        console.log("Fichier uploadé :", uploadRes);

        // Récupère juste le nom du fichier depuis le chemin
        let fileName = "";
        if (uploadRes.filePath) {
            fileName = uploadRes.filePath.split("/").pop();
        } else if (uploadRes.fileName) {
            fileName = uploadRes.fileName;
        } else if (uploadRes.path) {
            fileName = uploadRes.path.split("/").pop();
        } else if (uploadRes.url) {
            fileName = uploadRes.url.split("/").pop();
        }

        let images = [];
        let videos = [];
        if (["mp4", "webm", "ogg"].includes(ext)) {
            videos.push(fileName);
        } else {
            images.push(fileName);
        }

        await createMessage({
            content: "",
            from: userId,
            to: selectedConv,
            images: images.length > 0 ? images : [],
            videos: videos.length > 0 ? videos : []
        });

        setSelectedFile(null);

        // Recharge les messages après envoi
        const msgsFrom = await getMessages({ from: userId });
        const msgsTo = await getMessages({ to: userId });
        const allMsgs = [...msgsFrom, ...msgsTo].filter(
            (msg, idx, arr) =>
                arr.findIndex(m => m._id === msg._id) === idx
        );
        setMessages(allMsgs);
    }

    // Envoi immédiat du GIF dès sélection
    function handleGifSelect(gifUrl) {
        if (!selectedConv) return;
        createMessage({
            content: "",
            from: userId,
            to: selectedConv,
            images: [gifUrl],
            videos: []
        }).then(async () => {
            setSelectedGif(null);
            setShowGifModal(false);
            // Recharge les messages après envoi
            const msgsFrom = await getMessages({ from: userId });
            const msgsTo = await getMessages({ to: userId });
            const allMsgs = [...msgsFrom, ...msgsTo].filter(
                (msg, idx, arr) =>
                    arr.findIndex(m => m._id === msg._id) === idx
            );
            setMessages(allMsgs);
        });
    }

    // Envoi d'un message texte uniquement (pas de GIF ni fichier ici)
    async function handleSendMessage(e) {
        e.preventDefault();
        if (!selectedConv) return;

        let images = [];
        let videos = [];
        let contentToSend = message;

        if (!contentToSend && images.length === 0 && videos.length === 0) return;

        await createMessage({
            content: contentToSend,
            from: userId,
            to: selectedConv,
            images,
            videos
        });

        setMessage("");

        const msgsFrom = await getMessages({ from: userId });
        const msgsTo = await getMessages({ to: userId });
        const allMsgs = [...msgsFrom, ...msgsTo].filter(
            (msg, idx, arr) =>
                arr.findIndex(m => m._id === msg._id) === idx
        );
        setMessages(allMsgs);
    }

    const conversations = React.useMemo(() => {
        const map = {};
        messages.forEach(msg => {
            const other = msg.from === userId ? msg.to : msg.from;
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

    const currentMessages = React.useMemo(() => {
        if (!selectedConv) return [];
        return messages
            .filter(
                m =>
                    (m.from === userId && m.to === selectedConv) ||
                    (m.from === selectedConv && m.to === userId)
            )
            .sort((a, b) =>
                new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt)
            );
    }, [messages, selectedConv, userId]);

    // Scroll auto sur le dernier message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentMessages, selectedConv]);

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
                                                    <SecureMedia
                                                        fileName={user.avatar}
                                                        type="image"
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
                                                {conv.lastMessageTime && timeOrHour(conv.lastMessageTime)}
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
                                                    <SecureMedia
                                                        key={i}
                                                        fileName={img}
                                                        type="image"
                                                        alt="img"
                                                        className="w-64 h-64 object-cover rounded-lg shadow mt-2"
                                                    />
                                                ) : img ? (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt="img"
                                                        className="w-64 h-64 object-cover rounded-lg shadow mt-2"
                                                    />
                                                ) : null
                                            ))}
                                            {/* Affichage vidéos sécurisées */}
                                            {msg.videos && msg.videos.map((vid, i) => (
                                                vid && !vid.startsWith("http") ? (
                                                    <SecureMedia
                                                        key={i}
                                                        fileName={vid}
                                                        type="video"
                                                        className="w-96 h-64 rounded-lg shadow mt-2"
                                                    />
                                                ) : vid ? (
                                                    <video
                                                        key={i}
                                                        src={vid}
                                                        controls
                                                        className="w-96 h-64 rounded-lg shadow mt-2"
                                                    />
                                                ) : null
                                            ))}
                                            <div className="text-xs text-right opacity-60">
                                                {timeOrHour(msg.updatedAt || msg.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {selectedFile && (
                                <div className="flex justify-end">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Aperçu"
                                        className="w-64 h-64 object-cover rounded-lg shadow"
                                    />
                                </div>
                            )}
                            {selectedGif && (
                                <div className="flex justify-end">
                                    <img
                                        src={selectedGif}
                                        alt="GIF sélectionné"
                                        className="w-64 h-64 object-cover rounded-lg shadow"
                                    />
                                </div>
                            )}
                            {/* Scroll auto sur le dernier message */}
                            <div ref={messagesEndRef} />
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
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                                onClick={() => fileInputRef.current.click()}
                                title="Envoyer une image ou vidéo"
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