export interface Source {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  num: string;
  title: string;
  kicker: string;
  lead: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; body: string[]; bullets?: string[] }[];
  sources: Source[];
}

export const SOURCES = {
  worldBank: {
    label: "World Bank — The Cost of Fire: An Economic Analysis of Indonesia's 2015 Fire Crisis",
    url: "https://documents1.worldbank.org/curated/pt/776101467990969768/pdf/103668-BRI-Cost-of-Fires-Knowledge-Note-PUBLIC-ADD-NEW-SERIES-Indonesia-Sustainable-Landscapes-Knowledge-Note.pdf",
  },
  warren: {
    label: "Warren et al. (2017) — An appraisal of Indonesia's immense peat carbon stock, Carbon Balance and Management",
    url: "https://link.springer.com/doi/10.1186/s13021-017-0080-2",
  },
  pp57: {
    label: "Mongabay Indonesia — Catatan Hukum Peraturan Gambut: Lama vs Baru (PP 57/2016)",
    url: "https://mongabay.co.id/2016/12/15/catatan-hukum-peraturan-gambut-lama-vs-baru/amp/",
  },
  pantau: {
    label: "Mongabay Indonesia (3 Juni 2026) — Ketika Ekosistem Gambut Makin Kritis, mengutip analisis Pantau Gambut",
    url: "https://mongabay.co.id/2026/06/03/ketika-ekosistem-gambut-makin-kritis/amp/",
  },
  sipongi: { label: "KLHK — SiPongi Karhutla Monitoring System", url: "https://sipongi.menlhk.go.id" },
  firms: { label: "NASA FIRMS — Fire Information for Resource Management System", url: "https://firms.modaps.eosdis.nasa.gov" },
  bmkg: { label: "BMKG — Badan Meteorologi, Klimatologi, dan Geofisika", url: "https://www.bmkg.go.id" },
  brgm: { label: "BRGM — Badan Restorasi Gambut dan Mangrove", url: "https://brgm.go.id" },
} satisfies Record<string, Source>;

export const STATS = [
  {
    id: "burned-2015",
    value: 2.6,
    decimals: 1,
    unit: " juta ha",
    label: "Lahan terbakar pada 2015",
    desc: "Pemerintah Indonesia melaporkan sekitar 2,6 juta hektare lahan terbakar antara Juni dan Oktober 2015.",
    year: "2015",
    source: SOURCES.worldBank,
  },
  {
    id: "peat-area",
    value: 13.43,
    decimals: 2,
    unit: " juta ha",
    label: "Luas gambut Indonesia",
    desc: "Perkiraan luas lahan gambut Indonesia menurut analisis Pantau Gambut. Angka berbeda antar peta, sehingga selalu cek metodologinya.",
    year: "2026",
    source: SOURCES.pantau,
  },
  {
    id: "carbon",
    value: 28.1,
    decimals: 1,
    unit: " GtC",
    label: "Estimasi karbon di gambut",
    desc: "Estimasi terbaik cadangan karbon gambut Indonesia (kisaran 13,6 sampai 40,5 GtC) dari perbandingan dua peta nasional.",
    year: "2017",
    source: SOURCES.warren,
  },
  {
    id: "water-table",
    value: 40,
    decimals: 0,
    unit: " cm",
    label: "Batas muka air tanah gambut",
    desc: "Gambut dinyatakan rusak bila muka air tanahnya lebih dari 0,4 meter di bawah permukaan gambut (kriteria fungsi budi daya).",
    year: "2016",
    source: SOURCES.pp57,
  },
];

