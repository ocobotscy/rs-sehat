
import { Course, Complaint, Survey, ResearchPaper, PolicyIndicator, ResourceMetric, PublicProposal, RiskRegion, QualityMetric, SafetyIncident, AuditResult, QIProject } from '../types';

// --- EDUCATION MODULE MOCK DATA ---

export const CATEGORIES = [
  { id: 'ptm', name: 'Penyakit Tidak Menular', icon: 'HeartPulse', color: 'bg-red-100 text-red-600' },
  { id: 'gizi', name: 'Kesehatan Gizi & Nutrisi', icon: 'Apple', color: 'bg-green-100 text-green-600' },
  { id: 'p3k', name: 'Pertolongan Pertama', icon: 'Ambulance', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'mental', name: 'Kesehatan Mental', icon: 'Brain', color: 'bg-purple-100 text-purple-600' },
  { id: 'env', name: 'Kesehatan Lingkungan', icon: 'Leaf', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'kia', name: 'Ibu & Anak', icon: 'Baby', color: 'bg-pink-100 text-pink-600' },
  { id: 'menular', name: 'Penyakit Menular', icon: 'Biohazard', color: 'bg-orange-100 text-orange-600' },
  { id: 'repro', name: 'Kesehatan Reproduksi', icon: 'Activity', color: 'bg-rose-100 text-rose-600' },
  { id: 'lansia', name: 'Kesehatan Lansia', icon: 'Accessibility', color: 'bg-blue-100 text-blue-600' },
  { id: 'lifestyle', name: 'Gaya Hidup Sehat', icon: 'Sun', color: 'bg-cyan-100 text-cyan-600' },
];

