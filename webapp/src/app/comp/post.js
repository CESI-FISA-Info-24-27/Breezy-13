import { Button, Card, Label } from "flowbite-react";
import Image from "next/image";

export default function Post() {
    return (
    <Card className="w-full max-w-full">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center mb-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <Label htmlFor="description" className="mb-0 w-full text-lg text-seasalt">Comment ça va ?</Label>
        </div>
        <div>
          <textarea
            id="description"
            required
            placeholder="Écrire ici"
            rows={3}
            className="w-full resize-y rounded-md border border-gray-300 p-2 bg-seasalt text-rich_black"
            />
        </div>
        <div className="flex justify-end pt-3">
          <Button type="submit" className="bg-seasalt border border-gray-400 text-rich_black">Envoyer</Button>
        </div>
      </form>
    </Card>
  );
}