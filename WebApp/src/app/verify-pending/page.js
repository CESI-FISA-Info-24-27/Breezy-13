"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPending() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) return;

    setIsResending(true);
    try {
      const response = await fetch('/api/verify/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Email de vérification renvoyé avec succès !");
      } else {
        const error = await response.json();
        setMessage("Erreur : " + (error.error || "Impossible de renvoyer l'email"));
      }
    } catch (error) {
      setMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsResending(false);
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
          <div className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-rich-black mb-4">
            Vérifiez votre email
          </h1>
          
          <p className="text-rich-black/70 mb-6">
            Un email de vérification a été envoyé à :
          </p>
          
          <p className="text-lg font-semibold text-celestial-blue mb-6 break-all">
            {email}
          </p>
          
          <p className="text-sm text-rich-black/60 mb-8">
            Cliquez sur le lien dans l'email pour activer votre compte. 
            L'email peut prendre quelques minutes pour arriver.
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-center text-sm ${
            message.includes("Erreur") 
              ? "bg-red-100 text-red-700 border border-red-300" 
              : "bg-green-100 text-green-700 border border-green-300"
          }`}>
            {message}
          </div>
        )}

        <div className="w-full space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={isResending || !email}
            className="w-full py-3 rounded-lg bg-sea-green text-seasalt font-semibold text-lg shadow-md hover:bg-celestial-blue transition-all duration-200 focus:ring-4 focus:ring-sea-green/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? "Envoi en cours..." : "Renvoyer l'email"}
          </button>

          <div className="text-center space-y-2">
            <p className="text-sm text-rich-black/70">
              Déjà vérifié ?{" "}
              <Link href="/login" className="font-bold text-folly hover:underline transition">
                Se connecter
              </Link>
            </p>
            
            <p className="text-sm text-rich-black/70">
              Mauvaise adresse email ?{" "}
              <Link href="/register" className="font-bold text-celestial-blue hover:underline transition">
                Recommencer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