export const COURSES: Course[] = [
  // --- Kategori: Penyakit Tidak Menular (PTM) ---
  {
    id: 'ptm-1',
    title: 'Pencegahan Diabetes Melitus',
    description: 'Panduan lengkap mengenali gejala, risiko, dan cara mencegah diabetes sejak dini.',
    category: 'Penyakit Tidak Menular',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    duration: '10 Menit',
    points: 50,
    content: `
      <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80" alt="Pemeriksaan Gula Darah" class="w-full h-64 object-cover rounded-xl mb-6 shadow-md" />
      <h2>Memahami Diabetes Melitus: "Si Pembunuh Senyap"</h2>
      <p>Diabetes Melitus (DM) atau sering disebut kencing manis adalah penyakit kronis yang terjadi ketika tubuh tidak dapat memproduksi cukup insulin atau tidak dapat menggunakan insulin secara efektif. Kadar gula darah yang tinggi secara terus-menerus dapat merusak pembuluh darah, jantung, ginjal, mata, dan saraf.</p>
      <h3>Gejala Klasik (4P)</h3>
      <ul>
        <li><strong>Polidipsi:</strong> Sering merasa haus berlebihan.</li>
        <li><strong>Polifagi:</strong> Sering merasa lapar meski baru makan.</li>
        <li><strong>Poliuri:</strong> Sering buang air kecil, terutama malam hari.</li>
        <li><strong>Penurunan Berat Badan:</strong> Turun drastis tanpa sebab jelas.</li>
      </ul>
    `,
    quiz: [
      { id: 'q1', question: 'Manakah yang BUKAN gejala klasik diabetes?', options: ['Sering pipis', 'Sering haus', 'Sering pingsan', 'Cepat lapar'], correctIndex: 2 }
    ]
  },
  {
    id: 'ptm-2',
    title: 'Kendalikan Hipertensi dengan PATUH',
    description: 'Strategi mengontrol tekanan darah tinggi agar tidak terjadi stroke.',
    category: 'Penyakit Tidak Menular',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80',
    duration: '5 Menit',
    points: 30,
    content: '<p>Hipertensi sering disebut "Silent Killer". Terapkan PATUH: Periksa kesehatan rutin, Atasi penyakit dengan pengobatan tepat, Tetap diet gizi seimbang, Upayakan aktivitas fisik, dan Hindari asap rokok.</p>',
    quiz: [{ id: 'q1', question: 'Apa kepanjangan huruf H dalam PATUH?', options: ['Harus olahraga', 'Hindari asap rokok', 'Hidup sehat', 'Hemat garam'], correctIndex: 1 }]
  },
  {
    id: 'ptm-3',
    title: 'Kolesterol Jahat vs Baik',
    description: 'Memahami LDL dan HDL serta makanan penurunkolesterol.',
    category: 'Penyakit Tidak Menular',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80',
    duration: '8 Menit',
    points: 40,
    content: `
      <h2>Apa Bedanya LDL dan HDL?</h2>
      <p>Kolesterol tidak selamanya buruk. Tubuh membutuhkannya untuk membangun sel. Namun, ada dua jenis utama:</p>
      <ul>
        <li><strong>LDL (Low-Density Lipoprotein):</strong> Sering disebut "kolesterol jahat". Jika terlalu banyak, ia menumpuk di dinding arteri (plak) dan menyebabkan penyumbatan jantung.</li>
        <li><strong>HDL (High-Density Lipoprotein):</strong> "Kolesterol baik" yang bertugas mengangkut kelebihan kolesterol kembali ke hati untuk dibuang.</li>
      </ul>
      <h3>Makanan Penurun LDL</h3>
      <p>Konsumsi Oatmeal, Kacang-kacangan (Almond, Kenari), Alpukat, Ikan berlemak (Salmon, Tuna), dan Minyak Zaitun.</p>
    `,
    quiz: [{ id: 'q1', question: 'Makanan apa yang baik untuk menurunkan kolesterol jahat?', options: ['Gorengan', 'Oatmeal & Alpukat', 'Daging Merah', 'Mentega'], correctIndex: 1 }]
  },

  // --- Kategori: Gizi & Nutrisi ---
  {
    id: 'gizi-1',
    title: 'Isi Piringku: Panduan Sekali Makan',
    description: 'Porsi makan ideal untuk mencegah obesitas dan stunting.',
    category: 'Kesehatan Gizi & Nutrisi',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    duration: '15 Menit',
    points: 45,
    content: `
      <h2>Konsep Isi Piringku</h2>
      <p>Dalam satu piring makan, bagilah menjadi:</p>
      <ul>
        <li><strong>50% Buah dan Sayur:</strong> Sumber serat dan vitamin.</li>
        <li><strong>50% Karbohidrat dan Protein:</strong> Nasi, kentang, ikan, ayam, tempe.</li>
      </ul>
      <p>Jangan lupa batasi Gula (4 sdm), Garam (1 sdt), dan Lemak (5 sdm) per hari.</p>
    `,
    quiz: [{ id: 'q1', question: 'Berapa porsi sayur dan buah dalam piring?', options: ['Setengah piring (50%)', 'Sepertiga piring', 'Sepiring penuh', 'Hanya hiasan'], correctIndex: 0 }]
  },
  {
    id: 'gizi-2',
    title: 'Mencegah Anemia pada Remaja Putri',
    description: 'Pentingnya Tablet Tambah Darah (TTD) untuk masa depan.',
    category: 'Kesehatan Gizi & Nutrisi',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1607513549929-2c672b1029c7?w=800&q=80',
    duration: '8 Menit',
    points: 40,
    content: '<p>Remaja putri rentan anemia karena menstruasi. Konsumsi TTD seminggu sekali dapat mencegah 5L (Lemah, Letih, Lesu, Lelah, Lalai) dan mempersiapkan kehamilan sehat di masa depan.</p>',
    quiz: []
  },
  {
    id: 'gizi-3',
    title: 'Diet DASH untuk Hipertensi',
    description: 'Pola makan yang terbukti menurunkan tekanan darah tinggi.',
    category: 'Kesehatan Gizi & Nutrisi',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1615485500704-8e99099928b3?w=800&q=80',
    duration: '10 Menit',
    points: 50,
    content: `
      <h2>Apa itu Diet DASH?</h2>
      <p>DASH (Dietary Approaches to Stop Hypertension) adalah pola makan yang rendah garam (natrium) dan tinggi kalium, magnesium, serta kalsium.</p>
      <h3>Prinsip Utama:</h3>
      <ol>
        <li>Batasi garam maksimal 1 sendok teh per hari.</li>
        <li>Perbanyak sayur dan buah (4-5 porsi sehari).</li>
        <li>Pilih produk susu rendah lemak.</li>
        <li>Kurangi daging merah, ganti dengan ikan atau unggas tanpa kulit.</li>
      </ol>
    `,
    quiz: []
  },

  // --- Kategori: Pertolongan Pertama (P3K) ---
  {
    id: 'p3k-1',
    title: 'Bantuan Hidup Dasar (CPR)',
    description: 'Langkah darurat menangani orang henti jantung mendadak.',
    category: 'Pertolongan Pertama',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1599700403969-f73b37ce6162?w=800&q=80',
    duration: '12 Menit',
    points: 100,
    content: '<p>Ingat rumus DRSCAB: Danger (Aman Diri), Response (Cek Respon), Shout (Panggil Bantuan), Circulation (Kompresi Dada), Airway (Jalan Napas), Breathing (Napas Bantuan).</p>',
    quiz: [{ id: 'q1', question: 'Apa langkah pertama saat melihat korban tidak sadar?', options: ['Langsung angkat', 'Cek keamanan lingkungan (Danger)', 'Kasih minum', 'Telepon polisi'], correctIndex: 1 }]
  },
  {
    id: 'p3k-2',
    title: 'Penanganan Luka Bakar Ringan',
    description: 'Jangan pakai odol! Ini cara medis yang benar.',
    category: 'Pertolongan Pertama',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1630650231815-a567e2a26ecc?w=800&q=80',
    duration: '5 Menit',
    points: 30,
    content: '<p>Siram area luka bakar dengan air mengalir (suhu ruang) selama 10-20 menit. Jangan gunakan es batu, pasta gigi, atau mentega karena dapat memperparah kerusakan jaringan.</p>',
    quiz: [{ id: 'q1', question: 'Apa yang harus dilakukan pada luka bakar?', options: ['Olesi odol', 'Siram air mengalir', 'Kompres es batu', 'Pecahkan lepuhan'], correctIndex: 1 }]
  },
  {
    id: 'p3k-3',
    title: 'Manuver Heimlich (Tersedak)',
    description: 'Cara menyelamatkan orang yang tersedak makanan.',
    category: 'Pertolongan Pertama',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1552084117-5633c4c1240c?w=800&q=80',
    duration: '6 Menit',
    points: 40,
    content: `
      <h2>Tanda Orang Tersedak</h2>
      <p>Memegang leher, tidak bisa bicara/batuk, wajah membiru.</p>
      <h3>Langkah Manuver Heimlich:</h3>
      <ol>
        <li>Berdiri di belakang korban.</li>
        <li>Lingkarkan tangan di pinggang korban.</li>
        <li>Kepalkan satu tangan di atas pusar, genggam dengan tangan lain.</li>
        <li>Hentakkan ke arah dalam dan atas dengan kuat dan cepat.</li>
        <li>Ulangi hingga benda asing keluar.</li>
      </ol>
    `,
    quiz: [{ id: 'q1', question: 'Dimana posisi kepalan tangan saat melakukan Heimlich?', options: ['Di leher', 'Di punggung', 'Di atas pusar (ulu hati)', 'Di dada kiri'], correctIndex: 2 }]
  },

  // --- Kategori: Kesehatan Mental ---
  {
    id: 'mental-1',
    title: 'Manajemen Stres di Tempat Kerja',
    description: 'Teknik relaksasi sederhana saat pekerjaan menumpuk.',
    category: 'Kesehatan Mental',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&q=80',
    duration: '7 Menit',
    points: 40,
    content: '<p>Gunakan teknik pernapasan 4-7-8: Tarik napas 4 detik, tahan 7 detik, hembuskan perlahan 8 detik. Lakukan ini saat merasa kewalahan untuk menurunkan detak jantung dan kortisol.</p>',
    quiz: []
  },
  {
    id: 'mental-2',
    title: 'Mengenal Burnout vs Depresi',
    description: 'Pahami perbedaannya agar penanganan lebih tepat.',
    category: 'Kesehatan Mental',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&q=80',
    duration: '10 Menit',
    points: 50,
    content: '<p>Burnout spesifik pada konteks pekerjaan, sedangkan depresi bersifat umum dan memengaruhi seluruh aspek kehidupan. Tonton video untuk penjelasan ahli.</p>',
    quiz: []
  },
  {
    id: 'mental-3',
    title: 'Digital Detox: Puasa Gadget',
    description: 'Mengatasi kecanduan media sosial demi kesehatan jiwa.',
    category: 'Kesehatan Mental',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
    duration: '10 Menit',
    points: 45,
    content: `
      <h2>Mengapa Perlu Detoks Digital?</h2>
      <p>Paparan terus-menerus terhadap media sosial dapat memicu kecemasan (FOMO), gangguan tidur, dan penurunan produktivitas akibat lonjakan dopamin instan.</p>
      <h3>Cara Melakukan:</h3>
      <ul>
        <li>Tetapkan zona bebas HP (misal: meja makan, kamar tidur).</li>
        <li>Matikan notifikasi non-esensial.</li>
        <li>Ganti scrolling dengan membaca buku atau olahraga.</li>
      </ul>
    `,
    quiz: []
  },

  // --- Kategori: Kesehatan Lingkungan ---
  {
    id: 'env-1',
    title: '3M Plus: Cegah Demam Berdarah',
    description: 'Langkah efektif membasmi jentik nyamuk Aedes aegypti.',
    category: 'Kesehatan Lingkungan',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1584650548402-145464bc6dbf?w=800&q=80',
    duration: '5 Menit',
    points: 25,
    content: '<p>Menguras tempat penampungan air, Menutup rapat penampungan air, Mendaur ulang barang bekas. Plus: Memelihara ikan pemakan jentik, memakai lotion anti nyamuk, dan tidur pakai kelambu.</p>',
    quiz: []
  },
  {
    id: 'env-2',
    title: 'Bahaya Sampah Plastik Mikro',
    description: 'Bagaimana mikroplastik masuk ke tubuh kita dan dampaknya.',
    category: 'Kesehatan Lingkungan',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80',
    duration: '8 Menit',
    points: 35,
    content: '<p>Mikroplastik kini ditemukan dalam air minum dan ikan laut. Mengurangi penggunaan plastik sekali pakai adalah langkah awal melindungi kesehatan jangka panjang.</p>',
    quiz: []
  },
  {
    id: 'env-3',
    title: 'Memilah Sampah dari Rumah',
    description: 'Panduan memisahkan sampah Organik, Anorganik, dan B3.',
    category: 'Kesehatan Lingkungan',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    duration: '6 Menit',
    points: 30,
    content: `
      <h2>Jenis Sampah Rumah Tangga</h2>
      <ul>
        <li><strong>Organik (Hijau):</strong> Sisa makanan, kulit buah, daun. Bisa dijadikan kompos.</li>
        <li><strong>Anorganik (Kuning):</strong> Plastik, kertas, kaleng, kaca. Bersihkan lalu setor ke Bank Sampah.</li>
        <li><strong>B3 (Merah):</strong> Baterai bekas, lampu neon, kemasan obat, racun serangga. Jangan dicampur! Berbahaya.</li>
      </ul>
    `,
    quiz: [{ id: 'q1', question: 'Baterai bekas termasuk jenis sampah apa?', options: ['Organik', 'Anorganik', 'B3 (Bahan Berbahaya Beracun)', 'Residu'], correctIndex: 2 }]
  },

  // --- Kategori: Ibu & Anak (KIA) ---
  {
    id: 'kia-1',
    title: 'Keajaiban ASI Eksklusif',
    description: 'Mengapa 6 bulan pertama sangat krusial bagi bayi?',
    category: 'Ibu & Anak',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    duration: '15 Menit',
    points: 60,
    content: '<p>ASI mengandung antibodi yang tidak dimiliki susu formula. ASI meningkatkan kecerdasan (IQ) dan melindungi bayi dari infeksi saluran pencernaan dan pernapasan.</p>',
    quiz: [{ id: 'q1', question: 'Berapa lama ASI Eksklusif diberikan?', options: ['1 Tahun', '2 Tahun', '6 Bulan', '3 Bulan'], correctIndex: 2 }]
  },
  {
    id: 'kia-2',
    title: 'Tanda Bahaya Kehamilan',
    description: 'Segera ke bidan/dokter jika mengalami gejala ini.',
    category: 'Ibu & Anak',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1537673156864-5d2c72de7824?w=800&q=80',
    duration: '6 Menit',
    points: 40,
    content: '<p>Waspadai: Demam tinggi, bengkak kaki/tangan/wajah, pendarahan, gerakan janin berkurang, dan ketuban pecah dini.</p>',
    quiz: []
  },
  {
    id: 'kia-3',
    title: 'Strategi MPASI Pertama',
    description: 'Menu Pendamping ASI yang tepat mulai usia 6 bulan.',
    category: 'Ibu & Anak',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1565120130296-304e288339c6?w=800&q=80',
    duration: '12 Menit',
    points: 50,
    content: `
      <h2>Prinsip Dasar MPASI</h2>
      <p>Dimulai saat bayi genap 6 bulan. ASI tetap dilanjutkan.</p>
      <h3>Menu 4 Bintang:</h3>
      <ul>
        <li>Karbohidrat (Nasi, kentang)</li>
        <li>Protein Hewani (Ayam, ikan, telur, hati sapi) - Prioritas!</li>
        <li>Protein Nabati (Tahu, tempe, kacang-kacangan)</li>
        <li>Sayur/Buah (Sedikit saja untuk perkenalan)</li>
      </ul>
      <p>Tekstur harus lumat (saring) dan ditingkatkan bertahap.</p>
    `,
    quiz: []
  },

  // --- Kategori: Penyakit Menular ---
  {
    id: 'menular-1',
    title: 'TOSS TBC (Temukan Obati Sampai Sembuh)',
    description: 'TBC bisa disembuhkan asal minum obat teratur.',
    category: 'Penyakit Menular',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1584362917165-52e812104ddf?w=800&q=80',
    duration: '10 Menit',
    points: 50,
    content: '<p>Gejala TBC: Batuk berdahak >2 minggu, keringat malam tanpa aktivitas, berat badan turun. Pengobatan TBC berlangsung minimal 6 bulan tanpa putus.</p>',
    quiz: []
  },
  {
    id: 'menular-2',
    title: 'Waspada Siklus Pelana Kuda DBD',
    description: 'Fase kritis Demam Berdarah yang sering mengecoh.',
    category: 'Penyakit Menular',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80',
    duration: '7 Menit',
    points: 35,
    content: `
      <h2>Apa itu Fase Pelana Kuda?</h2>
      <p>Perjalanan penyakit DBD dibagi 3 fase:</p>
      <ol>
        <li><strong>Fase Demam (Hari 1-3):</strong> Demam tinggi mendadak.</li>
        <li><strong>Fase Kritis (Hari 4-5):</strong> Demam turun seolah sembuh, padahal ini fase paling berbahaya dimana risiko syok terjadi. Cairan tubuh harus dijaga ketat.</li>
        <li><strong>Fase Penyembuhan (Hari 6-7):</strong> Demam mungkin naik sedikit, nafsu makan kembali.</li>
      </ol>
    `,
    quiz: [{ id: 'q1', question: 'Pada hari keberapa fase kritis DBD biasanya terjadi?', options: ['Hari ke 1-2', 'Hari ke 4-5', 'Hari ke 7-8', 'Hari pertama'], correctIndex: 1 }]
  },

  // --- Kategori: Kesehatan Reproduksi ---
  {
    id: 'repro-1',
    title: 'Menjaga Kebersihan Organ Reproduksi',
    description: 'Tips sederhana mencegah infeksi dan jamur.',
    category: 'Kesehatan Reproduksi',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-217358c7db81?w=800&q=80',
    duration: '5 Menit',
    points: 25,
    content: '<p>Ganti pakaian dalam minimal 2x sehari, gunakan bahan katun yang menyerap keringat, dan hindari penggunaan sabun pembersih kewanitaan yang berlebihan (mengganggu pH alami).</p>',
    quiz: []
  },
  {
    id: 'repro-2',
    title: 'Deteksi Dini Kanker Serviks',
    description: 'Pentingnya pemeriksaan IVA dan Pap Smear.',
    category: 'Kesehatan Reproduksi',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
    duration: '8 Menit',
    points: 50,
    content: `
      <h2>Apa itu Kanker Serviks?</h2>
      <p>Kanker leher rahim yang disebabkan oleh virus HPV. Ini adalah salah satu kanker pembunuh wanita terbanyak di Indonesia.</p>
      <h3>Metode Skrining:</h3>
      <ul>
        <li><strong>Tes IVA (Inspeksi Visual Asam Asetat):</strong> Mudah, murah, bisa di Puskesmas. Hasil langsung tahu.</li>
        <li><strong>Pap Smear:</strong> Pengambilan sampel sel serviks untuk diperiksa di lab.</li>
      </ul>
      <p>Wanita yang sudah menikah wajib periksa rutin minimal 1 tahun sekali.</p>
    `,
    quiz: []
  },

  // --- Kategori: Kesehatan Lansia ---
  {
    id: 'lansia-1',
    title: 'Senam Lansia Anti-Stroke',
    description: 'Gerakan ringan untuk menjaga kelenturan pembuluh darah.',
    category: 'Kesehatan Lansia',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    duration: '20 Menit',
    points: 60,
    content: '<p>Lakukan gerakan ini setiap pagi selama 15 menit. Fokus pada pernapasan dan peregangan otot leher, tangan, dan kaki secara perlahan.</p>',
    quiz: []
  },
  {
    id: 'lansia-2',
    title: 'Mencegah Pikun (Demensia)',
    description: 'Aktivitas asah otak untuk lansia.',
    category: 'Kesehatan Lansia',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
    duration: '8 Menit',
    points: 40,
    content: '<p>Membaca, mengisi teka-teki silang, dan bersosialisasi dapat menjaga otak tetap aktif. Nutrisi seperti Omega-3 juga penting untuk kesehatan saraf otak.</p>',
    quiz: []
  },
  {
    id: 'lansia-3',
    title: 'Tulang Kuat di Usia Senja',
    description: 'Mencegah Osteoporosis dengan kalsium dan aktivitas fisik.',
    category: 'Kesehatan Lansia',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    duration: '8 Menit',
    points: 40,
    content: `
      <h2>Bahaya Patah Tulang pada Lansia</h2>
      <p>Osteoporosis membuat tulang rapuh. Jatuh sedikit saja bisa berakibat fatal.</p>
      <h3>Tips Tulang Sehat:</h3>
      <ul>
        <li><strong>Jemur Pagi:</strong> Dapatkan Vitamin D gratis dari matahari jam 9 pagi (10-15 menit).</li>
        <li><strong>Kalsium:</strong> Susu lansia, ikan teri, brokoli.</li>
        <li><strong>Latihan Beban Ringan:</strong> Jalan kaki atau angkat botol air mineral untuk memadatkan tulang.</li>
        <li><strong>Lingkungan Aman:</strong> Pasang pegangan di kamar mandi, hindari lantai licin.</li>
      </ul>
    `,
    quiz: []
  },

  // --- Kategori: Gaya Hidup Sehat ---
  {
    id: 'lifestyle-1',
    title: 'Bahaya Rokok & Vape',
    description: 'Apa yang sebenarnya terjadi pada paru-paru Anda?',
    category: 'Gaya Hidup Sehat',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1527776435427-46487e584a48?w=800&q=80',
    duration: '12 Menit',
    points: 50,
    content: '<p>Rokok mengandung 4000 zat kimia berbahaya. Vape meski dianggap lebih aman, tetap mengandung nikotin dan zat karsinogenik yang merusak alveolus paru.</p>',
    quiz: []
  },
  {
    id: 'lifestyle-2',
    title: 'Pentingnya Tidur 7-8 Jam',
    description: 'Tidur berkualitas meningkatkan imun tubuh.',
    category: 'Gaya Hidup Sehat',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1541781777629-160534da9185?w=800&q=80',
    duration: '6 Menit',
    points: 30,
    content: '<p>Kurang tidur kronis meningkatkan risiko obesitas, diabetes, dan penyakit jantung. Hindari gadget 1 jam sebelum tidur untuk meningkatkan produksi melatonin.</p>',
    quiz: []
  },
  {
    id: 'lifestyle-3',
    title: 'Mengungkap Gula Tersembunyi',
    description: 'Cara membaca label nutrisi agar tidak tertipu.',
    category: 'Gaya Hidup Sehat',
    type: 'infographic',
    thumbnail: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80',
    duration: '7 Menit',
    points: 35,
    content: `
      <h2>Gula Punya Banyak Nama!</h2>
      <p>Saat membeli makanan kemasan, jangan hanya cari kata "Gula". Hindari jika ada di urutan awal komposisi:</p>
      <ul>
        <li>Sirup Jagung (High Fructose Corn Syrup)</li>
        <li>Dektrosa, Maltosa, Sukrosa</li>
        <li>Konsentrat Buah</li>
      </ul>
      <p>Batas aman gula harian orang dewasa hanya 50 gram (4 sendok makan). Satu kaleng soda bisa mengandung 35 gram gula!</p>
    `,
    quiz: [{ id: 'q1', question: 'Berapa batas konsumsi gula harian yang disarankan?', options: ['10 Sendok Makan', '4 Sendok Makan (50gr)', 'Bebas', '1 Sendok Teh'], correctIndex: 1 }]
  }
];

