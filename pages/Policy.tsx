
import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../components/UI';
import { 
    Map, FileCheck, AlertTriangle, TrendingUp, TrendingDown, Minus, 
    Activity, Syringe, Building2, Users, FileText, Vote, Sparkles, Sliders,
    Printer, Download, PieChart as PieChartIcon, Eye, CheckCircle2, DollarSign,
    Target, BarChart3, ShieldAlert, HeartPulse, Globe
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    AreaChart, Area, CartesianGrid, LineChart, Line, Legend, PieChart, Pie
} from 'recharts';
import { 
    POLICY_INDICATORS, RESOURCE_DATA, PUBLIC_PROPOSALS, RISK_MAP_DATA, 
    DISEASE_TREND_DATA, NATIONAL_MORTALITY_DATA, BUDGET_EFFICIENCY_DATA, PROGRAM_EFFECTIVENESS 
} from '../services/mockData';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode, PolicyIndicator } from '../types';

// --- Sub-Component: SIKN & Dashboard Analitik ---
const SIKNDashboard: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <Card className="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100">
                    <p className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Status Kesehatan Nasional</p>
                    <h4 className="text-2xl font-black text-emerald-800 dark:text-emerald-300">BAIK</h4>
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +2.4% vs 2024</p>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-500/10 border-blue-100">
                    <p className="text-[10px] uppercase font-bold text-blue-600 mb-1">Indeks Pelayanan</p>
                    <h4 className="text-2xl font-black text-blue-800 dark:text-blue-300">84.2</h4>
                    <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">Optimal (Target 85.0)</p>
                </Card>
                <Card className="bg-amber-50 dark:bg-amber-500/10 border-amber-100">
                    <p className="text-[10px] uppercase font-bold text-amber-600 mb-1">Mortalitas Ibu</p>
                    <h4 className="text-2xl font-black text-amber-800 dark:text-amber-300">182<span className="text-sm font-normal">/100rb</span></h4>
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><TrendingDown className="w-3 h-3"/> -5.1% Penurunan</p>
                </Card>
                <Card className="bg-red-50 dark:bg-red-500/10 border-red-100">
                    <p className="text-[10px] uppercase font-bold text-red-600 mb-1">Prioritas Nasional</p>
                    <h4 className="text-2xl font-black text-red-800 dark:text-red-300">STUNTING</h4>
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">Fokus Alokasi Dana 2025</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Analisis Morbiditas & Mortalitas (Penyebab Kematian)">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={NATIONAL_MORTALITY_DATA} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.1} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="cause" type="category" tick={{fontSize: 10}} width={100} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]}>
                                    {NATIONAL_MORTALITY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Tren Penyakit Menular Berdasarkan SIKN">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DISEASE_TREND_DATA}>
                                <defs>
                                    <linearGradient id="colorDiare" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis dataKey="name" tick={{fontSize: 10}} />
                                <YAxis tick={{fontSize: 10}} />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="ISPA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                                <Area type="monotone" dataKey="Diare" stroke="#f59e0b" fill="url(#colorDiare)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// --- Sub-Component: Monitoring & Evaluasi Program ---
const MonitoringEvaluasi: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Efektivitas Program Prioritas" className="lg:col-span-2">
                    <div className="space-y-6 mt-4">
                        {PROGRAM_EFFECTIVENESS.map((prog, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-sm font-bold text-gray-800 dark:text-slate-100">{prog.name}</h5>
                                    <span className="text-xs font-bold text-primary-600">{prog.current}% / {prog.target}% Target</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-primary-500 rounded-full transition-all duration-1000" 
                                        style={{ width: `${(prog.current / prog.target) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500">
                                    <span className="flex items-center gap-1"><DollarSign className="w-2.5 h-2.5"/> Anggaran: Rp {prog.budget} Triliun</span>
                                    <span className="flex items-center gap-1"><Activity className="w-2.5 h-2.5"/> Cost-Effective Score: 8.4/10</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Analisis Biaya & Dampak">
                    <p className="text-xs text-gray-500 mb-4">Efisiensi anggaran kesehatan nasional (2021-2024)</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={BUDGET_EFFICIENCY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis dataKey="year" tick={{fontSize: 10}} />
                                <YAxis tick={{fontSize: 10}} />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36}/>
                                <Line type="monotone" dataKey="budget" name="Biaya" stroke="#94a3b8" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="impact" name="Dampak Kesehatan" stroke="#10b981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-300 italic">
                            "Optimalisasi biaya di 2024 berhasil meningkatkan dampak kesehatan sebesar 15% melalui digitalisasi layanan."
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// --- Sub-Component: EWS & Decision Making ---
const EWSDecisionHub: React.FC = () => {
    const [budget, setBudget] = useState(50);
    const [staff, setStaff] = useState(30);
    const [prevention, setPrevention] = useState(40);
    const [prediction, setPrediction] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const runSimulation = async () => {
        setLoading(true);
        const params = `Anggaran: +${budget}%, Tenaga Medis: +${staff}%, Program Preventif: +${prevention}%`;
        
        let fullText = '';
        await streamGeminiResponse(
            "Analisis dampak perubahan parameter ini terhadap penurunan stunting dan penyakit menular dalam 1 tahun ke depan. Berikan rekomendasi langkah strategis penanganan wabah.",
            BotMode.POLICY_SIMULATOR,
            (chunk) => {
                fullText += chunk;
                setPrediction(fullText);
            },
            params
        );
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Early Warning System */}
                 <Card className="bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-900/30" title="Real-time Early Warning System (EWS)">
                    <div className="space-y-3">
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-1 h-full bg-red-500 animate-pulse"></div>
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                <h5 className="font-bold text-red-700 dark:text-red-400 text-sm">SIAGA 1: Lonjakan DBD</h5>
                            </div>
                            <p className="text-[10px] text-gray-600 dark:text-slate-400">Terdeteksi anomali kenaikan 15% di Kel. Melati Indah dalam 48 jam.</p>
                            <Button className="mt-3 w-full py-1 text-[10px] bg-red-600 hover:bg-red-700 border-none">Aktifkan Protokol Fogging</Button>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-orange-100 dark:border-orange-900/30 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                <h5 className="font-bold text-orange-700 dark:text-orange-400 text-sm">Waspada: Polusi Udara</h5>
                            </div>
                            <p className="text-[10px] text-gray-600 dark:text-slate-400">Indeks PM 2.5 tinggi (162). Peningkatan risiko ISPA pada kelompok rentan.</p>
                        </div>
                    </div>
                 </Card>

                 <div className="lg:col-span-2 space-y-6">
                    <Card title="Data-Driven Decision Support (AI Simulation)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Budget Allocation</label>
                                        <span className="text-xs font-bold text-primary-600">+{budget}%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={budget} onChange={e => setBudget(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Medical Personnel</label>
                                        <span className="text-xs font-bold text-primary-600">+{staff}%</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={staff} onChange={e => setStaff(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                                </div>
                                <Button onClick={runSimulation} className="w-full flex items-center justify-center gap-2" disabled={loading}>
                                    <Sparkles className="w-4 h-4" />
                                    {loading ? 'Processing Data...' : 'Run Prediction Model'}
                                </Button>
                            </div>
                            <div className="bg-slate-900 rounded-xl p-4 text-white text-[11px] leading-relaxed max-h-[160px] overflow-y-auto border border-slate-700">
                                {prediction ? (
                                    <div dangerouslySetInnerHTML={{ __html: prediction.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-400">$1</strong>') }} />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60 italic">
                                        <Globe className="w-8 h-8 mb-2" />
                                        <p className="text-center">Sistem siap memproses variabel kebijakan...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Transparansi & Akuntabilitas ---
const TransparencyPortal: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <Card title="Portal Transparansi Kinerja Kesehatan">
                <div className="flex flex-col md:flex-row gap-6 items-center mb-8 bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pantau Kinerja Lembaga</h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Masyarakat berhak mendapatkan akses terhadap capaian indikator kesehatan dan penggunaan anggaran secara real-time demi akuntabilitas publik.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Printer className="w-4 h-4 mr-2"/> Cetak Laporan</Button>
                        <Button><Download className="w-4 h-4 mr-2"/> Open Data (CSV)</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-500" /> Capaian Kinerja Program (KPI)
                        </h4>
                        {POLICY_INDICATORS.map(ind => (
                            <div key={ind.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 flex justify-between items-center shadow-sm">
                                <div>
                                    <p className="text-xs text-gray-500">{ind.category}</p>
                                    <h5 className="font-bold text-gray-900 dark:text-white">{ind.name}</h5>
                                </div>
                                <div className="text-right">
                                    <span className={`text-lg font-black ${ind.trend === 'down' ? 'text-primary-600' : 'text-amber-600'}`}>{ind.value}{ind.unit}</span>
                                    <p className="text-[10px] text-gray-400">Target: {ind.target}{ind.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                            <Vote className="w-4 h-4 text-indigo-500" /> Aspirasi & Partisipasi Publik
                        </h4>
                        {PUBLIC_PROPOSALS.slice(0, 2).map(prop => (
                            <div key={prop.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-bold text-gray-900 dark:text-white text-sm">{prop.title}</h5>
                                    <Badge color={prop.status === 'Diterima' ? 'green' : 'yellow'}>{prop.status}</Badge>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{prop.description}</p>
                                <div className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-indigo-600">{prop.votes} Dukungan</span>
                                    <Button variant="ghost" className="p-0 h-auto text-[10px]">Lihat Detail</Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full text-xs">Lihat Semua Aspirasi Masyarakat</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const Policy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sikn' | 'eval' | 'ews' | 'transparency'>('sikn');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-4 border-b border-gray-200 dark:border-slate-800">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-primary-600" />
                Kebijakan & Strategi Nasional
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Sistem Informasi Kesehatan Nasional (SIKN) & Portal Pengambilan Keputusan Berbasis Data.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex overflow-x-auto max-w-full">
            {[
                { id: 'sikn', label: 'SIKN & Analitik', icon:Globe },
                { id: 'eval', label: 'Monitoring & Eval', icon: Target },
                { id: 'ews', label: 'EWS & Respon', icon: ShieldAlert },
                { id: 'transparency', label: 'Transparansi', icon: Eye },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {activeTab === 'sikn' && <SIKNDashboard />}
      {activeTab === 'eval' && <MonitoringEvaluasi />}
      {activeTab === 'ews' && <EWSDecisionHub />}
      {activeTab === 'transparency' && <TransparencyPortal />}

    </div>
  );
};

export default Policy;
