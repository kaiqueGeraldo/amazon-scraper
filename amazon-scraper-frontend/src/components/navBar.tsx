import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="px-8 py-4 border-b border-gray-200 mb-8">
      <ul className="flex gap-8 text-lg font-semibold">
        <li>
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-300 hover:text-blue-500"
            } transition`}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/favorites"
            className={`${
              pathname === "/favorites"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-300 hover:text-blue-500"
            } transition`}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}