export const COMPLAINTS: Complaint[] = [
  { id: 'C001', service: 'Puskesmas Kec. Melati', description: 'Antrian obat terlalu lama, menunggu 2 jam.', status: 'Pending', date: '2025-02-25', rating: 2 },
  { id: 'C002', service: 'Posyandu Mawar', description: 'Pelayanan ramah namun fasilitas timbangan rusak.', status: 'Resolved', date: '2025-02-24', rating: 4 },
  { id: 'C003', service: 'RSUD Kota', description: 'Dokter spesialis datang terlambat 1 jam.', status: 'Investigating', date: '2025-02-23', rating: 3 },
];

export const SURVEY_LIST: Survey[] = [
  {
    id: 'S001',
    title: 'Pemetaan Pola Makan Masyarakat Urban',
    description: 'Bantu kami memahami kebiasaan konsumsi gula, garam, dan lemak harian Anda untuk pencegahan PTM.',
    category: 'Gizi & Nutrisi',
    estimatedTime: '5-7 Menit',
    points: 150,
    participants: 1240,
    deadline: '2025-03-31',
    status: 'active',
    progress: 0
  },
  {
    id: 'S002',
    title: 'Efektivitas Program Vaksinasi Booster',
    description: 'Survei singkat mengenai kejadian ikutan pasca imunisasi (KIPI) dan status kesehatan umum.',
    category: 'Imunisasi',
    estimatedTime: '3 Menit',
    points: 100,
    participants: 850,
    deadline: '2025-04-15',
    status: 'active',
    progress: 30
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'P001',
    title: 'Hubungan Konsumsi Gula Cair dengan Risiko Diabetes Tipe 2 pada Remaja',
    author: 'Dr. Siti Aminah, Sp.GK, et al.',
    date: '10 Feb 2025',
    summary: 'Penelitian ini menemukan bahwa konsumsi minuman boba/kopi kekinian >3x seminggu meningkatkan risiko pre-diabetes sebesar 40% pada remaja usia 15-19 tahun.',
    content: '<h2>Full Content Here...</h2>',
    category: 'Penyakit Tidak Menular',
    readCount: 1205,
    tags: ['Diabetes', 'Remaja', 'Gula']
  },
  {
    id: 'P002',
    title: 'Efektivitas Program Telemedicine di Daerah Terpencil',
    author: 'Prof. Budi Santoso, M.Kes',
    date: '25 Jan 2025',
    summary: 'Analisis implementasi layanan konsultasi dokter online di wilayah kepulauan menunjukkan peningkatan akses layanan sebesar 65%.',
    content: '<p>Telemedicine menjadi solusi...</p>',
    category: 'Teknologi Kesehatan',
    readCount: 890,
    tags: ['Telemedicine', 'Akses Kesehatan']
  },
  {
    id: 'P003',
    title: 'Dampak Polusi Udara Terhadap ISPA pada Balita',
    author: 'Dr. Rina Wati, Sp.A',
    date: '15 Feb 2025',
    summary: 'Studi kohort di wilayah industri menunjukkan korelasi kuat antara kadar PM2.5 dengan frekuensi ISPA pada anak usia 0-5 tahun.',
    content: '<p>Kualitas udara yang buruk...</p>',
    category: 'Kesehatan Lingkungan',
    readCount: 1500,
    tags: ['ISPA', 'Polusi', 'Anak']
  }
];

