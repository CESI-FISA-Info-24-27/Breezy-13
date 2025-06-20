"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../comp/navbar";
import MobileNavbar from "../comp/mobileNavbar";
import Header from "../comp/header";
import Footer from "../comp/footer";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";

// key 8eiWtqYUvKoVmvw2ANUsAmF48I8tltjy
const gf = new GiphyFetch(""); // Remplace par ta clé Giphy

function GifPicker({ onSelect, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-lg w-full relative">
                <button
                    className="absolute top-2 right-4 text-folly font-bold text-2xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <Grid
                    width={400}
                    columns={3}
                    fetchGifs={offset => gf.trending({ offset, limit: 9 })}
                    onGifClick={gif => {
                        onSelect(gif.images.fixed_height.url);
                        onClose();
                    }}
                />
            </div>
        </div>
    );
}

export default function MessagesPage() {
    const [headerStyle, setHeaderStyle] = useState({ opacity: 1, transform: "translateY(0)" });
    const [headerHeight, setHeaderHeight] = useState(64);
    const [sidebarTop, setSidebarTop] = useState(64);
    const headerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Dummy data pour l'affichage
    const conversations = [
        { id: 1, user: "billgates", lastMessage: "À bientôt sur TwiX !" },
        { id: 2, user: "elonmuck", lastMessage: "On se capte pour le projet ?" },
        { id: 3, user: "arkunir", lastMessage: "Haha, bien vu !" }
    ];
    const messages = [
        { from: "billgates", content: "Salut !", time: "10:00" },
        { from: "moi", content: "Hello Bill !", time: "10:01" },
        { from: "billgates", content: "À bientôt sur TwiX !", time: "10:02" }
    ];

    // Pour l'envoi de messages, images et GIFs
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [showGifModal, setShowGifModal] = useState(false);
    const fileInputRef = useRef(null);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    }

    function handleGifSelect(gifUrl) {
        setSelectedGif(gifUrl);
    }

    async function handleSendMessage(e) {
        e.preventDefault();

        // Si image locale
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("message", message);

            await fetch("/api/messages", {
                method: "POST",
                body: formData,
            });
            setSelectedFile(null);
            setMessage("");
            return;
        }

        // Si GIF Giphy
        if (selectedGif) {
            await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, gif: selectedGif }),
            });
            setSelectedGif(null);
            setMessage("");
            return;
        }

        // Message texte simple
        if (message.trim() !== "") {
            await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            setMessage("");
        }
    }

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
        <div className="relative min-h-screen bg-seasalt">
            {/* Header */}
            <div
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
                style={headerStyle}
            >
                <Header />
            </div>

            <div className="flex pt-[64px] md:pt-0">
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
                    <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-4 mb-8 md:mb-0 border-t-4 border-celestial-blue min-w-[180px] max-w-xs flex flex-col"
                        style={{ height: "100%" }}
                    >
                        <h2 className="text-xl font-bold text-celestial-blue mb-4">Conversations</h2>
                        <ul className="divide-y divide-seasalt flex-1 overflow-y-auto">
                            {conversations.map(conv => (
                                <li key={conv.id} className="py-3 px-2 hover:bg-celestial-blue/10 rounded cursor-pointer transition">
                                    <div className="font-semibold text-rich-black">{conv.user}</div>
                                    <div className="text-xs text-gray-500">{conv.lastMessage}</div>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Zone de messages */}
                    <section className="flex-1 bg-white rounded-2xl shadow-lg p-4 border-t-4 border-sea-green flex flex-col min-w-0"
                        style={{ height: "100%" }}
                    >
                        <h2 className="text-xl font-bold text-sea-green mb-4">Messages privés</h2>
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.from === "moi" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.from === "moi"
                                        ? "bg-celestial-blue text-seasalt"
                                        : "bg-seasalt text-rich-black"
                                        }`}>
                                        <span>{msg.content}</span>
                                        <div className="text-xs text-right opacity-60">{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                            {/* Affichage de l'image ou du GIF sélectionné avant envoi */}
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
                                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => fileInputRef.current.click()}
                                title="Envoyer une image"
                            >
                                📷
                            </button>
                            <button
                                type="button"
                                className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowGifModal(true)}
                                title="Envoyer un GIF"
                            >
                                GIF
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-celestial-blue text-seasalt font-semibold shadow hover:bg-sea-green transition"
                            >
                                Envoyer
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