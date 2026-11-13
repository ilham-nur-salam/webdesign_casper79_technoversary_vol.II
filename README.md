<div align="center">

<img src="docs/media/01-hero.jpg" alt="FORESTWATCH Banner" width="100%">

<br><br>

<img src="public/logo/logo-horizontal.png" alt="FORESTWATCH" height="56">

### *Web Edukasi Karhutla Indonesia: Pahami, Cegah, Pulihkan*

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-2ecc71?style=for-the-badge&logo=vercel&logoColor=white)](ISI_URL_VERCEL)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-A11y_100_·_BP_100_·_SEO_100-F44B21?style=for-the-badge&logo=lighthouse&logoColor=white)](#-hasil-lighthouse)
[![Competition](https://img.shields.io/badge/Technoversary-Vol._II_·_EcoDigital-1B4D3E?style=for-the-badge)](#)

<p align="center">
  <b>Memahami</b> • <b>Mencegah</b> • <b>Bertindak</b> • <b>Memulihkan</b>
</p>

</div>

---

## 🌲 Tentang FORESTWATCH

**FORESTWATCH** adalah web edukasi tentang kebakaran hutan dan lahan (karhutla) di Indonesia. Setiap musim kemarau, jutaan orang terdampak asapnya, tetapi tidak semua tahu penyebabnya, cara mencegahnya, atau apa yang harus dilakukan saat melihat api.

Beranda dibuat sebagai **scrollytelling sinematik**: pengunjung menggulir dari hutan yang sehat, api pertama, kabut asap, hingga lahan pasca kebakaran lewat urutan 189 frame yang digambar di HTML5 Canvas. Setelah itu pengunjung masuk ke artikel, fitur interaktif, dan ajakan untuk ikut menjaga serta memulihkan lingkungan.

> **Prinsip konten:** tidak ada angka, kutipan, atau kontak yang dikarang. Setiap statistik memuat tahun dan tautan sumber. Titik panas satelit diperlakukan sebagai indikasi, bukan konfirmasi kebakaran. FORESTWATCH adalah platform edukasi, **bukan layanan darurat**.

---

## 🏆 Tim Pengembang

Dikembangkan untuk kompetisi **Technoversary Vol. II (Web Design, tema EcoDigital)**.

| Foto | Nama | Peran & Kelas | Kontak |
| :---: | :--- | :--- | :---: |
| <img src="https://ui-avatars.com/api/?name=Nama+1&background=1B4D3E&color=fff" width="50" style="border-radius:50%"> | **[ilham nur salam]**<br>*([XII RPL 2])* | **Lead Developer** | [![INSTAGRAM](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](ISI_LINK) |
| <img src="https://ui-avatars.com/api/?name=Nama+2&background=85A98F&color=fff" width="50" style="border-radius:50%"> | **[Ledzi dwi liantona]**<br>*([XI RPL 1])* | **Member** | [![INSTAGRAM](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](ISI_LINK) |
| <img src="https://ui-avatars.com/api/?name=Nama+3&background=0D1410&color=fff" width="50" style="border-radius:50%"> | **[Wildan Ferdiansyah]**<br>*([XI RPL 1])* | **Member** | [![INSTAGRAM](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](ISI_LINK) |

**Nama tim:** [Casper 79] &nbsp;•&nbsp; **Asal:** [Smk pertiwi kuningan]

---

## 🚀 Fitur Unggulan

### 1. 🎬 **Scrollytelling Sinematik**
- **Canvas Image Sequence**: 189 frame (1600×900) yang dikendalikan posisi scroll, dengan crossfade antar frame dan pegas (spring) agar gerakan terasa halus.
- **Tiga tahap cerita**: Healthy → Smoke → Aftermath, bisa dilompati lewat tombol tahap di sisi kanan.
- **Smooth scroll** dengan Lenis, preloader progresif, dan dukungan `prefers-reduced-motion` (menampilkan frame akhir tanpa animasi).

### 2. 📚 **Konten Edukasi Bersumber**
- **Empat artikel**: Pahami, Cegah, Jika Melihat Api, dan Pulihkan.
- **Fakta ber-sumber**: 4 statistik dengan tahun dan tautan ke publikasi asli, dengan animasi count-up.
- **Pesan kunci**: slider edukatif dengan kontrol jeda, panah keyboard, dan swipe di mobile.

### 3. 🧪 **Uji Diri: Cek Risiko & Kuis**
- **Cek Risiko**: 8 pernyataan berbobot yang menghasilkan tingkat Rendah / Sedang / Tinggi beserta saran tindak lanjut.
- **Kuis 6 pertanyaan** dengan penjelasan di setiap jawaban dan skor akhir.

### 4. 🖼️ **Galeri dengan Lightbox**
- 13 ilustrasi AI (diberi label jelas), navigasi keyboard (← → Esc), focus trap, dan pemulihan fokus.

### 5. ✉️ **Formulir Kontak Tervalidasi**
- Validasi di klien **dan** server lewat API route `/api/contact`, pesan kesalahan per kolom, dan fokus otomatis ke kolom bermasalah.
- **Mode demo**: pesan divalidasi tetapi belum disimpan atau dikirim ke email mana pun.

### 6. ♿ **Aksesibilitas**
- Menu layar penuh dengan focus trap, Esc, dan `aria-modal`; tautan "Lewati ke konten utama".
- Skor Lighthouse Accessibility 100 di seluruh halaman.

---

## 📸 Galeri Tampilan

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Healthy</b><br>Hutan sehat di awal perjalanan</td>
      <td align="center"><b>Smoke</b><br>Api pertama dan asap menyebar</td>
    </tr>
    <tr>
      <td><img src="docs/media/01-hero.jpg" width="100%"></td>
      <td><img src="docs/media/02-smoke.jpg" width="100%"></td>
    </tr>
    <tr>
      <td align="center"><b>Aftermath</b><br>Lahan setelah kebakaran</td>
      <td align="center"><b>Fakta Bersumber</b><br>Statistik dengan tahun dan tautan sumber</td>
    </tr>
    <tr>
      <td><img src="docs/media/03-aftermath.jpg" width="100%"></td>
      <td><img src="docs/media/04-data.jpg" width="100%"></td>
    </tr>
    <tr>
      <td align="center"><b>Konten & Galeri</b><br>Artikel dan lightbox</td>
      <td align="center"><b>Artikel</b><br>Tindakan saat melihat api</td>
    </tr>
    <tr>
      <td><img src="docs/media/05-konten.jpg" width="100%"></td>
      <td><img src="docs/media/06-artikel.jpg" width="100%"></td>
    </tr>
    <tr>
      <td align="center"><b>Uji Diri</b><br>Cek risiko dan kuis</td>
      <td align="center"><b>Kontak</b><br>Formulir dengan validasi</td>
    </tr>
    <tr>
      <td><img src="docs/media/07-interaktif.jpg" width="100%"></td>
      <td><img src="docs/media/08-kontak.jpg" width="100%"></td>
    </tr>
  </table>
</div>

---

## 🗺️ Peta Halaman

| Rute | Isi |
| :--- | :--- |
| `/` | Beranda scrollytelling, fakta bersumber, pesan kunci |
| `/tentang` | Misi, batasan platform, catatan AI, daftar sumber |
| `/konten` | Artikel dan galeri (lightbox) |
| `/konten/[slug]` | `pahami` · `cegah` · `darurat` · `pulihkan` |
| `/interaktif` | Cek risiko dan kuis |
| `/kontak` | Formulir kontak + `POST /api/contact` |

---

## 🛠️ Teknologi

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

| Kategori | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Routing, SSG, API route |
| **Bahasa** | TypeScript | Kode yang aman tipe |
| **Styling** | Tailwind CSS 3 | Design token dan layout responsif |
| **Animasi** | Framer Motion 11 | Transisi, scroll-linked animation, spring |
| **Scroll** | Lenis | Smooth scrolling |
| **Visual** | HTML5 Canvas | Menggambar image sequence 189 frame |
| **Ikon** | lucide-react | Ikon vektor |
| **Font** | Inter & Geist (lokal) | Tipografi, dimuat dengan `next/font/local` |

---

## 📊 Hasil Lighthouse

Build produksi, dijalankan lokal dengan pengaturan mobile bawaan.

| Halaman | Performance | Accessibility | Best Practices | SEO |
| :--- | :---: | :---: | :---: | :---: |
| `/` | 74 | 100 | 100 | 100 |
| `/konten` | 90 | 100 | 100 | 100 |
| `/konten/pahami` | 89 | 100 | 100 | 100 |
| `/interaktif` | 98 | 100 | 100 | 100 |
| `/tentang` | 97 | 100 | 100 | 100 |
| `/kontak` | 97 | 100 | 100 | 100 |

> Performa beranda lebih rendah karena memuat 189 frame sequence (sekitar 26 MB) demi kualitas visual. Ini kompromi desain yang disengaja.

---

## 📚 Sumber Data

| Data | Sumber |
| :--- | :--- |
| 2,6 juta ha lahan terbakar (Juni–Oktober 2015) | [World Bank — The Cost of Fire](https://documents1.worldbank.org/curated/pt/776101467990969768/pdf/103668-BRI-Cost-of-Fires-Knowledge-Note-PUBLIC-ADD-NEW-SERIES-Indonesia-Sustainable-Landscapes-Knowledge-Note.pdf) |
| 28,1 GtC estimasi karbon gambut (kisaran 13,6–40,5) | [Warren et al. (2017), Carbon Balance and Management](https://link.springer.com/doi/10.1186/s13021-017-0080-2) |
| Batas muka air tanah gambut 0,4 m | [Mongabay Indonesia — PP 57/2016](https://mongabay.co.id/2016/12/15/catatan-hukum-peraturan-gambut-lama-vs-baru/amp/) |
| 13,43 juta ha luas gambut Indonesia | [Mongabay Indonesia (3 Juni 2026), mengutip Pantau Gambut](https://mongabay.co.id/2026/06/03/ketika-ekosistem-gambut-makin-kritis/amp/) |
| Rujukan pemantauan | [SiPongi KLHK](https://sipongi.menlhk.go.id) · [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov) · [BMKG](https://www.bmkg.go.id) · [BRGM](https://brgm.go.id) |

---

## 🤖 Keaslian & Penggunaan AI

- Urutan scroll di beranda dan 13 gambar galeri adalah **ilustrasi buatan AI**, diberi label "Ilustrasi AI" di dalam situs. Bukan dokumentasi kejadian nyata.
- Alat AI untuk visual: [ISI NAMA ALAT, mis. Google Whisk / Veo].
- Foto acuan urutan scroll: [ISI SUMBER & LISENSI FOTO].
- Kode ditulis dengan bantuan AI. Tidak ada template berbayar.

---

## ⚙️ Instalasi & Penggunaan

Butuh **Node.js 18.17 atau lebih baru**.

1.  **Clone Repository**
    ```bash
    git clone https://github.com/ilham-nur-salam/webdesign_casper79_technoversary_vol.II.git
    ```

2.  **Masuk ke Direktori**
    ```bash
    cd webdesign_casper79_technoversary_vol.II
    ```

3.  **Install Dependensi**
    ```bash
    npm install
    ```

4.  **Jalankan Mode Pengembangan**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000).

5.  **Build Produksi**
    ```bash
    npm run build && npm start
    ```



## ⚠️ Catatan Keselamatan

FORESTWATCH adalah platform edukasi, **bukan layanan darurat**. Bila melihat kebakaran aktif, jauhi lokasi dan hubungi **112** atau BPBD dan pemadam kebakaran setempat.

---

<div align="center">

### *"Satu percikan cukup. Pengetahuan yang benar juga."*

Copyright © 2026 **[Casper 79]**. Dibuat untuk Technoversary Vol. II.

</div>
