export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  status: "tersedia" | "dipinjamkan";
}

export interface Member {
  id: string;
  name: string;
  unique_member_id: string;
  phone: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: String;
  returnDate?: String;
}
