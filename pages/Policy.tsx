
import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../components/UI';
import { 
    Map, FileCheck, AlertTriangle, TrendingUp, TrendingDown, Minus, 
    Activity, Syringe, Building2, Users, FileText, Vote, Sparkles, Sliders,
    Printer, Download, PieChart as PieChartIcon
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    AreaChart, Area, CartesianGrid, LineChart, Line, Legend, PieChart, Pie
} from 'recharts';
import { 
    POLICY_INDICATORS, RESOURCE_DATA, PUBLIC_PROPOSALS, RISK_MAP_DATA, DISEASE_TREND_DATA 
} from '../services/mockData';
import { streamGeminiResponse } from '../services/geminiService';
import { BotMode, PolicyIndicator } from '../types';

// --- Sub-Component: Risk Map (Heatmap Style) ---
const RiskMapVisualization: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 relative overflow-hidden" title="Peta Risiko Kesehatan (Geospasial)">
                <div className="absolute top-6 right-6 z-10 flex gap-2">
                    <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Tinggi</span>
                    <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Sedang</span>
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Rendah</span>
                </div>
                
                {/* Simulated Grid Map */}
                <div className="mt-4 grid grid-cols-3 gap-4 h-96 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    {RISK_MAP_DATA.map((region) => (
                        <div 
                            key={region.id} 
                            className={`
                                relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-[1.02] flex flex-col justify-between
                                ${region.riskLevel === 'High' ? 'bg-red-50 border-red-200 hover:border-red-400' : 
                                  region.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-400' : 
                                  'bg-green-50 border-green-200 hover:border-green-400'}
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-800 text-sm">{region.name}</h4>
                                {region.trend === 'increasing' && <TrendingUp className="w-4 h-4 text-red-500" />}
                                {region.trend === 'decreasing' && <TrendingDown className="w-4 h-4 text-green-500" />}
                                {region.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                            </div>
                            <div className="mt-2">
                                <div className="text-2xl font-bold text-gray-900">{region.cases}</div>
                                <div className="text-xs text-gray-500">Kasus Aktif</div>
                            </div>
                            <div className={`mt-2 text-xs font-bold px-2 py-1 rounded-md w-fit ${
                                region.riskLevel === 'High' ? 'bg-red-200 text-red-800' : 
                                region.riskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                                'bg-green-200 text-green-800'
                            }`}>
                                Risiko: {region.riskLevel}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="space-y-6">
                 {/* Early Warning System */}
                 <Card className="bg-red-50 border-red-200">
                    <div className="flex items-center gap-3 mb-3 text-red-800">
                        <AlertTriangle className="w-6 h-6" />
                        <h3 className="font-bold">Peringatan Dini (EWS)</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                            <h5 className="font-bold text-red-700 text-sm">Lonjakan DBD (+15%)</h5>
                            <p className="text-xs text-gray-600 mt-1">Terdeteksi di Kel. Melati Indah & Kamboja Putih dalam 3 hari terakhir.</p>
                            <Button className="mt-2 w-full py-1 text-xs bg-red-600 hover:bg-red-700 border-none">Kerahkan Jumantik</Button>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                            <h5 className="font-bold text-orange-700 text-sm">Waspada ISPA</h5>
                            <p className="text-xs text-gray-600 mt-1">Kualitas udara memburuk (PM 2.5 tinggi). Himbau penggunaan masker.</p>
                        </div>
                    </div>
                 </Card>

                 <Card title="Statistik Risiko">
                    <div className="h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={RISK_MAP_DATA}>
                                <XAxis dataKey="name" hide />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="cases" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </Card>
            </div>
        </div>
    );
};

// --- Sub-Component: Policy Simulator (AI) ---
const AI_PolicySimulator: React.FC = () => {
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
            "Analisis dampak perubahan parameter ini terhadap penurunan stunting dan penyakit menular dalam 1 tahun ke depan.",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Kontrol Parameter Kebijakan" className="h-full">
                <div className="space-y-8 mt-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Building2 className="w-4 h-4" /> Anggaran Infrastruktur
                            </label>
                            <span className="text-sm font-bold text-primary-600">+{budget}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={budget} onChange={e => setBudget(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Users className="w-4 h-4" /> Penambahan Nakes
                            </label>
                            <span className="text-sm font-bold text-primary-600">+{staff}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={staff} onChange={e => setStaff(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Syringe className="w-4 h-4" /> Program Preventif (Imunisasi)
                            </label>
                            <span className="text-sm font-bold text-primary-600">+{prevention}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={prevention} onChange={e => setPrevention(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                    </div>

                    <Button onClick={runSimulation} className="w-full flex items-center justify-center gap-2" disabled={loading}>
                        <Sparkles className="w-4 h-4" />
                        {loading ? 'Mengkalkulasi...' : 'Simulasikan Dampak'}
                    </Button>
                </div>
            </Card>

            <Card className="bg-slate-900 text-white border-none flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-lg">Hasil Prediksi AI</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2">
                    {prediction ? (
                         <div className="prose prose-invert prose-sm max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: prediction.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-300">$1</strong>') }} />
                         </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                            <Sliders className="w-16 h-16 mb-4" />
                            <p className="text-center">Atur parameter di samping dan klik "Simulasikan Dampak"<br/>untuk melihat prediksi masa depan.</p>
                        </div>
                    )}
                </div>
                
                {prediction && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="h-32 w-full">
                             {/* Mock Projection Chart */}
                             <p className="text-xs text-slate-400 mb-2 text-center">Proyeksi Penurunan Kasus (Simulasi 2025)</p>
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    {name: '2024', val: 100}, {name: 'Q1 2025', val: 95}, 
                                    {name: 'Q2 2025', val: 90 - (prevention/10)}, {name: 'Q3 2025', val: 85 - (prevention/8)}, 
                                    {name: 'Q4 2025', val: 80 - (prevention/5)}
                                ]}>
                                    <Area type="monotone" dataKey="val" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

// --- Sub-Component: Resource & Reports ---
const ResourceDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {POLICY_INDICATORS.map((ind) => (
                     <Card key={ind.id} className="p-4 border-l-4 border-l-primary-500">
                         <div className="text-xs text-gray-500 font-bold uppercase">{ind.category}</div>
                         <div className="text-2xl font-bold text-gray-900 my-1">{ind.value}{ind.unit}</div>
                         <div className="flex justify-between items-center text-xs">
                             <span className="text-gray-500">Target: {ind.target}{ind.unit}</span>
                             <span className={ind.trend === 'up' ? 'text-green-600' : 'text-red-600'} >
                                 {ind.trend === 'up' ? '▲' : '▼'} Trend
                             </span>
                         </div>
                     </Card>
                 ))}
            </div>

            <Card title="Analisis Beban Fasilitas Kesehatan">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="p-4">Fasilitas Kesehatan</th>
                                <th className="p-4">BOR (Bed Occupancy)</th>
                                <th className="p-4">Ketersediaan Obat</th>
                                <th className="p-4">Rasio Nakes</th>
                                <th className="p-4">Kunjungan/Hari</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {RESOURCE_DATA.map((res, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-800">{res.facility}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${res.bedOccupancyRate > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${res.bedOccupancyRate}%`}}></div>
                                            </div>
                                            <span className={res.bedOccupancyRate > 80 ? 'text-red-600 font-bold' : 'text-gray-600'}>{res.bedOccupancyRate}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{res.medicineAvailability}%</td>
                                    <td className="p-4 text-gray-600">1:{res.staffRatio}</td>
                                    <td className="p-4 text-gray-600">{res.dailyVisits} Pasien</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card title="Laporan Berkala (PDF)" className="flex flex-col">
                      <div className="flex-1 space-y-3 mt-2">
                          {['Laporan Bulanan Januari 2025', 'Executive Summary Q4 2024', 'Laporan Surveilans Mingguan W2 2025'].map((item,i) => (
                              <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <FileText className="w-5 h-5 text-red-500" />
                                      <span className="text-sm font-medium text-gray-700">{item}</span>
                                  </div>
                                  <Button variant="ghost" className="p-1"><Download className="w-4 h-4" /></Button>
                              </div>
                          ))}
                      </div>
                      <Button className="mt-4 w-full" variant="outline"><Printer className="w-4 h-4 mr-2" /> Cetak Semua Laporan</Button>
                 </Card>
                 <Card title="Distribusi Prioritas Anggaran 2025" className="flex items-center justify-center">
                      <div className="h-56 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie dataKey="value" data={[{name:'Infrastruktur', value:40}, {name:'Obat', value:30}, {name:'Promosi', value:20}, {name:'Lainnya', value:10}]} cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#8884d8">
                                        {[ '#3b82f6', '#10b981', '#f59e0b', '#94a3b8'].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                           </ResponsiveContainer>
                      </div>
                 </Card>
            </div>
        </div>
    );
};

