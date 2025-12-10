
export enum Role {
  CITIZEN = 'Masyarakat',
  ADMIN = 'Admin/Kebijakan'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  points: number;
}

export type MaterialType = 'article' | 'video' | 'infographic';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  type: MaterialType;
  thumbnail: string;
  duration: string;
  content: string; // HTML or Markdown content
  videoUrl?: string; // YouTube/Video link
  quiz: QuizQuestion[];
  completed?: boolean;
  bookmarked?: boolean;
  points: number;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Complaint {
  id: string;
  service: string;
  description: string;
  status: 'Pending' | 'Resolved' | 'Investigating';
  date: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export enum BotMode {
  EDUCATION = 'Edukasi Kesehatan',
  HELPDESK = 'Layanan & Mutu',
  CONTEXTUAL_LEARNING = 'Asisten Materi',
  RESEARCH_ANALYST = 'Analis Data Riset',
  POLICY_SIMULATOR = 'Simulasi Kebijakan',
  QUALITY_ADVISOR = 'Advisor Mutu Layanan'
}

// Research Module Types
export interface Survey {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  points: number;
  participants: number;
  deadline: string;
  status: 'active' | 'completed' | 'upcoming';
  progress?: number; // 0-100
}

export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string; // Simplified for public
  content?: string; // Full HTML content
  category: string;
  readCount: number;
  downloadUrl?: string;
  tags: string[];
}

// Policy Module Types
export interface PolicyIndicator {
  id: string;
  name: string;
  value: number; // Current value
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'Prioritas' | 'Penyakit' | 'Lingkungan';
}

export interface ResourceMetric {
  facility: string;
  bedOccupancyRate: number; // %
  staffRatio: number; // 1:X
  medicineAvailability: number; // %
  dailyVisits: number;
}

export interface PublicProposal {
  id: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  status: 'Ditinjau' | 'Diterima' | 'Ditolak';
  category: string;
}

export interface RiskRegion {
  id: string;
  name: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  cases: number;
  population: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

// Quality Module Types
export interface QualityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'optimal' | 'warning' | 'critical';
  history: { period: string; value: number }[];
}

export interface SafetyIncident {
  id: string;
  date: string;
  type: 'KNC' | 'KTC' | 'KTD' | 'Sentinel';
  description: string;
  location: string;
  status: 'Open' | 'Investigating' | 'Closed';
}

export interface AuditResult {
  id: string;
  category: string;
  score: number;
  target: number;
  findings: string[];
  date: string;
}

export interface QIProject {
  id: string;
  title: string;
  lead: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  progress: number;
  impact: string;
}
