"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Verify() {
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus("error");
      setMessage("Token de vérification manquant");
      return;
    }

    // Vérifier le token
    verifyToken(token);
  }, [searchParams]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Votre compte a été vérifié avec succès !");
        
        // Redirection vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        const error = await response.json();
        setStatus("error");
        setMessage(error.error || "Erreur lors de la vérification");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erreur de connexion. Veuillez réessayer.");
    }
  };

  const getIcon = () => {
    switch (status) {
      case "loading":
        return (
          <div className="animate-spin w-10 h-10 text-celestial-blue">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case "success":
        return (
          <div className="w-10 h-10 text-green-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "error":
        return (
          <div className="w-10 h-10 text-red-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "loading":
        return "bg-blue-100";
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-celestial-blue via-sea-green to-folly">
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
            TwiX
          </span>
        </Link>

        <div className="text-center">
          <div className={`w-20 h-20 mx-auto mb-4 ${getBackgroundColor()} rounded-full flex items-center justify-center`}>
            {getIcon()}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-rich-black mb-4">
            {status === "loading" && "Vérification en cours..."}
            {status === "success" && "Compte vérifié !"}
            {status === "error" && "Erreur de vérification"}
          </h1>
          
          <p className={`mb-6 ${
            status === "success" ? "text-green-700" : 
            status === "error" ? "text-red-700" : 
            "text-rich-black/70"
          }`}>
            {message}
          </p>
        </div>

        {status === "success" && (
          <div className="text-center">
            <p className="text-sm text-rich-black/60 mb-4">
              Redirection automatique vers la connexion dans 3 secondes...
            </p>
            <Link
              href="/login"
              className="inline-block py-3 px-6 rounded-lg bg-folly text-seasalt font-semibold shadow-md hover:bg-sea-green transition-all duration-200"
            >
              Se connecter maintenant
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="w-full space-y-4">
            <Link
              href="/verify-pending"
              className="block w-full py-3 rounded-lg bg-sea-green text-seasalt font-semibold text-center shadow-md hover:bg-celestial-blue transition-all duration-200"
            >
              Renvoyer un email de vérification
            </Link>

            <div className="text-center">
              <Link href="/register" className="text-sm font-bold text-celestial-blue hover:underline transition">
                Créer un nouveau compte
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