// --- Sub-Component: Public Participation ---
const PublicAspirations: React.FC = () => {
    return (
        <div className="space-y-6">
             <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                 <div>
                     <h3 className="text-lg font-bold text-indigo-900">Suara Anda, Kebijakan Kami</h3>
                     <p className="text-indigo-700 text-sm">Ajukan usulan perbaikan layanan kesehatan di wilayah Anda. Usulan dengan dukungan terbanyak akan diprioritaskan.</p>
                 </div>
                 <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700">+ Buat Usulan Baru</Button>
             </div>

             <div className="grid grid-cols-1 gap-4">
                 {PUBLIC_PROPOSALS.map((prop) => (
                     <Card key={prop.id} className="hover:border-primary-300 transition-all">
                         <div className="flex justify-between items-start">
                             <div className="flex gap-4">
                                 <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 w-16 h-16 shrink-0">
                                     <Vote className="w-6 h-6 text-gray-500 mb-1" />
                                     <span className="font-bold text-lg text-gray-800">{prop.votes}</span>
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-2 mb-1">
                                         <Badge color="blue">{prop.category}</Badge>
                                         <span className="text-xs text-gray-400">Oleh {prop.author}</span>
                                     </div>
                                     <h4 className="font-bold text-gray-900 text-lg">{prop.title}</h4>
                                     <p className="text-gray-600 text-sm mt-1">{prop.description}</p>
                                     <div className="mt-3">
                                         <Badge color={prop.status === 'Diterima' ? 'green' : prop.status === 'Ditolak' ? 'red' : 'yellow'}>
                                             Status: {prop.status}
                                         </Badge>
                                     </div>
                                 </div>
                             </div>
                             <Button variant="outline" className="text-xs">Dukung</Button>
                         </div>
                     </Card>
                 ))}
             </div>
        </div>
    );
};

const Policy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'risk' | 'resources' | 'simulation' | 'public'>('risk');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-4 border-b border-gray-200">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-primary-600" />
                Dashboard Kebijakan & Strategi
            </h2>
            <p className="text-gray-500 text-sm mt-1">Sistem pendukung keputusan berbasis data (Evidence-Based Policy) untuk kesehatan masyarakat.</p>
        </div>
        <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex overflow-x-auto max-w-full">
            {[
                { id: 'risk', label: 'Peta Risiko', icon: Map },
                { id: 'resources', label: 'Sumber Daya', icon: Building2 },
                { id: 'simulation', label: 'Simulasi AI', icon: Sparkles },
                { id: 'public', label: 'Aspirasi', icon: Users },
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

      {activeTab === 'risk' && <RiskMapVisualization />}
      {activeTab === 'resources' && <ResourceDashboard />}
      {activeTab === 'simulation' && <AI_PolicySimulator />}
      {activeTab === 'public' && <PublicAspirations />}

    </div>
  );
};

export default Policy;
