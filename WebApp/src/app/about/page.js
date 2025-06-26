"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../comp/Header";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-celestial-blue via-sea-green to-folly">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto bg-seasalt/95 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
          {/* Header de la page */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Image
                src="/logo.png"
                alt="Logo TwiX"
                width={80}
                height={80}
                className="rounded-full shadow-lg"
              />
              <h1 className="text-5xl font-extrabold text-celestial-blue font-sans tracking-tight">
                TwiX
              </h1>
            </div>
            <p className="text-xl text-rich-black/70 max-w-2xl mx-auto">
              Connectez-vous, partagez et découvrez dans un environnement social moderne et sécurisé.
            </p>
          </div>

          {/* Section À propos */}
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-celestial-blue mb-4">
                À propos de TwiX
              </h2>
              <p className="text-lg text-rich-black/80 leading-relaxed mb-4">
                TwiX est une plateforme de réseau social moderne conçue pour favoriser des connexions 
                authentiques et significatives. Notre mission est de créer un espace numérique où les 
                utilisateurs peuvent s&apos;exprimer librement, partager leurs idées et découvrir du contenu 
                pertinent dans un environnement sûr et respectueux.
              </p>
              <p className="text-lg text-rich-black/80 leading-relaxed">
                Développée avec les dernières technologies web, TwiX offre une expérience utilisateur 
                fluide et intuitive, tout en maintenant les plus hauts standards de sécurité et de 
                protection des données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-sea-green mb-4">
                Nos valeurs
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-celestial-blue/10 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-celestial-blue mb-2">
                    Authenticité
                  </h3>
                  <p className="text-rich-black/70">
                    Nous encourageons les interactions genuines et les expressions authentiques 
                    de chaque utilisateur.
                  </p>
                </div>
                <div className="bg-sea-green/10 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-sea-green mb-2">
                    Sécurité
                  </h3>
                  <p className="text-rich-black/70">
                    La protection de vos données et de votre vie privée est notre priorité absolue.
                  </p>
                </div>
                <div className="bg-folly/10 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-folly mb-2">
                    Innovation
                  </h3>
                  <p className="text-rich-black/70">
                    Nous intégrons constamment de nouvelles fonctionnalités pour améliorer 
                    votre expérience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-folly mb-4">
                Fonctionnalités principales
              </h2>
              <ul className="space-y-3 text-lg text-rich-black/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-celestial-blue rounded-full mt-3 flex-shrink-0"></span>
                  <span>Partage de posts avec texte, images et vidéos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-sea-green rounded-full mt-3 flex-shrink-0"></span>
                  <span>Système de commentaires et d&apos;interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-folly rounded-full mt-3 flex-shrink-0"></span>
                  <span>Messagerie privée sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-celestial-blue rounded-full mt-3 flex-shrink-0"></span>
                  <span>Profils personnalisables avec avatars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-sea-green rounded-full mt-3 flex-shrink-0"></span>
                  <span>Système de suivi et de découverte d&apos;utilisateurs</span>
                </li>
              </ul>
            </section>

            <section className="bg-gradient-to-r from-celestial-blue/5 to-sea-green/5 p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-celestial-blue mb-4">
                Rejoignez la communauté TwiX
              </h2>
              <p className="text-lg text-rich-black/80 mb-6">
                Faites partie d&apos;une communauté grandissante d&apos;utilisateurs qui partagent, 
                découvrent et se connectent de manière authentique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-folly text-seasalt font-semibold rounded-lg hover:bg-sea-green transition-colors"
                >
                  Créer un compte
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 border-2 border-celestial-blue text-celestial-blue font-semibold rounded-lg hover:bg-celestial-blue hover:text-seasalt transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            </section>
          </div>

          {/* Footer de la page */}
          <footer className="mt-12 pt-8 border-t border-sea-green/20 text-center">
            <p className="text-rich-black/60">
              © 2025 TwiX. Développé avec ❤️ pour connecter les gens.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/privacy-policy" className="text-celestial-blue hover:underline">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="text-celestial-blue hover:underline">
                Contact
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
