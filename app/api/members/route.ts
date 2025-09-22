import { NextResponse } from "next/server";
import { Member } from "@/app/lib/types";

export let members: Member[] = [
  { id: '1', name: 'Budi Santoso', memberId: 'P001', phone: '081234567890' },
  { id: '2', name: 'Citra Lestari', memberId: 'P002', phone: '081234567891' },
];

export async function GET() {
    return NextResponse.json(members);
}

export async function POST(request: Request) {
    try {
        const newMemberData = await request.json();

        if (!newMemberData.name || !newMemberData.memberId || !newMemberData.phone) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    const newMember: Member = {
      id: (members.length + 1).toString(),
      ...newMemberData,
    };

    members.push(newMember);
    return NextResponse.json(newMember, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}