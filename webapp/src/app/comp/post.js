import Image from "next/image";

export default function Post() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="w-full max-w-full bg-[var(--color-seasalt)] rounded-lg shadow p-6 border-2 border-[var(--color-celestial-blue)]">
=======
    <div className="w-full max-w-full bg-[var(--color-celestial-blue)] dark:bg-[var(--color-rich-black)] rounded-lg shadow p-6">
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
    <div className="w-full max-w-full bg-[var(--color-celestial-blue)] rounded-lg shadow p-6">
>>>>>>> 8764791 (Init profil page)
=======
    <div className="w-full max-w-full bg-[var(--color-seasalt)] rounded-lg shadow p-6 border-2 border-[var(--color-celestial-blue)]">
>>>>>>> 2e64745 (Modif esthetique homepage)
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center mb-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <label htmlFor="description" className="mb-0 w-full text-lg font-extrabold text-rich-black">
=======
          <label htmlFor="description" className="mb-0 w-full text-lg text-[var(--color-seasalt)]">
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
          <label htmlFor="description" className="mb-0 w-full text-lg font-extrabold text-[var(--color-seasalt)]">
>>>>>>> 8764791 (Init profil page)
=======
          <label htmlFor="description" className="mb-0 w-full text-lg font-extrabold text-rich-black">
>>>>>>> 2e64745 (Modif esthetique homepage)
            Comment ça va ?
          </label>
        </div>
        <div>
          <textarea
            id="description"
            required
            placeholder="Écrire ici"
            rows={3}
<<<<<<< HEAD
<<<<<<< HEAD
            className="w-full resize-y rounded-md border border-gray-300 p-2 bg-grey text-[var(--color-rich-black)]"
=======
            className="w-full resize-y rounded-md border border-gray-300 p-2 bg-[var(--color-seasalt)] text-[var(--color-rich-black)]"
>>>>>>> b2fa2f6 (Debut de suppression de flowbite)
=======
            className="w-full resize-y rounded-md border border-gray-300 p-2 bg-grey text-[var(--color-rich-black)]"
>>>>>>> 2e64745 (Modif esthetique homepage)
          />
        </div>
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="bg-[var(--color-folly)] text-[var(--color-seasalt)] px-4 py-2 rounded hover:bg-[var(--color-sea-green)] transition"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}