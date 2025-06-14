import Image from "next/image";

export default function Post() {
  return (
    <div className="w-full max-w-full bg-[var(--color-seasalt)] rounded-lg shadow p-6 border-2 border-[var(--color-celestial-blue)]">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center mb-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <label htmlFor="description" className="mb-0 w-full text-lg font-extrabold text-rich-black">
            Comment ça va ?
          </label>
        </div>
        <div>
          <textarea
            id="description"
            required
            placeholder="Écrire ici"
            rows={3}
            className="w-full resize-y rounded-md border border-gray-300 p-2 bg-grey text-[var(--color-rich-black)]"
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