import { useRef } from "react";
import Image from "next/image";
import { createPost } from "../../services/PostsServices"

export default function Post({ onPostCreated }) {
  const contentRef = useRef(null);

  function generatePost(e) 
  {
    e.preventDefault();
    const content = contentRef.current?.value;

    if(!content)
    {
      console.error("Le contenu du post est vide !");
      return;
    }

    const post = {
      author: "685c057e357c56a715532772",
      content: content,
      image: "",
      likes: [],
    };

    // On crée le poste
    createPost(post).then(() => {
      onPostCreated();
    });

    // On reset le text
    contentRef.current.value = "";
  }

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
            ref={contentRef}
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
          onClick={generatePost}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
