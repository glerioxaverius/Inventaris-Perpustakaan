import AddBookForm from "@/app/Component/AddBookForm";

export default function AddBookPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6"> Tambah Buku Baru</h1>
      <p className="mb-4">Isi detail buku pada form di bawah ini.</p>
      <AddBookForm />
    </div>
  );
}
