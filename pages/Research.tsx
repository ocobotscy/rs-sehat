
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
// Removed non-existent DEMOGRAPHIC_DATA from the import list
import { 
    DISEASE_TREND_DATA, SURVEY_LIST, RESEARCH_PAPERS, IMMUNIZATION_DATA 
} from '../services/mockData';
import { 
    FileText, Download, Lock, Brain, TrendingUp, Users, Activity, 
    ClipboardCheck, Search, BookOpen, ChevronRight, Sparkles, XCircle, CheckCircle, ChevronLeft, Gift, AlertCircle,
    Dna, Microscope, Globe, Cloud, Database, MonitorPlay, ScanLine, Info
} from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode, Survey, ResearchPaper } from '../types';

// --- Sub-Component: Genomic & Bioinformatics Lab ---
const GenomicsLab: React.FC = () => {
    const [dnaSequence, setDnaSequence] = useState("ATGC...GCTA...TAGC");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const runAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setResult("Varian Genetik Terdeteksi: CYP2C19*2 (Metabolisme Obat Lambat). Rekomendasi: Penyesuaian dosis Clopidogrel.");
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <Card className="border-indigo-200 dark:border-indigo-500/30" title="Analisis Genomik & Bioinformatika">
            <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-xl font-mono text-emerald-400 text-xs break-all relative overflow-hidden h-24 flex items-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                    <div className="animate-pulse">
                        AGCTTAGCCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs">
                        Analisis DNA untuk terapi berbasis gen (Personalized Medicine).
                    </p>
                    <Button onClick={runAnalysis} disabled={analyzing} className="bg-indigo-600 hover:bg-indigo-700">
                        {analyzing ? <Activity className="w-4 h-4 animate-spin" /> : <Dna className="w-4 h-4" />}
                        {analyzing ? "Menganalisis..." : "Run Sequence"}
                    </Button>
                </div>
                {result && (
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg animate-fade-in">
                        <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" /> Hasil Analisis Bioinformatika:
                        </p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-200 mt-1">{result}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

// --- Sub-Component: AI Diagnostic Simulator ---
const AIDiagnosticHub: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        setScanning(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setScanning(false);
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    return (
        <Card title="AI Diagnostics Hub (Imaging Analysis)" className="relative overflow-hidden">
            <div className="aspect-square bg-gray-100 dark:bg-slate-900 rounded-2xl mb-4 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800 relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all" />
                
                {scanning && (
                    <div className="absolute inset-0 z-20">
                        <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] absolute animate-scan-y"></div>
                        <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                            <span className="bg-slate-900/80 px-3 py-1 rounded-full text-white text-xs font-bold backdrop-blur-md">Scanning Patterns: {progress}%</span>
                        </div>
                    </div>
                )}

                {!scanning && progress === 100 && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex flex-col items-center justify-center p-4 text-center z-10 backdrop-blur-sm">
                        <CheckCircle className="w-12 h-12 text-emerald-600 mb-2" />
                        <h5 className="font-bold text-emerald-800 dark:text-emerald-100 text-sm">Pola Teridentifikasi</h5>
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Akurasi AI: 98.4% - Menyarankan fokus pada lobus kanan bawah.</p>
                    </div>
                )}
                
                {!scanning && progress === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <ScanLine className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-xs">Drag & Drop Citra Medis (CT/MRI)</p>
                    </div>
                )}
            </div>
            <Button onClick={startScan} disabled={scanning} className="w-full">
                {scanning ? "Memproses Pola..." : "Mulai Analisis AI"}
            </Button>
        </Card>
    );
};

// --- Sub-Component: Digital Epi-Modeler ---
const DigitalEpiModeler: React.FC = () => {
    return (
        <Card title="Digital Epidemiology Modeling (Real-time)" className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-900/30">
                    <p className="text-[10px] uppercase font-black text-red-600 dark:text-red-400 mb-1">R0 Effective</p>
                    <p className="text-xl font-bold text-red-700 dark:text-red-300">1.25 <span className="text-[10px] font-normal text-gray-500">▲</span></p>
                </div>
                <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <p className="text-[10px] uppercase font-black text-blue-600 dark:text-blue-400 mb-1">Estimated Peak</p>
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-300">Mar 2025</p>
                </div>
                <div className="flex-1 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400 mb-1">Confidence</p>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">92%</p>
                </div>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DISEASE_TREND_DATA}>
                        <defs>
                            <linearGradient id="colorEpi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                        <XAxis dataKey="name" tick={{fontSize: 10}} />
                        <YAxis tick={{fontSize: 10}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="ISPA" name="Observasi" stroke="#ef4444" fill="url(#colorEpi)" strokeWidth={3} />
                        <Line type="monotone" dataKey="ISPA" name="Prediksi AI" stroke="#94a3b8" strokeDasharray="5 5" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 bg-gray-50 dark:bg-slate-800 p-2 rounded-lg">
                <Info className="w-3 h-3" />
                Prediksi berbasis data real-time integrasi SATUSEHAT & SIMRS.
            </div>
        </Card>
    );
};