export const DISEASE_TREND_DATA = [
  { name: 'Jan', ISPA: 400, Diabetes: 240, Hipertensi: 240, Diare: 150 },
  { name: 'Feb', ISPA: 300, Diabetes: 139, Hipertensi: 221, Diare: 180 },
  { name: 'Mar', ISPA: 200, Diabetes: 380, Hipertensi: 229, Diare: 120 },
  { name: 'Apr', ISPA: 278, Diabetes: 390, Hipertensi: 200, Diare: 200 },
  { name: 'May', ISPA: 189, Diabetes: 480, Hipertensi: 218, Diare: 250 },
  { name: 'Jun', ISPA: 239, Diabetes: 380, Hipertensi: 250, Diare: 190 },
  { name: 'Jul', ISPA: 349, Diabetes: 430, Hipertensi: 210, Diare: 160 },
  { name: 'Aug', ISPA: 400, Diabetes: 450, Hipertensi: 230, Diare: 140 },
];

export const IMMUNIZATION_DATA = [
  { name: 'Lengkap', value: 650, color: '#10b981' },
  { name: 'Parsial', value: 250, color: '#f59e0b' },
  { name: 'Belum', value: 100, color: '#ef4444' },
];

export const DEMOGRAPHIC_DATA = [
  { age: '17-25', participants: 400 },
  { age: '26-35', participants: 850 },
  { age: '36-45', participants: 600 },
  { age: '46-55', participants: 300 },
  { age: '>55', participants: 150 },
];

