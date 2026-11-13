# FORESTWATCH — Edukasi Karhutla Indonesia

Web edukasi tentang kebakaran hutan dan lahan (karhutla) di Indonesia, dibuat untuk **Technoversary Vol. II — Web Design Competition** (tema: EcoDigital).

- **Tim:** [ISI NAMA TIM]
- **Anggota:** [ISI NAMA ANGGOTA]
- **Repository:** `webdesign_[namaTim]_technoversary_vol.II`
- **Demo:** [ISI URL VERCEL]

## Deskripsi

FORESTWATCH mengajak pengunjung memahami penyebab karhutla, mencegahnya, tahu apa yang dilakukan saat melihat api, dan ikut memulihkan lingkungan. Beranda berupa scrollytelling sinematik (urutan 189 frame di canvas) dari hutan sehat, asap, hingga lahan pasca kebakaran.

## Halaman

| Rute | Isi |
| --- | --- |
| `/` | Beranda scrollytelling, fakta bersumber, pesan kunci |
| `/tentang` | Misi, batasan platform, catatan AI, sumber |
| `/konten` | Artikel dan galeri (lightbox) |
| `/konten/[slug]` | Artikel: `pahami`, `cegah`, `darurat`, `pulihkan` |
| `/interaktif` | Cek risiko (daftar periksa berskor) dan kuis 6 pertanyaan |
| `/kontak` | Formulir dengan validasi (klien dan server) |

## Fitur fungsional

- Navigasi menu layar penuh dengan focus trap, Esc, dan pemulihan fokus.
- Cek risiko dan kuis interaktif.
- Galeri dengan lightbox yang bisa dioperasikan keyboard.
- Formulir kontak dengan validasi dan API route (`/api/contact`). **Mode demo:** pesan divalidasi tetapi belum disimpan atau dikirim ke email.
- Menghormati `prefers-reduced-motion`.

## Teknologi

Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, Lenis, lucide-react, font lokal Inter dan Geist.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Butuh Node.js 18.17 atau lebih baru.

## Hasil Lighthouse (build produksi, lokal, mobile default)

| Halaman | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 74 | 100 | 100 | 100 |
| `/konten` | 90 | 100 | 100 | 100 |
| `/konten/pahami` | 89 | 100 | 100 | 100 |
| `/interaktif` | 98 | 100 | 100 | 100 |
| `/tentang` | 97 | 100 | 100 | 100 |
| `/kontak` | 97 | 100 | 100 | 100 |

Skor performa beranda lebih rendah karena memuat 189 frame sequence (sekitar 26 MB, 1600x900) untuk animasi scroll. Itu kompromi desain yang disengaja.

## Sumber data

- World Bank — The Cost of Fire (2,6 juta ha terbakar, Juni–Oktober 2015).
- Warren et al. (2017), Carbon Balance and Management (estimasi karbon gambut 28,1 GtC, kisaran 13,6–40,5).
- PP 57/2016 via Mongabay Indonesia (batas muka air tanah 0,4 m).
- Pantau Gambut via Mongabay Indonesia, 3 Juni 2026 (13,43 juta ha).
- Rujukan: KLHK SiPongi, NASA FIRMS, BMKG, BRGM.

Tautan lengkap ada di halaman Tentang dan di setiap artikel.

## Keaslian dan penggunaan AI

- Urutan scroll di beranda dan 13 gambar di `public/assets` adalah **ilustrasi buatan AI** (alat: [ISI NAMA ALAT, mis. Google Veo/Whisk]) dan diberi label "Ilustrasi AI" di situs.
- Foto acuan untuk urutan scroll: [ISI SUMBER DAN LISENSI FOTO].
- Kode ditulis dengan bantuan AI. Tidak ada template berbayar.
- Tidak ada angka, kutipan, atau kontak yang dikarang. Titik panas satelit diperlakukan sebagai indikasi, bukan konfirmasi kebakaran.

## Catatan keselamatan

FORESTWATCH adalah platform edukasi, bukan layanan darurat. Bila melihat kebakaran aktif, hubungi 112 atau BPBD dan pemadam kebakaran setempat.

## Deploy

Impor repo ke Vercel (framework Next.js terdeteksi otomatis), tanpa variabel lingkungan.