export const ARTICLES: Article[] = [
  {
    slug: "pahami",
    num: "01",
    title: "Pahami Karhutla",
    kicker: "Penyebab & cara kerja",
    lead: "Karhutla bukan hanya soal api. Ia terjadi ketika bahan bakar yang kering bertemu sumber api, dan sebagian besar sumber api itu berasal dari aktivitas manusia.",
    image: "/assets/dried-peat.webp",
    imageAlt: "Ilustrasi AI: lahan gambut kering dan retak",
    sections: [
      {
        heading: "Tiga hal yang harus bertemu",
        body: [
          "Kebakaran membutuhkan bahan bakar, oksigen, dan panas atau sumber api. Pada lahan gambut, bahan bakarnya adalah tanah organik itu sendiri. Selama gambut basah, ia sulit terbakar. Begitu kering, ia menjadi bahan bakar yang bisa menyala dan membara.",
        ],
      },
      {
        heading: "Penyebab utama",
        body: [
          "Sebagian besar kejadian dipicu aktivitas manusia, baik sengaja maupun lalai. Faktor alam seperti kemarau panjang tidak menyalakan api sendiri, tetapi membuat lahan lebih mudah terbakar dan api lebih sulit dikendalikan.",
        ],
        bullets: [
          "Pembukaan lahan dengan cara membakar.",
          "Kanal dan parit yang mengeringkan gambut sehingga muka air turun.",
          "Puntung rokok, api unggun, atau pembakaran sampah yang tidak dipadamkan.",
          "Kemarau panjang, termasuk saat fenomena El Niño, yang mengeringkan vegetasi dan tanah.",
        ],
      },
      {
        heading: "Mengapa gambut berbeda",
        body: [
          "Api di gambut dapat menjalar di bawah permukaan, tanpa nyala besar, sehingga sulit dilihat dan sulit dipadamkan. Asapnya bisa bertahan lama dan terbawa jauh dari titik awalnya.",
          "Gambut juga menyimpan karbon dalam jumlah besar. Saat terbakar, karbon itu dilepas ke atmosfer.",
        ],
      },
      {
        heading: "Titik panas bukan berarti kebakaran",
        body: [
          "Titik panas (hotspot) adalah deteksi anomali suhu oleh satelit. Itu indikasi yang perlu dicek di lapangan, bukan konfirmasi kebakaran. Gunakan data resmi seperti SiPongi dan NASA FIRMS dengan konteks.",
        ],
      },
    ],
    sources: [SOURCES.warren, SOURCES.worldBank, SOURCES.sipongi, SOURCES.firms],
  },
  {
    slug: "cegah",
    num: "02",
    title: "Cegah dari Sekarang",
    kicker: "Pencegahan & kebiasaan",
    lead: "Pencegahan paling murah adalah menjaga gambut tetap basah dan tidak memberi api kesempatan untuk mulai.",
    image: "/assets/canal-block.webp",
    imageAlt: "Ilustrasi AI: sekat kanal untuk menahan air di lahan gambut",
    sections: [
      {
        heading: "Jaga air, jaga gambut",
        body: [
          "Pembasahan kembali (rewetting) dilakukan antara lain dengan sekat kanal yang menahan air tetap di lahan. Tujuannya menjaga muka air tanah agar tidak turun melewati batas kerusakan, yaitu sekitar 40 cm di bawah permukaan gambut.",
        ],
      },
      {
        heading: "Kebiasaan sehari-hari",
        body: ["Banyak kebakaran dimulai dari hal kecil."],
        bullets: [
          "Jangan membuka lahan dengan membakar.",
          "Pastikan api unggun dan pembakaran sampah benar-benar padam sebelum ditinggalkan.",
          "Jangan membuang puntung rokok sembarangan, terutama di lahan kering dan semak.",
          "Laporkan kegiatan pembakaran lahan yang mencurigakan ke pihak berwenang.",
        ],
      },
      {
        heading: "Peran masyarakat",
        body: [
          "Pencegahan paling efektif bila dilakukan bersama. Ikuti informasi dari pemerintah desa, BPBD, dan kelompok masyarakat peduli api di daerahmu, serta pantau peringatan cuaca dan kekeringan dari BMKG.",
        ],
      },
    ],
    sources: [SOURCES.pp57, SOURCES.bmkg, SOURCES.brgm],
  },
  {
    slug: "darurat",
    num: "03",
    title: "Jika Melihat Api",
    kicker: "Tindakan saat darurat",
    lead: "Keselamatanmu lebih penting daripada memadamkan api. Jauhi bahaya, lalu laporkan dengan informasi yang jelas.",
    image: "/assets/fireFighter.webp",
    imageAlt: "Ilustrasi AI: petugas pemadam di area kebakaran lahan",
    sections: [
      {
        heading: "Langkah cepat",
        body: ["FORESTWATCH adalah platform edukasi, bukan layanan darurat. Urutan berikut berlaku saat kamu menemukan indikasi api."],
        bullets: [
          "Jauhi api dan asap. Jangan mendekat untuk memadamkan sendiri bila api sudah besar atau menjalar.",
          "Hubungi 112 (nomor darurat nasional) atau BPBD dan pemadam kebakaran setempat.",
          "Sebutkan lokasi sejelas mungkin: desa, jalan, patokan terdekat, dan koordinat bila ada.",
          "Jelaskan yang kamu lihat: api atau hanya asap, perkiraan luas, arah angin.",
          "Ajak orang di sekitar menjauh dan tunggu petugas. Jangan menghalangi akses jalan.",
        ],
      },
      {
        heading: "Saat asap tebal",
        body: [
          "Kurangi aktivitas di luar ruangan, tutup jendela, dan gunakan masker yang sesuai. Masker kain biasa tidak menyaring partikel halus dengan baik, masker jenis N95 atau setara lebih sesuai.",
          "Kelompok rentan seperti anak, lansia, ibu hamil, dan penderita penyakit pernapasan perlu ekstra waspada. Cari bantuan medis bila sesak napas atau batuk berat.",
        ],
      },
      {
        heading: "Cek kualitas udara",
        body: [
          "Pantau ISPU (Indeks Standar Pencemar Udara) dari sumber resmi. Kategori Tidak Sehat dimulai pada nilai di atas 100 dan Berbahaya pada nilai di atas 300.",
        ],
      },
    ],
    sources: [SOURCES.bmkg, SOURCES.sipongi],
  },
  {
    slug: "pulihkan",
    num: "04",
    title: "Ikut Memulihkan",
    kicker: "Restorasi & partisipasi",
    lead: "Lahan yang pernah terbakar bisa dipulihkan, tetapi prosesnya panjang. Mulai dari air, lalu tanaman, lalu mata pencaharian warga.",
    image: "/assets/planting.webp",
    imageAlt: "Ilustrasi AI: penanaman kembali vegetasi di lahan gambut",
    sections: [
      {
        heading: "Pendekatan 3R",
        body: ["Restorasi gambut di Indonesia umumnya dijelaskan lewat tiga langkah."],
        bullets: [
          "Rewetting: membasahi kembali gambut, misalnya dengan sekat kanal.",
          "Revegetasi: menanam kembali jenis tumbuhan asli rawa gambut.",
          "Revitalisasi mata pencaharian: membantu warga punya sumber penghasilan yang tidak bergantung pada pembakaran.",
        ],
      },
      {
        heading: "Cara kamu ikut berperan",
        body: ["Kamu tidak harus berada di lokasi untuk membantu."],
        bullets: [
          "Pelajari dan bagikan informasi yang benar dari sumber resmi.",
          "Dukung organisasi dan program restorasi yang transparan soal hasilnya.",
          "Bergabung dengan kegiatan relawan resmi di daerahmu melalui desa atau BPBD.",
          "Pilih produk dan pemasok yang tidak berasal dari pembukaan lahan dengan membakar.",
        ],
      },
    ],
    sources: [SOURCES.brgm, SOURCES.pp57],
  },
];