// --- POLICY MODULE MOCK DATA ---

export const POLICY_INDICATORS: PolicyIndicator[] = [
  { id: 'I001', name: 'Angka Stunting Balita', value: 18.5, target: 14.0, unit: '%', trend: 'down', category: 'Prioritas' },
  { id: 'I002', name: 'Imunisasi Dasar Lengkap', value: 82.0, target: 95.0, unit: '%', trend: 'up', category: 'Prioritas' },
  { id: 'I003', name: 'Prevalensi Hipertensi', value: 34.1, target: 30.0, unit: '%', trend: 'up', category: 'Penyakit' },
  { id: 'I004', name: 'Akses Air Bersih', value: 78.5, target: 90.0, unit: '%', trend: 'stable', category: 'Lingkungan' },
];

export const RESOURCE_DATA: ResourceMetric[] = [
  { facility: 'Puskesmas Kec. Melati', bedOccupancyRate: 85, staffRatio: 1200, medicineAvailability: 92, dailyVisits: 150 },
  { facility: 'Puskesmas Kec. Mawar', bedOccupancyRate: 60, staffRatio: 900, medicineAvailability: 88, dailyVisits: 80 },
  { facility: 'RSUD Kota (IGD)', bedOccupancyRate: 95, staffRatio: 400, medicineAvailability: 98, dailyVisits: 300 },
  { facility: 'Klinik Pratama Sehat', bedOccupancyRate: 40, staffRatio: 600, medicineAvailability: 100, dailyVisits: 45 },
];

