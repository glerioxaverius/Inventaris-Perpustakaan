import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Perpus Digital
        </Link>
        <div className="space-x-4">
          <Link href="/books" className="text-gray-300 hover:text-white">
            Manajemen Buku
          </Link>
          <Link href="/members" className="text-gray-300 hover:text-white">
            Anggota
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
