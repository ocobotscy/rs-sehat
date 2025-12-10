
import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/UI';
import { COMPLAINTS, AUDIT_RESULTS, QUALITY_INDICATORS_FULL, SAFETY_INCIDENTS, QI_PROJECTS } from '../services/mockData';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Cell
} from 'recharts';
import { 
    Star, MessageSquareWarning, CheckCircle, ShieldCheck, Activity, 
    FileText, Siren, TrendingUp, Sparkles, AlertTriangle, ArrowRight
} from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode } from '../types';

// --- Sub-Component: Quality Indicators Tab ---
const KQI_Dashboard = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUALITY_INDICATORS_FULL.map(kqi => (
                <Card key={kqi.id} className={`p-4 border-l-4 ${kqi.status === 'optimal' ? 'border-l-green-500' : kqi.status === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">{kqi.id}</span>
                        {kqi.status === 'optimal' ? <CheckCircle className="w-4 h-4 text-green-500"/> : <AlertTriangle className="w-4 h-4 text-yellow-500"/>}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm h-10 mb-2">{kqi.name}</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-gray-900">{kqi.value}</span>
                        <span className="text-xs text-gray-500 mb-1">{kqi.unit}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-gray-500">Target: {kqi.target}</span>
                        <span className={kqi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                            {kqi.trend === 'up' ? '▲' : '▼'} Trend
                        </span>
                    </div>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Tren Waktu Tunggu (Q1 2025)">
                <div className="h-64 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={QUALITY_INDICATORS_FULL[0].history}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card title="Proyek Peningkatan Mutu (QI)">
                <div className="space-y-4 mt-2">
                    {QI_PROJECTS.map(proj => (
                        <div key={proj.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-sm text-gray-800">{proj.title}</h4>
                                <Badge color={proj.status === 'Completed' ? 'green' : 'blue'}>{proj.status}</Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">Lead: {proj.lead} • Impact: {proj.impact}</p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-primary-500 h-1.5 rounded-full" style={{width: `${proj.progress}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
);

// --- Sub-Component: Patient Safety Tab ---
const Safety_Dashboard = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1" title="Grafik Insiden Keselamatan Pasien">
                <div className="h-64 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            {type: 'KNC', count: 12}, {type: 'KTC', count: 5}, {type: 'KTD', count: 2}, {type: 'Sentinel', count: 0}
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="type" />
                            <YAxis allowDecimals={false} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {[
                                    {type: 'KNC', color: '#f59e0b'}, {type: 'KTC', color: '#3b82f6'}, 
                                    {type: 'KTD', color: '#ef4444'}, {type: 'Sentinel', color: '#7f1d1d'}
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> KNC (Nyaris Cedera)</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> KTC (Tidak Cedera)</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> KTD (Cedera)</div>
                </div>
            </Card>

            <div className="w-full md:w-96 space-y-4">
                <h3 className="font-bold text-gray-800">Laporan Insiden Terbaru</h3>
                {SAFETY_INCIDENTS.map(inc => (
                    <Card key={inc.id} className="border-l-4 border-l-red-500">
                        <div className="flex justify-between items-start">
                            <span className="font-bold text-red-600 text-xs bg-red-50 px-2 py-1 rounded">{inc.type}</span>
                            <span className="text-xs text-gray-400">{inc.date}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-2">{inc.description}</p>
                        <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                            <span>Lokasi: {inc.location}</span>
                            <Badge color="yellow">{inc.status}</Badge>
                        </div>
                    </Card>
                ))}
                <Button variant="outline" className="w-full text-sm">Lapor Insiden Baru (RCA)</Button>
            </div>
        </div>
    </div>
);

// --- Sub-Component: Audit Tab ---
const Audit_Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        <Card title="Peta Kepatuhan Standar (Radar Audit)">
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={AUDIT_RESULTS}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" tick={{fontSize: 10}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Skor Audit" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <div className="space-y-4">
             {AUDIT_RESULTS.map(audit => (
                 <div key={audit.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                     <div>
                         <h4 className="font-bold text-gray-800 text-sm">{audit.category}</h4>
                         <p className="text-xs text-gray-500 mt-1">Temuan: {audit.findings[0]}</p>
                     </div>
                     <div className="flex flex-col items-end">
                         <span className={`text-xl font-bold ${audit.score >= 90 ? 'text-green-600' : 'text-red-600'}`}>{audit.score}%</span>
                         <span className="text-[10px] text-gray-400">Target: {audit.target}%</span>
                     </div>
                 </div>
             ))}
             <Button className="w-full" variant="secondary">Jadwalkan Audit Internal</Button>
        </div>
    </div>
);

// --- Sub-Component: AI Quality Advisor ---
const AI_QualityAdvisor = () => {
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);

    const runAnalysis = async () => {
        setLoading(true);
        const dataContext = JSON.stringify({
            kqi: QUALITY_INDICATORS_FULL,
            safety: SAFETY_INCIDENTS,
            audit: AUDIT_RESULTS
        });

        let fullText = '';
        await streamGeminiResponse(
            "Berikan analisis performa mutu rumah sakit bulan ini. Identifikasi area kritis dan berikan 3 rekomendasi perbaikan konkret.",
            BotMode.QUALITY_ADVISOR,
            (chunk) => {
                fullText += chunk;
                setAnalysis(fullText);
            },
            dataContext
        );
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
             <Card className="md:col-span-1 bg-gradient-to-br from-indigo-900 to-primary-900 text-white border-none">
                 <div className="p-2">
                     <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                         <Sparkles className="w-6 h-6 text-yellow-300" />
                     </div>
                     <h3 className="text-xl font-bold mb-2">AI Quality Advisor</h3>
                     <p className="text-indigo-200 text-sm mb-6">Dapatkan analisis mendalam tentang performa mutu layanan Anda secara otomatis.</p>
                     
                     <Button 
                        onClick={runAnalysis} 
                        disabled={loading}
                        className="w-full bg-white text-indigo-900 hover:bg-indigo-50 border-none"
                    >
                        {loading ? 'Menganalisis...' : 'Analisis Data Mutu'}
                    </Button>
                 </div>
             </Card>

             <Card className="md:col-span-2 min-h-[300px]" title="Laporan Analisis Otomatis">
                 {analysis ? (
                     <div className="prose prose-sm max-w-none prose-indigo">
                         <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     </div>
                 ) : (
                     <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                         <Activity className="w-12 h-12 mb-2 opacity-20" />
                         <p>Belum ada analisis. Klik tombol disamping.</p>
                     </div>
                 )}
             </Card>
        </div>
    );
};

const Quality: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kqi' | 'safety' | 'audit' | 'complaints' | 'advisor'>('kqi');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary-600" />
                Penjaminan Mutu & Keselamatan
            </h2>
            <p className="text-gray-500 text-sm mt-1">Platform monitoring indikator mutu RS/Puskesmas (Continuous Quality Improvement).</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto max-w-full">
            {[
                { id: 'kqi', label: 'Indikator Mutu', icon: Activity },
                { id: 'safety', label: 'Keselamatan Pasien', icon: Siren },
                { id: 'audit', label: 'Audit & Kepatuhan', icon: FileText },
                { id: 'complaints', label: 'Keluhan', icon: MessageSquareWarning },
                { id: 'advisor', label: 'AI Advisor', icon: Sparkles },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-primary-100 text-primary-700 shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'kqi' && <KQI_Dashboard />}
      {activeTab === 'safety' && <Safety_Dashboard />}
      {activeTab === 'audit' && <Audit_Dashboard />}
      {activeTab === 'advisor' && <AI_QualityAdvisor />}
      
      {/* Complaints Tab (Kept mostly original but restyled) */}
      {activeTab === 'complaints' && (
        <div className="animate-fade-in-up space-y-6">
             <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <div>
                    <h3 className="font-bold text-yellow-800">Suara Pelanggan</h3>
                    <p className="text-sm text-yellow-700">Keluhan yang ditangani dengan baik meningkatkan loyalitas pasien.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>+ Catat Keluhan</Button>
            </div>

            {showForm && (
                <Card className="animate-fade-in-down border-primary-200 ring-4 ring-primary-50">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold">Formulir Keluhan Pelayanan</h3>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><span className="text-2xl">&times;</span></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Lokasi Layanan" placeholder="Contoh: Puskesmas Melati" />
                        <Input label="Tanggal Kejadian" type="date" />
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Keluhan</label>
                            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 outline-none h-32" placeholder="Ceritakan detail..."></textarea>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button>Simpan Laporan</Button>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COMPLAINTS.map((c) => (
                    <Card key={c.id}>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-800">{c.service}</h4>
                            <Badge color={c.status === 'Resolved' ? 'green' : c.status === 'Pending' ? 'yellow' : 'blue'}>
                                {c.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-2">
                            <span>{c.date}</span>
                            <div className="flex items-center gap-1">
                                {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < c.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Quality;
