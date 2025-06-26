"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../comp/Header";

export default function PrivacyPolicy() {
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
                Politique de Confidentialité
              </h1>
            </div>
            <p className="text-lg text-rich-black/70">
              Dernière mise à jour : 26 juin 2025
            </p>
          </div>

          {/* Contenu de la politique */}
          <div className="space-y-8 text-rich-black/80">
            <section>
              <h2 className="text-2xl font-bold text-celestial-blue mb-4">
                1. Introduction
              </h2>
              <p className="leading-relaxed mb-4">
                Chez TwiX, nous nous engageons à protéger votre vie privée et vos données personnelles. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons 
                et protégeons vos informations lorsque vous utilisez notre plateforme.
              </p>
              <p className="leading-relaxed">
                En utilisant TwiX, vous acceptez les pratiques décrites dans cette politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sea-green mb-4">
                2. Informations que nous collectons
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-celestial-blue mb-2">
                    2.1 Informations que vous nous fournissez
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nom d&apos;utilisateur et adresse email lors de l&apos;inscription</li>
                    <li>Mot de passe (stocké de manière sécurisée et chiffrée)</li>
                    <li>Photo de profil et informations de biographie</li>
                    <li>Contenu que vous publiez (posts, commentaires, messages)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-celestial-blue mb-2">
                    2.2 Informations collectées automatiquement
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Adresse IP et informations de l&apos;appareil</li>
                    <li>Données d&apos;utilisation et de navigation</li>
                    <li>Cookies et technologies similaires</li>
                    <li>Horodatage des activités sur la plateforme</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-folly mb-4">
                3. Comment nous utilisons vos informations
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir et maintenir les services de TwiX</li>
                <li>Authentifier votre identité et sécuriser votre compte</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Communiquer avec vous concernant votre compte ou nos services</li>
                <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
                <li>Détecter et prévenir les activités frauduleuses ou abusives</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-celestial-blue mb-4">
                4. Partage de vos informations
              </h2>
              <p className="leading-relaxed mb-4">
                Nous ne vendons, n&apos;échangeons ni ne louons vos informations personnelles à des tiers. 
                Nous pouvons partager vos informations dans les cas suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Avec votre consentement explicite</li>
                <li>Pour se conformer aux obligations légales</li>
                <li>Pour protéger nos droits, notre propriété ou notre sécurité</li>
                <li>En cas de fusion, acquisition ou vente d&apos;actifs</li>
                <li>Avec des prestataires de services qui nous aident à exploiter la plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sea-green mb-4">
                5. Sécurité des données
              </h2>
              <p className="leading-relaxed mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                appropriées pour protéger vos informations personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des mots de passe avec bcrypt</li>
                <li>Utilisation de tokens JWT sécurisés pour l&apos;authentification</li>
                <li>Validation par email pour les nouveaux comptes</li>
                <li>Connexions HTTPS sécurisées</li>
                <li>Surveillance continue des accès et activités suspectes</li>
                <li>Sauvegardes régulières et sécurisées des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-folly mb-4">
                6. Vos droits
              </h2>
              <p className="leading-relaxed mb-4">
                Vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Droit d&apos;accès à vos informations personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l&apos;effacement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d&apos;opposition au traitement de vos données</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à l&apos;adresse :{" "}
                <span className="text-celestial-blue font-semibold">privacy@twix.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-celestial-blue mb-4">
                7. Conservation des données
              </h2>
              <p className="leading-relaxed">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire pour 
                fournir nos services, respecter nos obligations légales, résoudre les litiges et 
                appliquer nos accords. Lorsque vous supprimez votre compte, nous supprimons ou 
                anonymisons vos données personnelles, sauf si nous sommes légalement tenus de les conserver.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sea-green mb-4">
                8. Modifications de cette politique
              </h2>
              <p className="leading-relaxed">
                Nous pouvons modifier cette politique de confidentialité de temps en temps. 
                Toute modification importante sera communiquée par email ou via une notification 
                sur la plateforme. La date de la dernière mise à jour est indiquée en haut de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-folly mb-4">
                9. Contact
              </h2>
              <p className="leading-relaxed">
                Si vous avez des questions concernant cette politique de confidentialité ou 
                nos pratiques de protection des données, vous pouvez nous contacter :
              </p>
              <div className="mt-4 p-4 bg-celestial-blue/5 rounded-lg">
                <p><strong>Email :</strong> privacy@twix.com</p>
                <p><strong>Page de contact :</strong> <Link href="/contact" className="text-celestial-blue hover:underline">twix.com/contact</Link></p>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <footer className="mt-12 pt-8 border-t border-sea-green/20 text-center">
            <div className="flex justify-center gap-6">
              <Link href="/about" className="text-celestial-blue hover:underline">
                À propos
              </Link>
              <Link href="/contact" className="text-celestial-blue hover:underline">
                Contact
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
