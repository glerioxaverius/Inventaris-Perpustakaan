import { NextResponse } from "next/server";
import { Book } from "@/app/lib/types";

export let books: Book[] = [
    { "id": "1", "title": "Laskar Pelangi", "author": "Andrea Hirata", "isbn": "978-979-3062-79-2", "publishedYear": 2005, "status": "dipinjamkan" },
    { "id": "2", "title": "Bumi Manusia", "author": "Pramoedya Ananta Toer", "isbn": "978-979-97312-3-4", "publishedYear": 1980, "status": "tersedia" },
    { "id": "3", "title": "Cantik Itu Luka", "author": "Eka Kurniawan", "isbn": "978-979-22-8226-9", "publishedYear": 2002, "status": "tersedia" },
    { "id": "4", "title": "Negeri 5 Menara", "author": "Ahmad Fuadi", "isbn": "978-979-1227-48-0", "publishedYear": 2009, "status": "tersedia" },
    { "id": "5", "title": "Perahu Kertas", "author": "Dee Lestari", "isbn": "978-602-8811-78-0", "publishedYear": 2009, "status": "tersedia" },
    { "id": "6", "title": "Ronggeng Dukuh Paruk", "author": "Ahmad Tohari", "isbn": "978-979-22-3759-7", "publishedYear": 1982, "status": "tersedia" },
    { "id": "7", "title": "Sang Pemimpi", "author": "Andrea Hirata", "isbn": "978-979-1227-02-2", "publishedYear": 2006, "status": "tersedia" },
    { "id": "8", "title": "Pulang", "author": "Tere Liye", "isbn": "978-602-0822-12-9", "publishedYear": 2015, "status": "tersedia" },
    { "id": "9", "title": "Gadis Kretek", "author": "Ratih Kumala", "isbn": "978-979-22-8141-5", "publishedYear": 2012, "status": "tersedia" },
    { "id": "10", "title": "Laut Bercerita", "author": "Leila S. Chudori", "isbn": "978-602-424-694-5", "publishedYear": 2017, "status": "tersedia" },
    { "id": "11", "title": "Ayat-Ayat Cinta", "author": "Habiburrahman El Shirazy", "isbn": "978-979-3604-02-4", "publishedYear": 2004, "status": "tersedia" },
    { "id": "12", "title": "Saman", "author": "Ayu Utami", "isbn": "978-979-91-4417-8", "publishedYear": 1998, "status": "tersedia" },
    { "id": "13", "title": "Filosofi Kopi", "author": "Dee Lestari", "isbn": "978-979-1152-52-3", "publishedYear": 2006, "status": "tersedia" },
    { "id": "14", "title": "5 cm", "author": "Donny Dhirgantoro", "isbn": "978-979-759-151-9", "publishedYear": 2005, "status": "tersedia" },
    { "id": "15", "title": "Dilan: Dia adalah Dilanku Tahun 1990", "author": "Pidi Baiq", "isbn": "978-602-7870-41-3", "publishedYear": 2014, "status": "tersedia" },
    { "id": "16", "title": "The Alchemist", "author": "Paulo Coelho", "isbn": "978-006-112241-5", "publishedYear": 1988, "status": "tersedia" },
    { "id": "17", "title": "To Kill a Mockingbird", "author": "Harper Lee", "isbn": "978-044-631078-9", "publishedYear": 1960, "status": "tersedia" },
    { "id": "18", "title": "1984", "author": "George Orwell", "isbn": "978-045-152493-5", "publishedYear": 1949, "status": "tersedia" },
    { "id": "19", "title": "Pride and Prejudice", "author": "Jane Austen", "isbn": "978-150-329056-3", "publishedYear": 1813, "status": "tersedia" },
    { "id": "20", "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "isbn": "978-074-327356-5", "publishedYear": 1925, "status": "tersedia" },
    { "id": "21", "title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling", "isbn": "978-059-035342-7", "publishedYear": 1997, "status": "tersedia" },
    { "id": "22", "title": "The Hobbit", "author": "J.R.R. Tolkien", "isbn": "978-061-800221-4", "publishedYear": 1937, "status": "tersedia" },
    { "id": "23", "title": "Olenka", "author": "Budi Darma", "isbn": "978-979-91-4425-3", "publishedYear": 1983, "status": "tersedia" },
    { "id": "24", "title": "Lelaki Harimau", "author": "Eka Kurniawan", "isbn": "978-602-03-0301-4", "publishedYear": 2014, "status": "tersedia" },
    { "id": "25", "title": "Supernova: Ksatria, Puteri, dan Bintang Jatuh", "author": "Dee Lestari", "isbn": "978-979-96257-1-4", "publishedYear": 2001, "status": "tersedia" },
    { "id": "26", "title": "Rectoverso", "author": "Dee Lestari", "isbn": "978-979-1227-23-7", "publishedYear": 2008, "status": "tersedia" },
    { "id": "27", "title": "Hujan Bulan Juni", "author": "Sapardi Djoko Damono", "isbn": "978-979-22-2430-6", "publishedYear": 1994, "status": "tersedia" },
    { "id": "28", "title": "Critical Eleven", "author": "Ika Natassa", "isbn": "978-602-03-1894-0", "publishedYear": 2015, "status": "tersedia" },
    { "id": "29", "title": "Tenggelamnya Kapal Van Der Wijck", "author": "Hamka", "isbn": "978-979-418-055-9", "publishedYear": 1938, "status": "tersedia" },
    { "id": "30", "title": "Kambing Jantan: Sebuah Catatan Harian Pelajar Bodoh", "author": "Raditya Dika", "isbn": "978-979-3286-07-2", "publishedYear": 2005, "status": "tersedia" },
    { "id": "31", "title": "Norwegian Wood", "author": "Haruki Murakami", "isbn": "978-037-570402-4", "publishedYear": 1987, "status": "tersedia" },
    { "id": "32", "title": "Kafka on the Shore", "author": "Haruki Murakami", "isbn": "978-140-007927-8", "publishedYear": 2002, "status": "tersedia" },
    { "id": "33", "title": "Siddhartha", "author": "Hermann Hesse", "isbn": "978-055-320884-9", "publishedYear": 1922, "status": "tersedia" },
    { "id": "34", "title": "The Catcher in the Rye", "author": "J.D. Salinger", "isbn": "978-031-676948-8", "publishedYear": 1951, "status": "tersedia" },
    { "id": "35", "title": "Brave New World", "author": "Aldous Huxley", "isbn": "978-006-085052-4", "publishedYear": 1932, "status": "tersedia" },
    { "id": "36", "title": "Amba", "author": "Laksmi Pamuntjak", "isbn": "978-602-97262-4-9", "publishedYear": 2012, "status": "tersedia" },
    { "id": "37", "title": "Anak Semua Bangsa", "author": "Pramoedya Ananta Toer", "isbn": "978-979-97312-4-1", "publishedYear": 1980, "status": "tersedia" },
    { "id": "38", "title": "Jejak Langkah", "author": "Pramoedya Ananta Toer", "isbn": "978-979-97312-5-8", "publishedYear": 1985, "status": "tersedia" },
    { "id": "39", "title": "Rumah Kaca", "author": "Pramoedya Ananta Toer", "isbn": "978-979-97312-6-5", "publishedYear": 1988, "status": "tersedia" },
    { "id": "40", "title": "Aroma Karsa", "author": "Dee Lestari", "isbn": "978-602-291-463-7", "publishedYear": 2018, "status": "tersedia" },
    { "id": "41", "title": "Garis Waktu", "author": "Fiersa Besari", "isbn": "978-602-220-192-3", "publishedYear": 2016, "status": "tersedia" },
    { "id": "42", "title": "Konspirasi Alam Semesta", "author": "Fiersa Besari", "isbn": "978-602-614-262-6", "publishedYear": 2017, "status": "tersedia" },
    { "id": "43", "title": "Marmut Merah Jambu", "author": "Raditya Dika", "isbn": "978-979-780-457-4", "publishedYear": 2010, "status": "tersedia" },
    { "id": "44", "title": "The Kite Runner", "author": "Khaled Hosseini", "isbn": "978-159-448000-3", "publishedYear": 2003, "status": "tersedia" },
    { "id": "45", "title": "A Thousand Splendid Suns", "author": "Khaled Hosseini", "isbn": "978-159-448950-1", "publishedYear": 2007, "status": "tersedia" },
    { "id": "46", "title": "Life of Pi", "author": "Yann Martel", "isbn": "978-015-602732-8", "publishedYear": 2001, "status": "tersedia" },
    { "id": "47", "title": "The Book Thief", "author": "Markus Zusak", "isbn": "978-037-584220-9", "publishedYear": 2005, "status": "tersedia" },
    { "id": "48", "title": "Seperti Dendam, Rindu Harus Dibayar Tuntas", "author": "Eka Kurniawan", "isbn": "978-602-03-0524-7", "publishedYear": 2014, "status": "tersedia" },
    { "id": "49", "title": "Surat Kecil Untuk Tuhan", "author": "Agnes Davonar", "isbn": "978-979-18330-0-1", "publishedYear": 2008, "status": "tersedia" },
    { "id": "50", "title": "A Wrinkle in Time", "author": "Madeleine L'Engle", "isbn": "978-031-236754-1", "publishedYear": 1962, "status": "tersedia" }
];

export async function GET() {
    return NextResponse.json(books);
}

export async function POST(request: Request) {
    const newBook: Book = await request.json();
    newBook.id = (books.length + 1).toString();
    books.push(newBook);
    return NextResponse.json(newBook, {status: 201});
}