
import { Course, Complaint, Survey, ResearchPaper, PolicyIndicator, ResourceMetric, PublicProposal, RiskRegion, QualityMetric, SafetyIncident, AuditResult, QIProject } from '../types';

// ... (Existing CATEGORIES, COURSES, COMPLAINTS, SURVEY_LIST, RESEARCH_PAPERS - Keeping them as is)
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
  // ... (Assuming full course list from previous steps is here)
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
      <p>Diabetes Melitus (DM) atau sering disebut kencing manis adalah penyakit kronis...</p>
    `,
    quiz: [
      { id: 'q1', question: 'Manakah yang BUKAN gejala klasik diabetes?', options: ['Sering pipis', 'Sering haus', 'Sering pingsan', 'Cepat lapar'], correctIndex: 2 }
    ]
  },
  {
      id: 'gizi-1',
      title: 'Gizi Seimbang Balita',
      description: 'Cegah stunting dengan isi piringku.',
      category: 'Kesehatan Gizi & Nutrisi',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1607513549929-2c672b1029c7?w=800&q=80',
      duration: '15 Menit',
      points: 45,
      content: '<p>Konten Gizi...</p>',
      quiz: []
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
