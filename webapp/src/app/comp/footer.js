import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-celestial-blue rounded-lg shadow-sm m-2">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/#" className="flex items-center mb-2 sm:mb-0 space-x-2 rtl:space-x-reverse">
                        <Image src="/logo.png" className="h-8" alt="TwiX Logo" width={20} height={32} />
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">TwiX</span>
                    </Link>
                    <div className="flex flex-wrap items-center mb-2 text-xs font-medium text-rich-seasalt sm:mb-0 dark:text-seasalt">
                        <Link href="#" className="hover:underline me-3 md:me-4">About</Link>
                        <Link href="#" className="hover:underline me-3 md:me-4">Privacy Policy</Link>
                        <Link href="#" className="hover:underline me-3 md:me-4">Licensing</Link>
                        <Link href="#" className="hover:underline">Contact</Link>
                    </div>
                </div>
                <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
                <span className="block text-xs text-seasalt sm:text-center dark:text-seasalt">
                    © {year} <Link href="/#" className="hover:underline">TwiX™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}