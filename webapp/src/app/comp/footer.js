import Image from "next/image";

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-2">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/#" className="flex items-center mb-2 sm:mb-0 space-x-2 rtl:space-x-reverse">
      
                        <Image src="/logo.png" className="h-8" alt="TwiX Logo" width={20} height={32} />

                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">TwiX</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-2 text-xs font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-3 md:me-4">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-3 md:me-4">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-3 md:me-4">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
                <span className="block text-xs text-gray-500 sm:text-center dark:text-gray-400">
                    © {year} <a href="/#" className="hover:underline">TwiX™</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}