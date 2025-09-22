"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemberCard from "../Component/MemberCard";
import { Member } from "../lib/types";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMemberDeleted = (deletedMemberId: string) => {
    setMembers(members.filter((member) => member.id !== deletedMemberId));
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Gagal mengambil data anggota: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <p>Memuat data anggota...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3l font-bold">Daftar Anggota</h1>
        <Link
          href="/members/add"
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700"
        >
          + Tambah Anggota
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onDelete={handleMemberDeleted}
          />
        ))}
      </div>
    </div>
  );
}
