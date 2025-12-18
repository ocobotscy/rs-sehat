
import { Course, Complaint, Survey, ResearchPaper, PolicyIndicator, ResourceMetric, PublicProposal, RiskRegion, QualityMetric, SafetyIncident, AuditResult, QIProject } from '../types';

// --- EDUCATION MODULE MOCK DATA ---

export const CATEGORIES = [
  { id: 'simrs', name: 'Sistem Manajemen RS (SIMRS)', icon: 'LayoutGrid', color: 'bg-indigo-100 text-indigo-600' },
  { id: 'ptm', name: 'Penyakit Tidak Menular', icon: 'HeartPulse', color: 'bg-red-100 text-red-600' },
  { id: 'gizi', name: 'Kesehatan Gizi & Nutrisi', icon: 'Apple', color: 'bg-green-100 text-green-600' },
  { id: 'p3k', name: 'Pertolongan Pertama', icon: 'Ambulance', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'mental', name: 'Kesehatan Mental', icon: 'Brain', color: 'bg-purple-100 text-purple-600' },
  { id: 'env', name: 'Kesehatan Lingkungan', icon: 'Leaf', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'kia', name: 'Ibu & Anak', icon: 'Baby', color: 'bg-pink-100 text-pink-600' },
  { id: 'menular', name: 'Penyakit Menular', icon: 'Biohazard', color: 'bg-orange-100 text-orange-600' },
  { id: 'lansia', name: 'Kesehatan Lansia', icon: 'Accessibility', color: 'bg-blue-100 text-blue-600' },
  { id: 'lifestyle', name: 'Gaya Hidup Sehat', icon: 'Sun', color: 'bg-cyan-100 text-cyan-600' },
];

