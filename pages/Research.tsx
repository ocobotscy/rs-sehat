
import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
    DISEASE_TREND_DATA, SURVEY_LIST, RESEARCH_PAPERS, IMMUNIZATION_DATA, DEMOGRAPHIC_DATA 
} from '../services/mockData';
import { 
    FileText, Download, Lock, Brain, TrendingUp, Users, Activity, 
    ClipboardCheck, Search, BookOpen, ChevronRight, Sparkles, XCircle, CheckCircle, ChevronLeft, Gift, AlertCircle
} from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode, Survey, ResearchPaper } from '../types';

// --- Sub-Component: AI Insight Generator ---
const AIInsightCard: React.FC = () => {
    const [insight, setInsight] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateInsight = async () => {
        setLoading(true);
        const contextData = JSON.stringify({
            tren_penyakit: DISEASE_TREND_DATA,
            imunisasi: IMMUNIZATION_DATA
        });
        
        let fullText = '';
        await streamGeminiResponse(
            "Berikan 3 insight penting (poin-poin singkat) dari data kesehatan ini untuk masyarakat umum. Fokus pada tren penyakit menular dan cakupan imunisasi.",
            BotMode.RESEARCH_ANALYST,
            (chunk) => {
                fullText += chunk;
                setInsight(fullText);
            },
            contextData
        );
        setLoading(false);
    };

    return (
        <Card className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white border-none relative overflow-hidden">
            <div className="relative z-10 p-2">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <h3 className="font-bold text-lg">AI Smart Insight</h3>
                </div>
                
                {!insight && !loading && (
                    <div className="text-center py-6">
                        <p className="text-violet-100 mb-4 text-sm">Analisis data kesehatan terkini secara otomatis menggunakan AI.</p>
                        <button 
                            onClick={generateInsight}
                            className="bg-white text-violet-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-violet-50 transition-colors shadow-md"
                        >
                            Generate Insight
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded w-full"></div>
                        <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    </div>
                )}

                {insight && (
                    <div className="bg-white/10 rounded-xl p-4 text-sm leading-relaxed backdrop-blur-sm animate-fade-in">
                        <div dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        <button onClick={generateInsight} className="mt-3 text-xs text-violet-200 hover:text-white underline">
                            Refresh Analisis
                        </button>
                    </div>
                )}
            </div>
            <Brain className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10" />
        </Card>
    );
};