// --- Sub-Component: CRIS Dashboard ---
const CRISDashboard: React.FC = () => {
    return (
        <Card title="Clinical Research Information System (CRIS)" className="lg:col-span-1">
            <div className="space-y-4 mt-2">
                {[
                    { title: "Uji Klinis Vaksin Baru", recruited: 450, target: 500, status: "Aktif" },
                    { title: "Studi Observasi DM tipe 2", recruited: 120, target: 150, status: "Aktif" },
                    { title: "Studi Pola Tidur Gen-Z", recruited: 1000, target: 1000, status: "Closed" },
                ].map((trial, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-2">
                            <h6 className="text-xs font-bold text-gray-800 dark:text-slate-100">{trial.title}</h6>
                            <Badge color={trial.status === 'Aktif' ? 'green' : 'blue'}>{trial.status}</Badge>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>Rekrutmen Pasien</span>
                            <span>{trial.recruited}/{trial.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary-500 h-full transition-all" style={{ width: `${(trial.recruited / trial.target) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full text-xs">
                    <Database className="w-3 h-3 mr-2" /> Kelola Data Pasien (SOP)
                </Button>
            </div>
        </Card>
    );
};

// --- Sub-Component: AI Insight Card (Original) ---
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
        <Card className="bg-gradient-to-r from-violet-500 to-fuchsia-600 dark:from-violet-600 dark:to-fuchsia-700 text-white border-none relative overflow-hidden">
            <div className="relative z-10">
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
                    </div>
                )}

                {insight && (
                    <div className="bg-white/10 rounded-xl p-4 text-sm leading-relaxed backdrop-blur-sm animate-fade-in border border-white/10">
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
            <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Terima Kasih!</h2>
                <p className="text-gray-500 dark:text-slate-400 text-center mb-8 max-w-md">
                    Anda telah menyelesaikan survei <strong>"{survey.title}"</strong>.
                    <br/>Poin reward telah ditambahkan ke akun Anda.
                </p>
                <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-6 py-3 rounded-xl border border-yellow-200 dark:border-yellow-500/30 mb-8 font-bold">
                    <Gift className="w-5 h-5" />
                    +{survey.points} Poin Diterima
                </div>
                <Button onClick={onClose} className="px-8">Kembali ke Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-50 dark:bg-slate-950 z-50 flex flex-col">
            <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{survey.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Pertanyaan {step + 1} dari {questions.length}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"><XCircle className="w-6 h-6 text-gray-400" /></button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    {isSubmitting ? (
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-slate-300">Mengirim jawaban...</p>
                        </div>
                    ) : (
                        <Card className="p-8">
                            <h4 className="text-xl font-medium text-gray-800 dark:text-slate-100 mb-8 text-center leading-relaxed">{questions[step]}</h4>
                            <div className="space-y-3">
                                {['Sangat Sering / Ya', 'Kadang-kadang', 'Jarang', 'Tidak Pernah'].map((opt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={handleNext}
                                        className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:border-primary-500 dark:hover:border-primary-400 transition-all font-medium text-gray-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-300"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Paper Reader ---
const PaperReader: React.FC<{ paper: ResearchPaper; onClose: () => void }> = ({ paper, onClose }) => {
    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-950 z-50 overflow-y-auto animate-fade-in flex flex-col">
            <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-10">
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1 text-gray-600 dark:text-slate-300 font-medium">
                    <ChevronLeft className="w-5 h-5" /> Kembali
                </button>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-sm"><Download className="w-4 h-4 mr-2" /> Unduh PDF</Button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto w-full p-8 md:p-12 pb-32">
                <div className="mb-8 border-b border-gray-100 dark:border-slate-800 pb-8">
                    <Badge color="blue">{paper.category}</Badge>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-4 leading-tight">{paper.title}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
                        <div className="flex items-center gap-2"><Users className="w-4 h-4" /> <span>{paper.author}</span></div>
                        <div className="hidden sm:block">•</div>
                        <div>{paper.date}</div>
                        <div className="hidden sm:block">•</div>
                        <div>Dibaca {paper.readCount} kali</div>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mb-8">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-sm uppercase tracking-wide text-xs">Ringkasan Eksekutif</h4>
                    <p className="text-blue-900 dark:text-blue-100 leading-relaxed text-sm">{paper.summary}</p>
                </div>
                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-slate-300 text-sm">
                    <div dangerouslySetInnerHTML={{ __html: paper.content || '<p>Konten lengkap sedang dimuat...</p>' }} />
                </div>
            </div>
        </div>
    );
};

const Research: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lab' | 'surveys' | 'library'>('dashboard');
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);
  const [readingPaper, setReadingPaper] = useState<ResearchPaper | null>(null);

  // Fix: Added handleStartSurvey to resolve compilation error on line 515
  const handleStartSurvey = (survey: Survey) => {
    setActiveSurvey(survey);
  };

  // Fix: Added handleReadPaper to resolve compilation error on line 533
  const handleReadPaper = (paper: ResearchPaper) => {
    setReadingPaper(paper);
  };

  if (activeSurvey) return <SurveyTaker survey={activeSurvey} onClose={() => setActiveSurvey(null)} />;
  if (readingPaper) return <PaperReader paper={readingPaper} onClose={() => setReadingPaper(null)} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Microscope className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                Penelitian & Informatika Medik
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Platform integrasi penelitian kesehatan modern berbasis data dan AI.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
            {[
                { id: 'dashboard', label: 'Data Hub', icon: Activity },
                { id: 'lab', label: 'Lab Informatika', icon: MonitorPlay },
                { id: 'surveys', label: 'Pusat Survei', icon: ClipboardCheck },
                { id: 'library', label: 'Perpustakaan', icon: BookOpen },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 shadow-sm' 
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* --- TAB: DASHBOARD --- */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="lg:col-span-1">
                <AIInsightCard />
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <Card className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-800">
                    <div>
                        <p className="text-xs text-blue-600 dark:text-blue-300 font-bold uppercase">Data Point Riset</p>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">12.5M+</h4>
                    </div>
                    <Globe className="w-10 h-10 text-blue-300/30" />
                </Card>
                <Card className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-800">
                    <div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-300 font-bold uppercase">Interoperability</p>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">SATUSEHAT</h4>
                    </div>
                    <Activity className="w-10 h-10 text-emerald-300/30" />
                </Card>
            </div>
            <Card className="lg:col-span-3" title="Surveilans Epidemiologi Digital Nasional">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={DISEASE_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis dataKey="name" tick={{fontSize: 10}} />
                            <YAxis tick={{fontSize: 10}} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ISPA" stroke="#3b82f6" strokeWidth={3} dot={{r:4}} />
                            <Line type="monotone" dataKey="Diabetes" stroke="#10b981" strokeWidth={3} dot={{r:4}} />
                            <Line type="monotone" dataKey="Diare" stroke="#f59e0b" strokeWidth={3} dot={{r:4}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
      )}

      {/* --- TAB: LAB INFORMATIKA --- */}
      {activeTab === 'lab' && (
        <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GenomicsLab />
                <AIDiagnosticHub />
                <CRISDashboard />
                <DigitalEpiModeler />
                <Card title="Data Sharing & Cloud Workspace" className="lg:col-span-1">
                    <div className="flex flex-col h-full justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800">
                                <Cloud className="w-5 h-5 text-blue-500" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-800 dark:text-slate-100">Dataset_Genomik_RW05.json</p>
                                    <p className="text-[10px] text-gray-500">Shared with 3 Institutions</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-800">
                                <Lock className="w-5 h-5 text-emerald-500" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-800 dark:text-slate-100">Secure_Clinical_Trial_V2.enc</p>
                                    <p className="text-[10px] text-gray-500">Encrypted AES-256</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button className="w-full text-xs">
                                <Search className="w-3 h-3 mr-2" /> Buka Collaborative Workspace
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      )}

      {/* --- TAB: SURVEI --- */}
      {activeTab === 'surveys' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
            {SURVEY_LIST.map((survey) => (
                <Card key={survey.id} className="hover:border-primary-300 transition-all cursor-pointer group flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <Badge color="green">AKTIF</Badge>
                            <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">+{survey.points} Poin</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 transition-colors">{survey.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 line-clamp-2">{survey.description}</p>
                    </div>
                    <Button className="mt-4 w-full text-xs" onClick={() => handleStartSurvey(survey)}>Ikut Berpartisipasi</Button>
                </Card>
            ))}
        </div>
      )}

      {/* --- TAB: PERPUSTAKAAN --- */}
      {activeTab === 'library' && (
        <div className="space-y-4 animate-fade-in-up">
            {RESEARCH_PAPERS.map((paper) => (
                <Card key={paper.id} className="hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <Badge color="blue" className="mb-2">{paper.category}</Badge>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{paper.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">{paper.summary}</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-2 min-w-[140px]">
                            <Button className="text-[10px] w-full" onClick={() => handleReadPaper(paper)}>Baca Jurnal</Button>
                            <Button variant="outline" className="text-[10px] w-full">Unduh PDF</Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Research;
