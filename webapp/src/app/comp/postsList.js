import { Button, Card, Label } from "flowbite-react";
import Image from "next/image";
import { HiOutlineUserAdd, HiOutlineUserRemove, HiOutlineShare, HiShare } from "react-icons/hi";

export function PostsList() {
  return (
    <Card className="w-full max-w-full">
      <form className="flex flex-col gap-4 w-full">
        <div className="flex items-center mb-2 justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <Label htmlFor="user" className="mb-0 w-full text-lg font-bold text-seasalt">
              Elon Cuck
            </Label>
          </div>
          <HiOutlineUserAdd className="text-seasalt text-2xl cursor-pointer" />
        </div>
        <div>
          <Label htmlFor="message" className="mb-0 w-full text-lg font-bold text-seasalt">
            Achetez mes voitures !
          </Label>
        </div>
        <div className="flex justify-start pt-3">
          <HiOutlineUserAdd className="text-seasalt text-2xl cursor-pointer" />
          <HiOutlineUserAdd className="text-seasalt text-2xl cursor-pointer" />
          <HiOutlineUserAdd className="text-seasalt text-2xl cursor-pointer" />
        </div>
      </form>
    </Card>
  );
}