// --- Sub-Component: Survey Taker ---
const SurveyTaker: React.FC<{ survey: Survey; onClose: () => void }> = ({ survey, onClose }) => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    // Mock Questions
    const questions = [
        "Seberapa sering Anda mengonsumsi buah dan sayur dalam seminggu terakhir?",
        "Apakah Anda rutin melakukan aktivitas fisik minimal 30 menit sehari?",
        "Apakah Anda memiliki riwayat penyakit gula (diabetes) dalam keluarga?",
        "Apakah Anda merokok atau terpapar asap rokok setiap hari?"
    ];

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsDone(true);
            }, 1500);
        }
    };

    if (isDone) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center">Terima Kasih!</h2>
                <p className="text-gray-500 text-center mb-8 max-w-md">
                    Anda telah menyelesaikan survei <strong>"{survey.title}"</strong>.
                    <br/>Poin reward telah ditambahkan ke akun Anda.
                </p>
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-6 py-3 rounded-xl border border-yellow-200 mb-8 font-bold">
                    <Gift className="w-5 h-5" />
                    +{survey.points} Poin Diterima
                </div>
                <Button onClick={onClose} className="px-8">Kembali ke Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div>
                    <h3 className="font-bold text-gray-800">{survey.title}</h3>
                    <p className="text-xs text-gray-500">Pertanyaan {step + 1} dari {questions.length}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><XCircle className="w-6 h-6 text-gray-400" /></button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    {isSubmitting ? (
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Mengirim jawaban...</p>
                        </div>
                    ) : (
                        <Card className="p-8">
                            <h4 className="text-xl font-medium text-gray-800 mb-8 text-center leading-relaxed">{questions[step]}</h4>
                            <div className="space-y-3">
                                {['Sangat Sering / Ya', 'Kadang-kadang', 'Jarang', 'Tidak Pernah'].map((opt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={handleNext}
                                        className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-primary-50 hover:border-primary-500 transition-all font-medium text-gray-600 hover:text-primary-700"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
            
            <div className="bg-white p-4 border-t border-gray-200">
                <div className="w-full bg-gray-100 rounded-full h-2 max-w-md mx-auto">
                    <div className="bg-primary-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Paper Reader ---
const PaperReader: React.FC<{ paper: ResearchPaper; onClose: () => void }> = ({ paper, onClose }) => {
    
    const handleDownload = () => {
        // Simulasi Download
        const element = document.createElement("a");
        const file = new Blob([`JUDUL: ${paper.title}\n\n${paper.content?.replace(/<[^>]*>?/gm, '')}`], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${paper.id}_Research_Paper.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        
        // Show fake toast (alert for now)
        alert(`Mengunduh dokumen: ${paper.title}.pdf`);
    };

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-fade-in flex flex-col">
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 text-gray-600 font-medium">
                        <ChevronLeft className="w-5 h-5" /> Kembali
                    </button>
                    <div className="hidden md:block">
                        <h3 className="font-bold text-gray-800 line-clamp-1 max-w-md">{paper.title}</h3>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDownload} className="text-sm">
                        <Download className="w-4 h-4 mr-2" /> Unduh PDF
                    </Button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto w-full p-8 md:p-12 pb-32">
                <div className="mb-8 border-b border-gray-100 pb-8">
                    <Badge color="blue">{paper.category}</Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-4 leading-tight">{paper.title}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{paper.author}</span>
                        </div>
                        <div className="hidden sm:block">•</div>
                        <div>{paper.date}</div>
                        <div className="hidden sm:block">•</div>
                        <div>Dibaca {paper.readCount} kali</div>
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                    <h4 className="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wide">Ringkasan Eksekutif</h4>
                    <p className="text-blue-900 leading-relaxed">{paper.summary}</p>
                </div>

                <div className="prose prose-blue max-w-none text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: paper.content || '<p>Konten lengkap sedang dimuat...</p>' }} />
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Redeem Modal ---
const RedeemModal: React.FC<{ onClose: () => void, points: number }> = ({ onClose, points }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="bg-primary-600 p-6 text-white text-center">
                    <Gift className="w-12 h-12 mx-auto mb-2 opacity-90" />
                    <h3 className="text-xl font-bold">Tukar Poin Riset</h3>
                    <p className="text-primary-100 text-sm">Saldo Anda: <span className="font-bold text-white">{points} Poin</span></p>
                </div>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    {[
                        { title: 'Voucher Vitamin Rp50rb', cost: 200, icon: '💊' },
                        { title: 'Konsultasi Dokter Gratis', cost: 350, icon: '👨‍⚕️' },
                        { title: 'Saldo E-Wallet Rp20rb', cost: 400, icon: '💳' },
                        { title: 'Paket Data Internet 2GB', cost: 150, icon: '📱' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                                    <span className="text-xs text-primary-600 font-bold">{item.cost} Poin</span>
                                </div>
                            </div>
                            <Button 
                                variant={points >= item.cost ? "primary" : "ghost"} 
                                className={`text-xs py-1 px-3 ${points < item.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={points < item.cost}
                                onClick={() => alert(`Berhasil menukar: ${item.title}`)}
                            >
                                Tukar
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <button onClick={onClose} className="text-gray-500 font-medium hover:text-gray-800">Tutup</button>
                </div>
            </div>
        </div>
    );
};

const Research: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'surveys' | 'library'>('dashboard');
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);
  const [readingPaper, setReadingPaper] = useState<ResearchPaper | null>(null);
  const [showRedeem, setShowRedeem] = useState(false);

  // Handlers
  const handleStartSurvey = (survey: Survey) => {
      setActiveSurvey(survey);
  };

  const handleReadPaper = (paper: ResearchPaper) => {
      setReadingPaper(paper);
  };

  const handleDownloadPaper = (title: string) => {
      alert(`Mengunduh dokumen PDF: ${title}.pdf\nSilakan cek folder unduhan Anda.`);
  };

  // Render Views
  if (activeSurvey) return <SurveyTaker survey={activeSurvey} onClose={() => setActiveSurvey(null)} />;
  if (readingPaper) return <PaperReader paper={readingPaper} onClose={() => setReadingPaper(null)} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FlaskConicalIcon className="w-6 h-6 text-primary-600" />
                Penelitian & Informatika Medik
            </h2>
            <p className="text-gray-500 text-sm mt-1">Platform partisipasi masyarakat dalam riset kesehatan berbasis data.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            {[
                { id: 'dashboard', label: 'Dashboard Data', icon: Activity },
                { id: 'surveys', label: 'Pusat Survei', icon: ClipboardCheck },
                { id: 'library', label: 'Perpustakaan', icon: BookOpen },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id 
                        ? 'bg-primary-100 text-primary-700 shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* --- TAB 1: DASHBOARD --- */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {/* AI Insight Section */}
            <div className="lg:col-span-1">
                <AIInsightCard />
            </div>

            {/* Top Metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <Card className="flex items-center justify-between p-4 bg-blue-50 border-blue-100">
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Partisipan Riset</p>
                        <h4 className="text-2xl font-bold text-gray-900">12,540</h4>
                        <span className="text-xs text-blue-500">+12% bulan ini</span>
                    </div>
                    <Users className="w-8 h-8 text-blue-300" />
                </Card>
                <Card className="flex items-center justify-between p-4 bg-emerald-50 border-emerald-100">
                    <div>
                        <p className="text-sm text-emerald-600 font-medium">Survei Selesai</p>
                        <h4 className="text-2xl font-bold text-gray-900">85</h4>
                        <span className="text-xs text-emerald-500">Total Program</span>
                    </div>
                    <ClipboardCheck className="w-8 h-8 text-emerald-300" />
                </Card>
            </div>

            {/* Main Charts */}
            <Card className="lg:col-span-2" title="Tren Penyakit (2025)">
                <div className="h-80 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={DISEASE_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{fontSize: 12}} />
                            <YAxis tick={{fontSize: 12}} />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                            <Legend />
                            <Line type="monotone" dataKey="ISPA" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="Diabetes" stroke="#10b981" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="Diare" stroke="#f59e0b" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="lg:col-span-1 space-y-6">
                <Card title="Cakupan Imunisasi">
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={IMMUNIZATION_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {IMMUNIZATION_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
                            <span className="text-2xl font-bold text-gray-800">65%</span>
                            <span className="text-xs text-gray-500">Lengkap</span>
                        </div>
                    </div>
                </Card>

                <Card title="Demografi Responden">
                     <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DEMOGRAPHIC_DATA} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="age" type="category" width={40} tick={{fontSize: 10}} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="participants" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </Card>
            </div>
        </div>
      )}

      {/* --- TAB 2: SURVEI --- */}
      {activeTab === 'surveys' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                        <TrendingUp className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Program Loyalitas Riset</h3>
                        <p className="text-sm text-gray-600">Anda memiliki <span className="font-bold text-primary-600">450 Poin Riset</span>. Tukarkan dengan voucher kesehatan.</p>
                    </div>
                </div>
                <Button variant="primary" onClick={() => setShowRedeem(true)}>Tukar Poin</Button>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mt-6">Survei Tersedia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SURVEY_LIST.map((survey) => (
                    <Card key={survey.id} className="hover:border-primary-300 transition-all cursor-pointer group flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <Badge color={survey.status === 'active' ? 'green' : survey.status === 'completed' ? 'blue' : 'yellow'}>
                                    {survey.status.toUpperCase()}
                                </Badge>
                                <span className="text-xs font-bold text-yellow-600 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> +{survey.points} Poin
                                </span>
                            </div>
                            <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{survey.title}</h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{survey.description}</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex gap-3">
                                    <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> {survey.category}</span>
                                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {survey.estimatedTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {survey.participants}
                                </div>
                            </div>
                        </div>

                        {survey.status === 'active' && (
                            <div className="mt-3">
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                                    <div className="bg-primary-500 h-1.5 rounded-full" style={{width: `${survey.progress || 0}%`}}></div>
                                </div>
                                <div className="text-[10px] text-right text-gray-400">Progress: {survey.progress}%</div>
                            </div>
                        )}
                        
                        <div className="mt-4">
                            <Button 
                                variant={survey.status === 'active' ? 'primary' : 'outline'} 
                                className="w-full text-sm py-2"
                                disabled={survey.status !== 'active'}
                                onClick={() => survey.status === 'active' && handleStartSurvey(survey)}
                            >
                                {survey.status === 'active' ? 'Mulai Survei' : survey.status === 'completed' ? 'Sudah Selesai' : 'Segera Hadir'}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}

      {/* --- TAB 3: PERPUSTAKAAN --- */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Cari jurnal, topik, atau penulis..." 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <Button variant="outline" className="hidden sm:flex">Filter</Button>
            </div>

            <div className="space-y-4">
                {RESEARCH_PAPERS.map((paper) => (
                    <Card key={paper.id} className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                        {paper.category}
                                    </span>
                                    <span className="text-xs text-gray-400">• {paper.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{paper.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed bg-gray-50 p-3 rounded-lg border-l-4 border-primary-300">
                                    <span className="font-bold text-gray-700 block mb-1">Ringkasan:</span>
                                    {paper.summary}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Penulis: {paper.author}</span>
                                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Dibaca: {paper.readCount} kali</span>
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                                <Button className="text-xs w-full" onClick={() => handleReadPaper(paper)}>
                                    <FileText className="w-3 h-3 mr-1" /> Baca Detail
                                </Button>
                                <Button variant="outline" className="text-xs w-full" onClick={() => handleDownloadPaper(paper.title)}>
                                    <Download className="w-3 h-3 mr-1" /> Unduh PDF
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}

      {showRedeem && <RedeemModal onClose={() => setShowRedeem(false)} points={450} />}
    </div>
  );
};

// Helper Icon Component for Header
const FlaskConicalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
);

export default Research;
