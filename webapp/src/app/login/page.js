'use client';

import Link from "next/link";
import Image from "next/image";
import Cookies from 'js-cookie';
import { useState } from 'react';
import { login } from '../../services/authService';
import { useRouter } from 'next/navigation';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le rechargement de la page
    try {
        const data = await login(email, password, rememberMe);
        console.log('Connexion réussie', data);
        // Rediriger l'utilisateur ou stocker les données selon le contexte

        Cookies.set('token', data.token, {
        secure: true, // true si HTTPS
        sameSite: 'Lax', // ou 'Strict' ou 'None'
        path: '/', // disponible sur tout le site
        });

        router.push('/homepage'); // par exemple
    } catch (error) {
        console.error('Erreur de connexion:', error);
        alert(error.message || "Échec de la connexion");
    }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celestial-blue via-sea-green to-folly animate-fade-in">
            <div className="w-full max-w-md bg-seasalt/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-3 mb-2">
                    <Image
                        className="w-16 rounded-full shadow-lg object-cover"
                        src="/logo.png"
                        alt="logo"
                        width={64}
                        height={64}
                        priority
                    />
                    <span className="text-3xl font-extrabold text-celestial-blue font-sans tracking-tight drop-shadow">
                        Beak
                    </span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-rich-black text-center animate-slide-down">
                    Connectez-vous à votre compte
                </h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 animate-fade-in-slow">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-rich-black">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
                            placeholder="nom@entreprise.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-rich-black">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black placeholder:text-rich-black/40 focus:ring-2 focus:ring-sea-green transition-all duration-200 outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-rich-black/70">
                            <input
                                type="checkbox"
                                checked={rememberMe} 
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="accent-sea-green w-4 h-4 rounded border border-sea-green/30 focus:ring-2 focus:ring-sea-green/30 transition"
                            />
                            Se souvenir de moi
                        </label>
                        <Link href="#" className="text-sm text-celestial-blue hover:text-folly transition">
                            Mot de passe oublié ?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-folly text-seasalt font-semibold text-lg shadow-md hover:bg-sea-green hover:text-seasalt transition-all duration-200 focus:ring-4 focus:ring-folly/40"
                    >
                        Se connecter
                    </button>
                    <p className="text-center text-sm text-rich-black/70">
                        Vous n&apos;avez pas encore de compte ?{" "}
                        <Link href="/register" className="font-bold text-folly hover:underline transition">
                            Inscrivez-vous
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}