export const COURSES: Course[] = [
  {
    id: 'simrs-1',
    title: 'Panduan Alur Kerja Rumah Sakit Modern',
    description: 'Pahami langkah demi langkah proses pelayanan kesehatan dari Pendaftaran hingga Farmasi.',
    category: 'Sistem Manajemen RS (SIMRS)',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    duration: '15 Menit',
    points: 100,
    content: `
      <h2>Memahami Ekosistem Digital SIMRS</h2>
      <p>Sistem Informasi Manajemen Rumah Sakit (SIMRS) adalah sebuah sistem teknologi informasi komunikasi yang memproses dan mengintegrasikan seluruh alur pelayanan Rumah Sakit dalam bentuk jaringan koordinasi, pelaporan dan prosedur administrasi.</p>
      <h3>Mengapa Pasien Perlu Tahu?</h3>
      <p>Dengan memahami alur kerja ini, pasien dapat mempersiapkan dokumen yang diperlukan (KTP, BPJS, Rujukan) dan memahami waktu tunggu yang dibutuhkan di setiap departemen.</p>
    `,
    quiz: [
      { id: 'q1', question: 'Tahap manakah yang menentukan prioritas penanganan medis?', options: ['Pendaftaran', 'Kasir', 'Triase', 'Apotek'], correctIndex: 2 }
    ]
  },
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
      <p>Diabetes Melitus (DM) atau sering disebut kencing manis adalah penyakit kronis yang terjadi ketika tubuh tidak dapat memproduksi cukup insulin atau tidak dapat menggunakan insulin secara efektif.</p>
    `,
    quiz: [
      { id: 'q1', question: 'Manakah yang BUKAN gejala klasik diabetes?', options: ['Sering pipis', 'Sering haus', 'Sering pingsan', 'Cepat lapar'], correctIndex: 2 }
    ]
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
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'P001',
    title: 'Hubungan Konsumsi Gula Cair dengan Risiko Diabetes Tipe 2 pada Remaja',
    author: 'Dr. Siti Aminah, Sp.GK, et al.',
    date: '10 Feb 2025',
    summary: 'Penelitian ini menemukan bahwa konsumsi minuman boba/kopi kekinian >3x seminggu meningkatkan risiko pre-diabetes sebesar 40% pada remaja usia 15-19 tahun.',
    category: 'Penyakit Tidak Menular',
    readCount: 1205,
    tags: ['Diabetes', 'Remaja', 'Gula']
  }
];

export const DISEASE_TREND_DATA = [
  { name: 'Jan', ISPA: 400, Diabetes: 240, Hipertensi: 240, Diare: 150 },
  { name: 'Feb', ISPA: 300, Diabetes: 139, Hipertensi: 221, Diare: 180 },
  { name: 'Mar', ISPA: 200, Diabetes: 380, Hipertensi: 229, Diare: 120 },
  { name: 'Apr', ISPA: 278, Diabetes: 390, Hipertensi: 200, Diare: 200 }
];

export const IMMUNIZATION_DATA = [
  { name: 'Lengkap', value: 650, color: '#10b981' },
  { name: 'Parsial', value: 250, color: '#f59e0b' },
  { name: 'Belum', value: 100, color: '#ef4444' },
];

export const NATIONAL_MORTALITY_DATA = [
  { cause: 'Penyakit Jantung', count: 45000 },
  { cause: 'Stroke', count: 32000 },
  { cause: 'Diabetes', count: 28000 },
  { cause: 'Kanker', count: 25000 },
  { cause: 'Pernapasan', count: 18000 },
];

export const BUDGET_EFFICIENCY_DATA = [
  { year: '2021', budget: 150, impact: 120 },
  { year: '2022', budget: 170, impact: 145 },
  { year: '2023', budget: 160, impact: 165 },
  { year: '2024', budget: 180, impact: 190 },
];

export const PROGRAM_EFFECTIVENESS = [
  { name: 'Vaksinasi Polio', target: 95, current: 88, budget: 1.2 },
  { name: 'Pemberian TTD', target: 80, current: 72, budget: 0.8 },
  { name: 'Screening PTM', target: 60, current: 45, budget: 2.1 },
  { name: 'Gizi Ibu Hamil', target: 90, current: 82, budget: 1.5 },
];

export const POLICY_INDICATORS: PolicyIndicator[] = [
  { id: 'I001', name: 'Angka Stunting Balita', value: 18.5, target: 14.0, unit: '%', trend: 'down', category: 'Prioritas' },
  { id: 'I002', name: 'Cakupan Vaksinasi Dasar', value: 88.2, target: 95.0, unit: '%', trend: 'up', category: 'Penyakit' },
  { id: 'I003', name: 'Rasio Tempat Tidur RS', value: 1.2, target: 1.5, unit: '/1k', trend: 'stable', category: 'Lingkungan' },
];

export const RESOURCE_DATA: ResourceMetric[] = [
  { facility: 'Puskesmas Kec. Melati', bedOccupancyRate: 85, staffRatio: 1200, medicineAvailability: 92, dailyVisits: 150 },
  { facility: 'RSUD Kota Sehat', bedOccupancyRate: 92, staffRatio: 450, medicineAvailability: 88, dailyVisits: 450 },
  { facility: 'Klinik Medika 24', bedOccupancyRate: 40, staffRatio: 800, medicineAvailability: 95, dailyVisits: 80 },
];

export const PUBLIC_PROPOSALS: PublicProposal[] = [
  { id: 'PR01', title: 'Penambahan Jadwal Posyandu Lansia', description: 'Mohon jadwal posyandu lansia di RW 05 ditambah menjadi 2x sebulan.', author: 'Bpk. Sutarjo', votes: 125, status: 'Ditinjau', category: 'Lansia' },
  { id: 'PR02', title: 'Perbaikan Drainase Depan RS', description: 'Drainase tersumbat menyebabkan genangan saat hujan, mengganggu akses ambulans.', author: 'Ibu Ratna', votes: 89, status: 'Diterima', category: 'Infrastruktur' },
];

export const RISK_MAP_DATA: RiskRegion[] = [
  { id: 'R01', name: 'Kel. Melati Indah', riskLevel: 'High', cases: 145, population: 5000, trend: 'increasing' },
  { id: 'R02', name: 'Kel. Kamboja Putih', riskLevel: 'Medium', cases: 62, population: 4500, trend: 'stable' },
  { id: 'R03', name: 'Kel. Anggrek Raya', riskLevel: 'Low', cases: 12, population: 3200, trend: 'decreasing' },
];

// --- QUALITY ENHANCED DATA ---

export const QUALITY_INDICATORS_FULL: QualityMetric[] = [
  { 
    id: 'Q01', name: 'Waktu Tunggu Rawat Jalan', value: 45, target: 60, unit: 'menit', trend: 'down', status: 'optimal',
    history: [{period: 'Jan', value: 55}, {period: 'Feb', value: 48}, {period: 'Mar', value: 45}]
  },
  { 
    id: 'Q02', name: 'Angka Infeksi RS (HAIs)', value: 0.8, target: 1.5, unit: '%', trend: 'down', status: 'optimal',
    history: [{period: 'Jan', value: 1.2}, {period: 'Feb', value: 1.0}, {period: 'Mar', value: 0.8}]
  },
  { 
    id: 'Q03', name: 'Kepatuhan Clinical Pathway', value: 82, target: 90, unit: '%', trend: 'up', status: 'warning',
    history: [{period: 'Jan', value: 75}, {period: 'Feb', value: 78}, {period: 'Mar', value: 82}]
  },
  { 
    id: 'Q04', name: 'Kepuasan Pasien (NPS)', value: 78, target: 80, unit: '/100', trend: 'up', status: 'optimal',
    history: [{period: 'Jan', value: 72}, {period: 'Feb', value: 75}, {period: 'Mar', value: 78}]
  },
];

export const STAFF_PERFORMANCE_DATA = [
  { name: 'Dr. Andi', productivity: 95, punctuality: 98, sop_compliance: 92, patient_rating: 4.8 },
  { name: 'Dr. Budi', productivity: 88, punctuality: 90, sop_compliance: 85, patient_rating: 4.5 },
  { name: 'Ns. Citra', productivity: 92, punctuality: 95, sop_compliance: 98, patient_rating: 4.9 },
  { name: 'Ns. Dedi', productivity: 85, punctuality: 85, sop_compliance: 90, patient_rating: 4.2 },
];

export const SAFETY_INCIDENTS: SafetyIncident[] = [
  { id: 'INC01', date: '2025-03-01', type: 'KNC', description: 'Kesalahan penulisan resep obat (terdeteksi di farmasi).', location: 'Poli Umum', status: 'Closed' },
  { id: 'INC02', date: '2025-02-20', type: 'KTD', description: 'Pasien jatuh saat turun dari tempat tidur.', location: 'Rawat Inap 3A', status: 'Investigating' },
];

export const AUDIT_RESULTS: AuditResult[] = [
  { id: 'AUD01', category: 'Kelengkapan Rekam Medis', score: 92, target: 100, findings: ['Beberapa tanda tangan dokter belum lengkap.'], date: '2025-03-01' },
  { id: 'AUD02', category: 'Kepatuhan Cuci Tangan', score: 88, target: 90, findings: ['Petugas lupa cuci tangan saat momen ke-3.'], date: '2025-03-05' },
];

export const QI_PROJECTS: QIProject[] = [
  { id: 'PJ01', title: 'Reduksi Waktu Tunggu Farmasi', lead: 'Apt. Budi', status: 'In Progress', progress: 65, impact: 'Waktu tunggu turun 15%.' },
  { id: 'PJ02', title: 'Zero Falls Project', lead: 'Ns. Citra', status: 'Completed', progress: 100, impact: 'Insiden jatuh turun 80%.' },
];

export const ACCREDITATION_STATUS = [
  { chapter: 'Kualifikasi & Pendidikan Staf (KPS)', score: 95, status: 'Ready' },
  { chapter: 'Manajemen Fasilitas & Keselamatan (MFK)', score: 82, status: 'Needs Improvement' },
  { chapter: 'Pelayanan & Asuhan Pasien (PAP)', score: 88, status: 'Ready' },
  { chapter: 'Pencegahan & Pengendalian Infeksi (PPI)', score: 91, status: 'Ready' },
];