export const PUBLIC_PROPOSALS: PublicProposal[] = [
  { id: 'PR01', title: 'Penambahan Jadwal Posyandu Lansia', description: 'Mohon jadwal posyandu lansia di RW 05 ditambah menjadi 2x sebulan karena antusiasme tinggi.', author: 'Bpk. Sutarjo', votes: 125, status: 'Ditinjau', category: 'Lansia' },
  { id: 'PR02', title: 'Perbaikan Sanitasi Pasar Tradisional', description: 'Saluran air di pasar becek dan bau, berpotensi menjadi sarang nyamuk DBD.', author: 'Ibu Ani', votes: 89, status: 'Diterima', category: 'Lingkungan' },
  { id: 'PR03', title: 'Fogging Rutin di Sekolah Dasar', description: 'Banyak anak sekolah terkena DBD bulan lalu.', author: 'Komite Sekolah', votes: 210, status: 'Diterima', category: 'Penyakit Menular' },
  { id: 'PR04', title: 'Poli Sore di Puskesmas', description: 'Agar pekerja yang pulang sore tetap bisa berobat.', author: 'Rans Alfred', votes: 56, status: 'Ditolak', category: 'Pelayanan' },
];

export const RISK_MAP_DATA: RiskRegion[] = [
  { id: 'R01', name: 'Kel. Melati Indah', riskLevel: 'High', cases: 145, population: 5000, trend: 'increasing' },
  { id: 'R02', name: 'Kel. Mawar Sari', riskLevel: 'Medium', cases: 89, population: 4500, trend: 'stable' },
  { id: 'R03', name: 'Kel. Anggrek Permai', riskLevel: 'Low', cases: 23, population: 3000, trend: 'decreasing' },
  { id: 'R04', name: 'Kel. Kamboja Putih', riskLevel: 'High', cases: 112, population: 5200, trend: 'increasing' },
  { id: 'R05', name: 'Kel. Dahlia Ungu', riskLevel: 'Medium', cases: 67, population: 4100, trend: 'decreasing' },
  { id: 'R06', name: 'Kel. Kenanga', riskLevel: 'Low', cases: 15, population: 2500, trend: 'stable' },
];