export const GALLERY = [
  { src: "/assets/canopy-mist.webp", title: "Kabut di atas kanopi", note: "Hutan sehat menyimpan air dan karbon." },
  { src: "/assets/golden-river.webp", title: "Sungai di lanskap hutan", note: "Sungai dan rawa adalah bagian dari sistem air gambut." },
  { src: "/assets/aerial-river.webp", title: "Sungai dari udara", note: "Pandangan udara membantu memahami lanskap." },
  { src: "/assets/dried-peat.webp", title: "Gambut mengering", note: "Gambut kering mudah terbakar." },
  { src: "/assets/kolomAsap.webp", title: "Kolom asap", note: "Asap kebakaran dapat terbawa jauh dari sumbernya." },
  { src: "/assets/fireFighter.webp", title: "Petugas di lapangan", note: "Pemadaman adalah kerja tim terlatih." },
  { src: "/assets/villager-mask.webp", title: "Warga bermasker", note: "Asap berdampak pada kesehatan warga." },
  { src: "/assets/setelahKebakaran.webp", title: "Setelah kebakaran", note: "Lahan yang terbakar kehilangan penutup vegetasi." },
  { src: "/assets/canal-block.webp", title: "Sekat kanal", note: "Menahan air agar gambut tetap basah." },
  { src: "/assets/patroliPencegahan.webp", title: "Patroli pencegahan", note: "Patroli desa membantu deteksi dini." },
  { src: "/assets/planting.webp", title: "Menanam kembali", note: "Revegetasi dengan jenis asli rawa gambut." },
  { src: "/assets/regenerating.webp", title: "Hutan pulih", note: "Pemulihan membutuhkan waktu bertahun-tahun." },
  { src: "/assets/satwaTerdampak.webp", title: "Satwa yang terdampak", note: "Kebakaran menghilangkan habitat satwa." },
];

