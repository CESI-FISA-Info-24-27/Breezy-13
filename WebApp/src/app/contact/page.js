"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../comp/Header";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi du formulaire
    setStatus({ 
      type: "success", 
      message: "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais." 
    });
    // Réinitialiser le formulaire
    setForm({ name: "", email: "", subject: "", message: "" });
    
    // Cacher le message après 5 secondes
    setTimeout(() => setStatus({ type: "", message: "" }), 5000);
  };

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
                width={60}
                height={60}
                className="rounded-full shadow-lg"
              />
              <h1 className="text-4xl font-extrabold text-celestial-blue font-sans tracking-tight">
                Contactez-nous
              </h1>
            </div>
            <p className="text-lg text-rich-black/70 max-w-2xl mx-auto">
              Nous sommes là pour vous aider ! N&apos;hésitez pas à nous contacter pour toute question, 
              suggestion ou support technique.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div>
              <h2 className="text-2xl font-bold text-celestial-blue mb-6">
                Envoyez-nous un message
              </h2>
              
              {status.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  status.type === "success" 
                    ? "bg-green-100 text-green-800 border border-green-200" 
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-rich-black mb-2">
                    Nom complet <span className="text-folly">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black focus:ring-2 focus:ring-celestial-blue focus:border-transparent transition-all outline-none"
                    placeholder="Votre nom et prénom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-rich-black mb-2">
                    Adresse email <span className="text-folly">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black focus:ring-2 focus:ring-celestial-blue focus:border-transparent transition-all outline-none"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-rich-black mb-2">
                    Sujet <span className="text-folly">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black focus:ring-2 focus:ring-celestial-blue focus:border-transparent transition-all outline-none"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="support">Support technique</option>
                    <option value="account">Problème de compte</option>
                    <option value="feature">Suggestion de fonctionnalité</option>
                    <option value="privacy">Question sur la confidentialité</option>
                    <option value="report">Signaler un problème</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-rich-black mb-2">
                    Message <span className="text-folly">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-sea-green/40 bg-seasalt text-rich-black focus:ring-2 focus:ring-celestial-blue focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Décrivez votre question ou votre problème en détail..."
                  />
                  <p className="text-sm text-rich-black/60 mt-1">
                    Minimum 10 caractères, maximum 1000 caractères
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-folly text-seasalt font-semibold rounded-lg hover:bg-sea-green transition-colors duration-200 focus:ring-4 focus:ring-folly/40"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div>
              <h2 className="text-2xl font-bold text-sea-green mb-6">
                Autres moyens de nous contacter
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-celestial-blue/5 rounded-xl">
                  <h3 className="text-xl font-semibold text-celestial-blue mb-3">
                    Support technique
                  </h3>
                  <p className="text-rich-black/70 mb-2">
                    Pour toute assistance technique ou bug rencontré
                  </p>
                  <p className="text-celestial-blue font-medium">
                    📧 support@twix.com
                  </p>
                  <p className="text-sm text-rich-black/60 mt-2">
                    Temps de réponse moyen : 24h
                  </p>
                </div>

                <div className="p-6 bg-sea-green/5 rounded-xl">
                  <h3 className="text-xl font-semibold text-sea-green mb-3">
                    Questions commerciales
                  </h3>
                  <p className="text-rich-black/70 mb-2">
                    Pour les partenariats et questions business
                  </p>
                  <p className="text-sea-green font-medium">
                    📧 business@twix.com
                  </p>
                  <p className="text-sm text-rich-black/60 mt-2">
                    Temps de réponse moyen : 48h
                  </p>
                </div>

                <div className="p-6 bg-folly/5 rounded-xl">
                  <h3 className="text-xl font-semibold text-folly mb-3">
                    Confidentialité et sécurité
                  </h3>
                  <p className="text-rich-black/70 mb-2">
                    Pour les questions liées à vos données personnelles
                  </p>
                  <p className="text-folly font-medium">
                    📧 privacy@twix.com
                  </p>
                  <p className="text-sm text-rich-black/60 mt-2">
                    Temps de réponse moyen : 72h
                  </p>
                </div>

                <div className="p-6 bg-rich-black/5 rounded-xl">
                  <h3 className="text-xl font-semibold text-rich-black mb-3">
                    FAQ et documentation
                  </h3>
                  <p className="text-rich-black/70 mb-4">
                    Consultez notre base de connaissances pour des réponses rapides
                  </p>
                  <button className="px-4 py-2 bg-celestial-blue text-seasalt rounded-lg hover:bg-sea-green transition-colors">
                    Consulter la FAQ
                  </button>
                </div>
              </div>

              {/* Réseaux sociaux (fictifs) */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-rich-black mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-celestial-blue rounded-full flex items-center justify-center text-seasalt font-bold cursor-pointer hover:bg-sea-green transition-colors">
                    T
                  </div>
                  <div className="w-10 h-10 bg-sea-green rounded-full flex items-center justify-center text-seasalt font-bold cursor-pointer hover:bg-folly transition-colors">
                    F
                  </div>
                  <div className="w-10 h-10 bg-folly rounded-full flex items-center justify-center text-seasalt font-bold cursor-pointer hover:bg-celestial-blue transition-colors">
                    I
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-sea-green/20 text-center">
            <p className="text-rich-black/60 mb-4">
              Nous nous efforçons de répondre à tous les messages dans les plus brefs délais.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/about" className="text-celestial-blue hover:underline">
                À propos
              </Link>
              <Link href="/privacy-policy" className="text-celestial-blue hover:underline">
                Politique de confidentialité
              </Link>
              <Link href="/" className="text-celestial-blue hover:underline">
                Retour à l&apos;accueil
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