// --- QUALITY MODULE MOCK DATA ---

export const QUALITY_INDICATORS_FULL: QualityMetric[] = [
  { 
    id: 'Q01', name: 'Waktu Tunggu Rawat Jalan', value: 45, target: 60, unit: 'menit', trend: 'down', status: 'optimal',
    history: [{period: 'Jan', value: 55}, {period: 'Feb', value: 48}, {period: 'Mar', value: 45}]
  },
  { 
    id: 'Q02', name: 'Kepuasan Pasien (NPS)', value: 78, target: 80, unit: 'skor', trend: 'up', status: 'warning',
    history: [{period: 'Jan', value: 72}, {period: 'Feb', value: 75}, {period: 'Mar', value: 78}]
  },
  { 
    id: 'Q03', name: 'Respon Time Gawat Darurat', value: 4.5, target: 5, unit: 'menit', trend: 'stable', status: 'optimal',
    history: [{period: 'Jan', value: 4.8}, {period: 'Feb', value: 4.5}, {period: 'Mar', value: 4.5}]
  },
  { 
    id: 'Q04', name: 'Angka Kejadian Infeksi (HAIs)', value: 1.2, target: 1.5, unit: '%', trend: 'down', status: 'optimal',
    history: [{period: 'Jan', value: 1.8}, {period: 'Feb', value: 1.5}, {period: 'Mar', value: 1.2}]
  },
];