export const CHECKLIST = [
  { id: "c1", text: "Di sekitar tempat tinggalku ada kanal atau parit yang mengeringkan lahan gambut.", weight: 2 },
  { id: "c2", text: "Ada kebiasaan membakar lahan atau sampah di lingkungan sekitar.", weight: 3 },
  { id: "c3", text: "Sedang musim kemarau atau cuaca sangat kering selama beberapa minggu.", weight: 2 },
  { id: "c4", text: "Banyak semak atau rumput kering di lahan terbuka dekat permukiman.", weight: 2 },
  { id: "c5", text: "Tidak ada kelompok peduli api atau patroli di desa atau lingkunganku.", weight: 1 },
  { id: "c6", text: "Aku tidak tahu nomor darurat dan kontak BPBD setempat.", weight: 1 },
  { id: "c7", text: "Lahan di sekitarku pernah terbakar dalam beberapa tahun terakhir.", weight: 2 },
  { id: "c8", text: "Akses jalan untuk mobil pemadam ke area ini sulit.", weight: 1 },
];

export const QUIZ = [
  {
    q: "Mengapa kebakaran gambut sulit dipadamkan?",
    options: ["Karena gambut tidak bisa menyerap air", "Karena api dapat menjalar di bawah permukaan tanah", "Karena gambut hanya terbakar saat hujan", "Karena asapnya selalu putih"],
    answer: 1,
    explain: "Api di gambut bisa membara di bawah permukaan, tanpa nyala besar, sehingga sulit dilihat dan dipadamkan.",
  },
  {
    q: "Apa arti sebuah titik panas (hotspot) di peta satelit?",
    options: ["Kebakaran yang pasti terjadi", "Indikasi anomali suhu yang perlu diperiksa di lapangan", "Lokasi pos pemadam", "Daerah dengan kualitas udara baik"],
    answer: 1,
    explain: "Hotspot adalah indikasi dari satelit. Perlu verifikasi lapangan sebelum disebut kebakaran.",
  },
  {
    q: "Apa yang sebaiknya kamu lakukan pertama kali bila melihat api besar di lahan?",
    options: ["Mendekat dan memadamkan sendiri", "Merekam video lalu pulang", "Menjauh dan menghubungi 112 atau BPBD setempat", "Menunggu sampai api padam sendiri"],
    answer: 2,
    explain: "Utamakan keselamatan: menjauh, lalu laporkan dengan lokasi yang jelas.",
  },
  {
    q: "Gambut dinyatakan rusak bila muka air tanahnya lebih dalam dari berapa?",
    options: ["5 cm", "40 cm", "2 meter", "10 meter"],
    answer: 1,
    explain: "Menurut kriteria PP 57/2016, lebih dari 0,4 meter di bawah permukaan gambut.",
  },
  {
    q: "Apa kepanjangan dari 3R dalam restorasi gambut?",
    options: ["Rewetting, Revegetasi, Revitalisasi mata pencaharian", "Reduce, Reuse, Recycle", "Rebuild, Repair, Restart", "Rain, River, Rice"],
    answer: 0,
    explain: "Membasahi kembali, menanam kembali, dan memulihkan mata pencaharian warga.",
  },
  {
    q: "Masker apa yang lebih sesuai untuk menyaring partikel asap halus?",
    options: ["Masker kain tipis", "Masker jenis N95 atau setara", "Syal", "Tidak perlu masker"],
    answer: 1,
    explain: "Masker N95 atau setara dirancang untuk menyaring partikel halus bila dipakai dengan benar.",
  },
];
