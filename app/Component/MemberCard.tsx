'use client';

import Link from 'next/link';
import { Member } from '../lib/types';

interface MemberCardProps {
  member: Member;
  onDelete: (id: string) => void;
}

const MemberCard = ({ member, onDelete }: MemberCardProps) => {
  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      await fetch(`/api/members/${member.id}`, { method: 'DELETE' });
      onDelete(member.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="text-gray-600">ID Anggota: {member.unique_member_id}</p>
        <p className="text-sm text-gray-500 mt-2">Telepon: {member.phone}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <Link href={`/members/edit/${member.id}`} className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm text-center">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default MemberCard;