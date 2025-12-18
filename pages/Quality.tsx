
import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/UI';
import { 
    COMPLAINTS, AUDIT_RESULTS, QUALITY_INDICATORS_FULL, SAFETY_INCIDENTS, 
    QI_PROJECTS, STAFF_PERFORMANCE_DATA, ACCREDITATION_STATUS 
} from '../services/mockData';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Cell, PieChart, Pie, Legend,
    AreaChart, Area
} from 'recharts';
import { 
    Star, MessageSquareWarning, CheckCircle, ShieldCheck, Activity, 
    FileText, Siren, TrendingUp, Sparkles, AlertTriangle, ArrowRight,
    Users, Gauge, ClipboardCheck, Award, Zap, History, Search, Filter,
    PlusCircle, Info, Stethoscope, BarChart3, HeartPulse, Map
} from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode } from '../types';

// --- Sub-Component: Hospital Quality Dashboard ---
const HospitalQualityDashboard = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUALITY_INDICATORS_FULL.map(kqi => (
                <Card key={kqi.id} className={`p-4 border-l-4 transition-all hover:shadow-md ${kqi.status === 'optimal' ? 'border-l-green-500' : kqi.status === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kqi.id}</span>
                        {kqi.status === 'optimal' ? <CheckCircle className="w-4 h-4 text-green-500"/> : <AlertTriangle className="w-4 h-4 text-yellow-500"/>}
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-slate-100 text-sm h-10 mb-2">{kqi.name}</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">{kqi.value}</span>
                        <span className="text-[10px] text-gray-500 mb-1 font-bold">{kqi.unit}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-50 dark:border-slate-700 flex justify-between items-center text-[10px]">
                        <span className="text-gray-500">Target: <span className="font-bold">{kqi.target}</span></span>
                        <span className={`font-black flex items-center gap-1 ${kqi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {kqi.trend === 'up' ? <TrendingUp className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
                            {kqi.trend.toUpperCase()}
                        </span>
                    </div>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Visualisasi Dashboard Mutu Layanan" className="lg:col-span-2">
                <div className="h-72 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={QUALITY_INDICATORS_FULL[0].history}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis dataKey="period" tick={{fontSize: 10}} />
                            <YAxis tick={{fontSize: 10}} />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36}/>
                            <Line type="monotone" name="Waktu Tunggu (Min)" dataKey="value" stroke="#3b82f6" strokeWidth={4} dot={{r: 4}} />
                            {/* Overlay target line */}
                            <Line type="step" name="Target Nasional" dataKey={() => 60} stroke="#ef4444" strokeDasharray="5 5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card title="Tingkat Infeksi RS (HAIs)">
                 <div className="h-72 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={QUALITY_INDICATORS_FULL[1].history}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis dataKey="period" tick={{fontSize: 10}} />
                            <YAxis tick={{fontSize: 10}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" name="Infeksi (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    </div>
);

// --- Sub-Component: Medical Audit Dashboard ---
const MedicalAuditDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        <Card title="Radar Kepatuhan Standar Klinis (Audit Medis)">
            <p className="text-xs text-gray-500 mb-6">Menganalisis kesesuaian diagnosis dan terapi terhadap Standar Pelayanan Kedokteran.</p>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={AUDIT_RESULTS}>
                        <PolarGrid strokeOpacity={0.2} />
                        <PolarAngleAxis dataKey="category" tick={{fontSize: 10, fill: '#64748b'}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 8}} />
                        <Radar name="Kepatuhan (%)" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <div className="space-y-4">
             <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-gray-800 dark:text-white text-sm">Temuan Audit Medis</h3>
                 <Badge color="blue">Maret 2025</Badge>
             </div>
             {AUDIT_RESULTS.map(audit => (
                 <div key={audit.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between transition-all hover:bg-gray-50 dark:hover:bg-slate-800/80">
                     <div className="flex-1">
                         <h4 className="font-bold text-gray-800 dark:text-white text-sm">{audit.category}</h4>
                         <ul className="mt-1 space-y-1">
                            {audit.findings.map((f, i) => (
                                <li key={i} className="text-[10px] text-gray-500 flex items-start gap-1">
                                    <span className="text-red-500">•</span> {f}
                                </li>
                            ))}
                         </ul>
                     </div>
                     <div className="flex flex-col items-end ml-4">
                         <span className={`text-2xl font-black ${audit.score >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{audit.score}%</span>
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Target: {audit.target}%</span>
                     </div>
                 </div>
             ))}
             <Button className="w-full bg-slate-900 dark:bg-emerald-600" variant="secondary">
                <Search className="w-4 h-4 mr-2" /> Jalankan Audit Baru (Audit Clinical Pathway)
             </Button>
        </div>
    </div>
);

// --- Sub-Component: Patient Safety System ---
const PatientSafetySystem = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2" title="Dashboard Insiden Keselamatan Pasien">
                <div className="h-64 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            {type: 'KNC', count: 12, label: 'Kejadian Nyaris Cedera'}, 
                            {type: 'KTC', count: 5, label: 'Kejadian Tidak Cedera'}, 
                            {type: 'KTD', count: 2, label: 'Kejadian Tidak Diinginkan'}, 
                            {type: 'Sentinel', count: 0, label: 'Sentinel'}
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis dataKey="type" tick={{fontSize: 12, fontWeight: 'bold'}} />
                            <YAxis allowDecimals={false} tick={{fontSize: 10}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
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
                <div className="flex flex-wrap justify-center gap-6 mt-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
                    <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> KNC</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> KTC</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> KTD</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold"><div className="w-3 h-3 bg-red-900 rounded-sm"></div> SENTINEL</div>
                </div>
            </Card>

            <div className="space-y-4">
                <Button className="w-full py-4 text-sm bg-red-600 hover:bg-red-700 shadow-red-600/20" variant="primary">
                    <Siren className="w-5 h-5 mr-2 animate-pulse" /> Lapor Insiden Baru (Rahasia)
                </Button>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">Laporan Terbaru (Closed-Loop)</h3>
                {SAFETY_INCIDENTS.map(inc => (
                    <Card key={inc.id} className="border-l-4 border-l-red-500 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-black text-red-600 text-[10px] bg-red-50 px-2 py-0.5 rounded">{inc.type}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{inc.date}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-800 dark:text-slate-100 mt-2 line-clamp-2">{inc.description}</p>
                        <div className="mt-3 text-[10px] text-gray-500 flex justify-between items-center">
                            <span className="flex items-center gap-1"><Map className="w-2.5 h-2.5"/> {inc.location}</span>
                            <Badge color={inc.status === 'Closed' ? 'green' : 'yellow'}>{inc.status}</Badge>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

// --- Sub-Component: Staff Performance Monitoring ---
const StaffPerformanceMonitoring = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100">
                <p className="text-[10px] uppercase font-bold text-indigo-600 mb-1">Produktivitas Staf</p>
                <h4 className="text-2xl font-black text-indigo-800 dark:text-indigo-300">92.4%</h4>
                <p className="text-[10px] text-indigo-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Di atas target (85%)</p>
            </Card>
            <Card className="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100">
                <p className="text-[10px] uppercase font-bold text-emerald-600 mb-1">Kepatuhan SOP</p>
                <h4 className="text-2xl font-black text-emerald-800 dark:text-indigo-300">88.2%</h4>
                <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">Optimalisasi diperlukan</p>
            </Card>
            <Card className="bg-blue-50 dark:bg-blue-500/10 border-blue-100">
                <p className="text-[10px] uppercase font-bold text-blue-600 mb-1">Ketepatan Waktu</p>
                <h4 className="text-2xl font-black text-blue-800 dark:text-blue-300">95.0%</h4>
                <p className="text-[10px] text-blue-600 mt-1 flex items-center gap-1">Disiplin sangat baik</p>
            </Card>
            <Card className="bg-amber-50 dark:bg-amber-500/10 border-amber-100">
                <p className="text-[10px] uppercase font-bold text-amber-600 mb-1">Rating Pasien</p>
                <h4 className="text-2xl font-black text-amber-800 dark:text-amber-300">4.7<span className="text-sm">/5.0</span></h4>
                <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 border-none"/> Sangat Puas</p>
            </Card>
        </div>

        <Card title="Monitoring Kinerja Staf Medis (Detail)">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-100 dark:border-slate-700">
                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <th className="pb-4 pt-2 px-2 text-center">Tenaga Medis</th>
                            <th className="pb-4 pt-2">Produktivitas</th>
                            <th className="pb-4 pt-2">Punctuality</th>
                            <th className="pb-4 pt-2">Kepatuhan SOP</th>
                            <th className="pb-4 pt-2">Rating Pasien</th>
                            <th className="pb-4 pt-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                        {STAFF_PERFORMANCE_DATA.map((staff, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center font-bold text-primary-600 dark:text-primary-300 text-xs">
                                            {staff.name.split(' ')[1][0]}
                                        </div>
                                        <span className="text-xs font-bold text-gray-800 dark:text-white">{staff.name}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-gray-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{width: `${staff.productivity}%`}}></div>
                                        </div>
                                        <span className="text-[10px] font-bold">{staff.productivity}%</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-gray-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full" style={{width: `${staff.punctuality}%`}}></div>
                                        </div>
                                        <span className="text-[10px] font-bold">{staff.punctuality}%</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-gray-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-indigo-500 h-full" style={{width: `${staff.sop_compliance}%`}}></div>
                                        </div>
                                        <span className="text-[10px] font-bold">{staff.sop_compliance}%</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                                        <Star className="w-3 h-3 fill-current"/> {staff.patient_rating}
                                    </div>
                                </td>
                                <td className="py-4 text-right">
                                    <Badge color={staff.productivity >= 90 ? 'green' : 'yellow'}>Excellent</Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

// --- Sub-Component: Patient Satisfaction Tab ---
const PatientSatisfactionAnalysis = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Analisis Kepuasan Pasien (NPS Trend)">
                <div className="h-64 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={QUALITY_INDICATORS_FULL[3].history}>
                             <defs>
                                <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" name="Skor NPS" stroke="#8b5cf6" fill="url(#colorSat)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Suara Pelanggan Terbaru">
                <div className="space-y-4">
                    {COMPLAINTS.map(c => (
                        <div key={c.id} className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
                             <div className="flex justify-between items-start mb-1">
                                <h5 className="font-bold text-gray-800 dark:text-white text-xs">{c.service}</h5>
                                <div className="flex text-amber-400">
                                    {Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < c.rating ? 'fill-current' : 'text-gray-300'}`}/>)}
                                </div>
                             </div>
                             <p className="text-[10px] text-gray-500 dark:text-slate-400 line-clamp-2 italic">"{c.description}"</p>
                             <div className="mt-2 flex justify-between items-center">
                                 <span className="text-[9px] text-gray-400 font-medium">{c.date}</span>
                                 <Badge color={c.status === 'Resolved' ? 'green' : 'yellow'}>{c.status}</Badge>
                             </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full text-xs">
                        <BarChart3 className="w-3 h-3 mr-2" /> Lihat Laporan Analitik Kuesioner Digital
                    </Button>
                </div>
            </Card>
        </div>
    </div>
);

// --- Sub-Component: Accreditation Hub ---
const AccreditationHub = () => (
    <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-6 items-center bg-indigo-900 text-white p-8 rounded-2xl shadow-xl shadow-indigo-900/20 overflow-hidden relative">
            <div className="relative z-10 flex-1">
                <Badge color="yellow" className="mb-4">PARIPURNA GOAL</Badge>
                <h3 className="text-3xl font-black mb-2">Simulasi Kesiapan Akreditasi</h3>
                <p className="text-indigo-100 text-sm max-w-lg">Integrasi otomatis data mutu dan dokumen Starkes/JCI untuk mempermudah verifikasi dan penilaian akreditasi nasional.</p>
                <div className="mt-6 flex gap-3">
                    <Button className="bg-white text-indigo-900 border-none px-6">Buka Dokumen Akreditasi</Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">Unduh Self-Assessment</Button>
                </div>
            </div>
            <div className="relative z-10 w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">89%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Ready</span>
                </div>
            </div>
            <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCREDITATION_STATUS.map((acc, i) => (
                <Card key={i} className="hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <Badge color={acc.status === 'Ready' ? 'green' : 'yellow'}>{acc.status}</Badge>
                        <FileText className="w-4 h-4 text-gray-300" />
                    </div>
                    <h5 className="text-xs font-bold text-gray-800 dark:text-white leading-relaxed mb-4">{acc.chapter}</h5>
                    <div className="flex items-end justify-between">
                        <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full ${acc.score >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${acc.score}%`}}></div>
                            </div>
                        </div>
                        <span className="text-sm font-black text-gray-900 dark:text-white">{acc.score}%</span>
                    </div>
                </Card>
            ))}
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
            audit: AUDIT_RESULTS,
            staff: STAFF_PERFORMANCE_DATA,
            satisfaction: COMPLAINTS,
            accreditation: ACCREDITATION_STATUS
        });

        let fullText = '';
        // Using gemini-3-pro-preview for high-quality clinical and management reasoning.
        await streamGeminiResponse(
            "Anda adalah Konsultan Penjaminan Mutu RS. Analisis seluruh data mutu terlampir (KQI, Safety, Audit, Staf, Kepuasan, Akreditasi). Identifikasi akar masalah (RCA), area kritis, dan berikan rencana aksi perbaikan berbasis metode PDSA (Plan-Do-Study-Act) yang konkret dan terukur.",
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
             <Card className="md:col-span-1 bg-gradient-to-br from-indigo-900 to-primary-900 text-white border-none shadow-xl relative overflow-hidden">
                 <div className="relative z-10 p-2">
                     <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                         <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                     </div>
                     <h3 className="text-2xl font-black mb-3">AI Quality Advisor</h3>
                     <p className="text-indigo-200 text-sm mb-8 leading-relaxed">Analisis performa mutu medik secara mendalam menggunakan Gemini 3 Pro. Dapatkan Root Cause Analysis dan Rencana Aksi PDSA instan.</p>
                     
                     <Button 
                        onClick={runAnalysis} 
                        disabled={loading}
                        className="w-full bg-white text-indigo-900 hover:bg-indigo-50 border-none py-3 font-bold text-sm shadow-lg shadow-white/10"
                    >
                        {loading ? 'Processing PDSA Model...' : 'Mulai Analisis Mutu Medik'}
                    </Button>
                 </div>
                 <Zap className="absolute -right-12 -top-12 w-48 h-48 text-white/5" />
             </Card>

             <Card className="md:col-span-2 min-h-[400px]" title="Laporan Rekomendasi PDSA & RCA">
                 {analysis ? (
                     <div className="prose prose-sm max-w-none prose-indigo dark:prose-invert">
                         <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-600 dark:text-indigo-400">$1</strong>') }} />
                     </div>
                 ) : (
                     <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
                         <Activity className="w-16 h-16 mb-4 opacity-10 animate-pulse" />
                         <p className="text-sm font-medium">Klik tombol "Mulai Analisis" untuk memproses data performa layanan.</p>
                     </div>
                 )}
             </Card>
        </div>
    );
};

const Quality: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kqi' | 'audit' | 'safety' | 'staff' | 'satisfaction' | 'accreditation' | 'advisor'>('kqi');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-emerald-400" />
                Informatika Penjaminan Mutu & Keselamatan
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Platform monitoring indikator mutu RS/Puskesmas berbasis data objektif dan analisis AI.</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-x-auto max-w-full">
            {[
                { id: 'kqi', label: 'Indikator Mutu', icon: Activity },
                { id: 'audit', label: 'Audit Medis', icon: Stethoscope },
                { id: 'safety', label: 'Keselamatan', icon: Siren },
                { id: 'staff', label: 'Kinerja Staf', icon: Users },
                { id: 'satisfaction', label: 'Kepuasan', icon: HeartPulse },
                { id: 'accreditation', label: 'Akreditasi', icon: Award },
                { id: 'advisor', label: 'AI Advisor', icon: Sparkles },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'kqi' && <HospitalQualityDashboard />}
      {activeTab === 'audit' && <MedicalAuditDashboard />}
      {activeTab === 'safety' && <PatientSafetySystem />}
      {activeTab === 'staff' && <StaffPerformanceMonitoring />}
      {activeTab === 'satisfaction' && <PatientSatisfactionAnalysis />}
      {activeTab === 'accreditation' && <AccreditationHub />}
      {activeTab === 'advisor' && <AI_QualityAdvisor />}
      
    </div>
  );
};

export default Quality;
