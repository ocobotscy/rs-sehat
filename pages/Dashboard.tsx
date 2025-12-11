import React from 'react';
import { Card, Button, Badge } from '../components/UI';
import { ArrowUpRight, ArrowDownRight, Activity, Users, FileText, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DISEASE_TREND_DATA } from '../services/mockData';

const StatBox: React.FC<{ title: string; value: string; trend: string; isUp: boolean; icon: React.ElementType }> = ({ title, value, trend, isUp, icon: Icon }) => (
  <Card className="flex items-center p-4">
    <div className={`p-3 rounded-full mr-4 ${isUp ? 'bg-primary-50 dark:bg-emerald-500/10 text-primary-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h4>
      <div className={`flex items-center text-xs mt-1 ${isUp ? 'text-green-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
        {isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {trend} dari bulan lalu
      </div>
    </div>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-gray-100 dark:border-slate-700 rounded-lg shadow-lg">
        <p className="text-sm font-bold text-gray-800 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox title="Skor Kesehatan" value="85/100" trend="+2.5%" isUp={true} icon={Activity} />
        <StatBox title="Partisipasi Survei" value="12" trend="+4" isUp={true} icon={FileText} />
        <StatBox title="Poin Edukasi" value="1,250" trend="+150" isUp={true} icon={Star} />
        <StatBox title="Laporan Wilayah" value="34" trend="-5%" isUp={false} icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2" title="Tren Kesehatan Wilayah Anda">
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DISEASE_TREND_DATA}>
                <defs>
                  <linearGradient id="colorISPA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ISPA" stroke="#10b981" fillOpacity={1} fill="url(#colorISPA)" strokeWidth={2} />
                <Area type="monotone" dataKey="Diabetes" stroke="#6366f1" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Aktivitas Terbaru" className="lg:col-span-1">
          <div className="space-y-6 mt-4">
            {[
              { text: 'Menyelesaikan kursus "Gizi Seimbang"', time: '2 jam lalu', type: 'edu' },
              { text: 'Mengisi survei "Kesehatan Lingkungan"', time: '1 hari lalu', type: 'survey' },
              { text: 'Laporan keluhan #C002 diselesaikan', time: '2 hari lalu', type: 'report' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="flex-col items-center hidden sm:flex">
                  <div className="w-2 h-2 rounded-full bg-primary-300 dark:bg-primary-600 group-hover:bg-primary-500 transition-colors"></div>
                  {idx !== 2 && <div className="w-0.5 h-full bg-gray-100 dark:bg-slate-700 my-1"></div>}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-sm mt-4">Lihat Semua</Button>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-teal-600 dark:to-emerald-700 text-white border-none shadow-lg shadow-emerald-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="text-xl font-bold mb-2">Yuk, Ikuti Survei Kesehatan Nasional!</h3>
                <p className="text-teal-50 dark:text-teal-100 max-w-xl">Data Anda membantu pemerintah menentukan kebijakan kesehatan yang lebih tepat sasaran untuk tahun 2025.</p>
            </div>
            <Button className="bg-white text-teal-700 hover:bg-gray-100 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-slate-800 border-none shrink-0 shadow-none">
                Mulai Survei
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;