export const SAFETY_INCIDENTS: SafetyIncident[] = [
  { id: 'INC01', date: '2025-03-01', type: 'KNC', description: 'Kesalahan penulisan resep obat (terdeteksi apoteker).', location: 'Poli Umum', status: 'Closed' },
  { id: 'INC02', date: '2025-02-28', type: 'KTD', description: 'Pasien terpeleset di lantai basah toilet.', location: 'R. Tunggu', status: 'Investigating' },
  { id: 'INC03', date: '2025-02-15', type: 'KTC', description: 'Sampel darah tertukar label namun belum diuji.', location: 'Laboratorium', status: 'Closed' },
];

export const AUDIT_RESULTS: AuditResult[] = [
  { id: 'AUD01', category: 'Kepatuhan Cuci Tangan', score: 88, target: 90, findings: ['Petugas lupa cuci tangan after-touch pasien.'], date: '2025-03-01' },
  { id: 'AUD02', category: 'Kelengkapan Rekam Medis', score: 95, target: 100, findings: ['TTD dokter lengkap.'], date: '2025-02-28' },
  { id: 'AUD03', category: 'Kepatuhan SOP Triase', score: 100, target: 100, findings: ['Sempurna.'], date: '2025-02-25' },
  { id: 'AUD04', category: 'Identifikasi Pasien', score: 92, target: 100, findings: ['Gelang pasien terpasang benar.'], date: '2025-02-20' },
  { id: 'AUD05', category: 'Pengelolaan Limbah Medis', score: 85, target: 100, findings: ['Limbah jarum di tempat biasa.'], date: '2025-02-15' },
];

export const QI_PROJECTS: QIProject[] = [
  { id: 'PJ01', title: 'Reduksi Waktu Tunggu Farmasi', lead: 'Apt. Budi', status: 'In Progress', progress: 65, impact: 'Waktu tunggu turun 15%.' },
  { id: 'PJ02', title: 'Digitalisasi Rekam Medis', lead: 'Dr. Rina', status: 'Planning', progress: 20, impact: 'Efisiensi admin.' },
  { id: 'PJ03', title: 'Peningkatan Kepatuhan Hand Hygiene', lead: 'Ns. Siti', status: 'Completed', progress: 100, impact: 'Infeksi nosokomial turun 5%.' },
];
