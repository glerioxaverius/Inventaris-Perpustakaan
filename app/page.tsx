import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-10 px-4">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Selamat Datang di Sistem Manajemen Perpustakaan
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sisem inventaris digital yang memudahkan pencatatan aktivitas
          Perpustakaan.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Mulai Kelola
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <Link
            href="/books"
            className="w-full md:w-1/3 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-blue-500 text-white p-8 rounded-lg shadow-xl flex flex-col items-center">
              <span className="text-5xl mb-4">📚</span>
              <h3 className="text-2xl font-bold">Manajemen Buku</h3>
              <p className="mt-2 text-blue-100">
                Tambah, edit, hapus, dan kelola semua koleksi buku Anda.
              </p>
            </div>
          </Link>

          <Link
            href="/members"
            className="w-full md:w-1/3 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-green-500 text-white p-8 rounded-lg shadow-xl flex flex-col items-center">
              <span className="text-5xl mb-4">👥</span>
              <h3 className="text-2xl font-bold">Manajemen Anggota</h3>
              <p className="mt-2 text-green-100">
                Kelola data anggota, pendaftaran, dan lihat riwayat.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
