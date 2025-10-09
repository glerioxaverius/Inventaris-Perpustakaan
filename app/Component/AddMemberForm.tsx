"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application.json' },
        body: JSON.stringify({
          name,
          unique_member_id: memberId,
          phone
        }),
      });

      if (!response.ok) throw new Error('Gagal menambahkan anggota');
          
          alert('Anggota berhasil ditambahkan!');
          router.push('/members');
        } catch (error) {
          alert('Terjadi kesalahan, coba lagi.');
        } finally {
          setIsSubmitting(false);
        }
      };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="memberId" className="block text-sm font-medium">
          ID Anggota
        </label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Nomor Telepon
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm disabled:bg-gray-400"
      >
        {isSubmitting ? "Menyimpan..." : "Simpan Anggota"}
      </button>
    </form>
  );
}
