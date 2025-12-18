import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { COURSES, CATEGORIES } from '../services/mockData';
import { Course, QuizQuestion, BotMode } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { 
  PlayCircle, Clock, Award, BookOpen, ChevronLeft, 
  HeartPulse, Apple, Ambulance, Brain, Leaf, Baby, 
  Biohazard, Activity, Accessibility, Sun, Moon, 
  Bookmark, Share2, Sparkles, CheckCircle, XCircle, ArrowRight,
  Download, Printer, Link as LinkIcon, Facebook, Twitter, MessageCircle,
  LayoutGrid, UserPlus, Stethoscope, FlaskConical, Pill, Receipt, HelpCircle
} from 'lucide-react';

// --- Icon Mapping Helper ---
const IconMap: Record<string, React.ElementType> = {
  HeartPulse, Apple, Ambulance, Brain, Leaf, Baby, Biohazard, Activity, Accessibility, Sun, LayoutGrid
};

// --- Sub-Component: SIMRS Workflow Map ---
const SIMRSWorkflowMap: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    const workflowSteps = [
        { 
            title: 'Pendaftaran', 
            icon: UserPlus, 
            color: 'text-blue-500', 
            bg: 'bg-blue-500/10',
            desc: 'Pasien melakukan registrasi identitas, verifikasi asuransi (BPJS/Umum), dan memilih poli tujuan.',
            aiTip: 'Gunakan aplikasi mobile untuk pendaftaran online agar tidak perlu mengantri di loket.'
        },
        { 
            title: 'Triase & Asesmen', 
            icon: Activity, 
            color: 'text-red-500', 
            bg: 'bg-red-500/10',
            desc: 'Perawat melakukan pengecekan tanda vital (tensi, suhu) dan menentukan tingkat kegawatdaruratan.',
            aiTip: 'Pasien gawat darurat (Merah) akan didahulukan daripada pasien rutin (Hijau).'
        },
        { 
            title: 'Pemeriksaan Dokter', 
            icon: Stethoscope, 
            color: 'text-emerald-500', 
            bg: 'bg-emerald-500/10',
            desc: 'Dokter melakukan anamnesa, pemeriksaan fisik, dan menentukan diagnosis atau tindakan selanjutnya.',
            aiTip: 'Jangan ragu bertanya secara detail mengenai hasil diagnosis dokter.'
        },
        { 
            title: 'Penunjang Medis', 
            icon: FlaskConical, 
            color: 'text-purple-500', 
            bg: 'bg-purple-500/10',
            desc: 'Jika diperlukan, pasien akan diarahkan ke Laboratorium atau Radiologi untuk mendukung diagnosis.',
            aiTip: 'Beberapa hasil laboratorium memerlukan waktu proses 1-2 jam tergantung kerumitan tes.'
        },
        { 
            title: 'Farmasi & Billing', 
            icon: Pill, 
            color: 'text-amber-500', 
            bg: 'bg-amber-500/10',
            desc: 'Pasien menebus resep obat dan menyelesaikan administrasi pembayaran atau klaim asuransi.',
            aiTip: 'Pastikan nama pada etiket obat sesuai dengan nama Anda sebelum meninggalkan apotek.'
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <LayoutGrid className="w-64 h-64" />
                </div>
                
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    Visualisasi Alur Kerja RS (SIMRS)
                </h3>

                {/* Progress Line */}
                <div className="relative flex justify-between items-center mb-12 px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 -translate-y-1/2 z-0 transition-all duration-700 ease-out"
                        style={{ width: `${(activeStep / (workflowSteps.length - 1)) * 100}%` }}
                    ></div>
                    
                    {workflowSteps.map((step, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                                activeStep === idx 
                                    ? `bg-white dark:bg-slate-900 border-indigo-500 shadow-xl scale-110` 
                                    : activeStep > idx ? `bg-white dark:bg-slate-900 border-emerald-500` : `bg-gray-50 dark:bg-slate-800 border-transparent`
                            }`}
                        >
                            <step.icon className={`w-6 h-6 ${activeStep === idx ? step.color : activeStep > idx ? 'text-emerald-500' : 'text-gray-400'}`} />
                            {activeStep > idx && <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-emerald-500 fill-white dark:fill-slate-900" />}
                        </button>
                    ))}
                </div>

                {/* Step Detail Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 animate-fade-in">
                        <Badge color="blue">Langkah {activeStep + 1}</Badge>
                        <h4 className={`text-3xl font-black ${workflowSteps[activeStep].color}`}>
                            {workflowSteps[activeStep].title}
                        </h4>
                        <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg">
                            {workflowSteps[activeStep].desc}
                        </p>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 relative animate-fade-in-up">
                        <HelpCircle className="absolute -top-4 -right-4 w-12 h-12 text-indigo-200 dark:text-indigo-500/30" />
                        <h5 className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4" /> AI Insight
                        </h5>
                        <p className="text-indigo-600/80 dark:text-indigo-200 text-sm leading-relaxed italic">
                            "{workflowSteps[activeStep].aiTip}"
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-50 dark:border-slate-800">
                    <button 
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="text-gray-400 hover:text-gray-800 dark:hover:text-white disabled:opacity-30 transition-colors font-bold flex items-center gap-2"
                    >
                        <ChevronLeft className="w-5 h-5" /> Sebelumnya
                    </button>
                    <div className="flex gap-2">
                         {workflowSteps.map((_, i) => (
                             <div key={i} className={`w-2 h-2 rounded-full transition-all ${activeStep === i ? 'w-6 bg-indigo-500' : 'bg-gray-200 dark:bg-slate-700'}`}></div>
                         ))}
                    </div>
                    <button 
                        onClick={() => setActiveStep(Math.min(workflowSteps.length - 1, activeStep + 1))}
                        disabled={activeStep === workflowSteps.length - 1}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-30 transition-colors font-bold flex items-center gap-2"
                    >
                        Selanjutnya <ChevronLeft className="w-5 h-5 rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Certificate Modal ---
const CertificateModal: React.FC<{ course: Course; onClose: () => void }> = ({ course, onClose }) => {
    const userName = "Rans Alfred"; 
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const handleDownload = () => {
        alert("Sertifikat sedang diunduh dalam format PDF...");
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white text-gray-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden relative animate-fade-in-up">
                <div className="p-2 h-full bg-white">
                    <div className="h-full border-[10px] border-double border-[#bf9b30] p-8 relative flex flex-col items-center text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#bf9b30]"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#bf9b30]"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#bf9b30]"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#bf9b30]"></div>

                        <div className="mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2 opacity-80">
                                <Activity className="w-8 h-8 text-[#bf9b30]" />
                                <span className="text-sm font-bold tracking-widest uppercase text-gray-500">SIMAS Health System</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#bf9b30] mb-2 tracking-wide">SERTIFIKAT</h1>
                            <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-gray-400">Kelulusan Kompetensi</span>
                        </div>

                        <div className="space-y-6 mb-12 w-full max-w-lg">
                            <p className="text-gray-500 italic">Diberikan sebagai apresiasi kepada:</p>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 border-b-2 border-gray-200 pb-4">{userName}</h2>
                            <p className="text-gray-500">Telah berhasil menyelesaikan materi dan lulus kuis pada topik:</p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#bf9b30]">{course.title}</h3>
                        </div>

                        <div className="flex justify-between w-full max-w-2xl mt-auto pt-8">
                            <div className="text-center">
                                <p className="font-serif text-lg font-bold text-gray-800">{date}</p>
                                <div className="h-0.5 w-32 bg-gray-300 mx-auto my-2"></div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Tanggal</p>
                            </div>
                            <div className="hidden md:block">
                                <Award className="w-20 h-20 text-[#bf9b30] opacity-20" />
                            </div>
                            <div className="text-center">
                                <div className="text-2xl text-gray-800 font-bold italic mb-1">Khoirul Anam</div>
                                <div className="h-0.5 w-32 bg-gray-300 mx-auto my-2"></div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Kepala Program</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
                    <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800 font-medium">Tutup</button>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-xs" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" /> Cetak</Button>
                        <Button className="bg-[#bf9b30] hover:bg-[#a38426] text-white text-xs border-none" onClick={handleDownload}><Download className="w-4 h-4 mr-2" /> Unduh PDF</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: Share Modal ---
const ShareOptions: React.FC<{ title: string; onClose: () => void }> = ({ title, onClose }) => {
    const url = window.location.href;
    const text = `Saya baru saja belajar "${title}" di aplikasi SIMAS. Yuk cek!`;

    const handleShare = (platform: 'wa' | 'twitter' | 'fb' | 'copy') => {
        let shareUrl = '';
        switch(platform) {
            case 'wa': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`; break;
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
            case 'fb': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
            case 'copy': 
                navigator.clipboard.writeText(`${text} ${url}`);
                alert('Tautan berhasil disalin!');
                onClose();
                return;
        }
        window.open(shareUrl, '_blank');
        onClose();
    };

    return (
        <div className="absolute top-16 right-6 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-30 p-2 animate-fade-in-up origin-top-right">
            <div className="text-xs font-bold text-gray-500 dark:text-slate-400 px-3 py-2 uppercase tracking-wider">Bagikan Ke</div>
            <button onClick={() => handleShare('wa')} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-slate-200 rounded-lg transition-colors text-sm font-medium">
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
            </button>
            <button onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-slate-200 rounded-lg transition-colors text-sm font-medium">
                <Twitter className="w-4 h-4 text-blue-400" /> Twitter / X
            </button>
            <button onClick={() => handleShare('fb')} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-slate-200 rounded-lg transition-colors text-sm font-medium">
                <Facebook className="w-4 h-4 text-indigo-600" /> Facebook
            </button>
            <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
            <button onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-lg transition-colors text-sm font-medium">
                <LinkIcon className="w-4 h-4 text-gray-500" /> Salin Tautan
            </button>
        </div>
    );
};

// --- Sub-Component: Quiz Modal ---
const QuizModal: React.FC<{ quiz: QuizQuestion[]; onClose: (passed: boolean) => void }> = ({ quiz, onClose }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (optionIdx: number) => {
        if (optionIdx === quiz[currentIdx].correctIndex) {
            setScore(score + 1);
        }
        if (currentIdx < quiz.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setShowResult(true);
        }
    };

    const passed = score >= Math.ceil(quiz.length * 0.7);

    if (showResult) {
        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in-up text-gray-900">
                    {passed ? (
                        <div className="text-green-500 mb-4 flex justify-center"><Award className="w-16 h-16" /></div>
                    ) : (
                        <div className="text-red-500 mb-4 flex justify-center"><XCircle className="w-16 h-16" /></div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{passed ? 'Selamat! Lulus!' : 'Belum Lulus'}</h3>
                    <p className="text-gray-600 mb-6">Skor Anda: {score} dari {quiz.length}</p>
                    <Button onClick={() => onClose(passed)} className="w-full">
                        {passed ? 'Klaim Sertifikat & Poin' : 'Coba Lagi'}
                    </Button>
                </div>
            </div>
        );
    }

    const q = quiz[currentIdx];
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full text-gray-900">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-gray-500">Soal {currentIdx + 1} / {quiz.length}</span>
                    <Badge color="blue">Kuis</Badge>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-6">{q.question}</h4>
                <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-primary-50 hover:border-primary-300 transition-all font-medium text-gray-700"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: AI Contextual Helper ---
const AIContextHelper: React.FC<{ context: string; onClose: () => void }> = ({ context, onClose }) => {
    const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
        { role: 'model', text: 'Hai! Saya asisten SIMAS. Apa ada bagian alur RS atau materi ini yang perlu saya jelaskan?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;
        const userMsg = { role: 'user' as const, text };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);
        setInput('');

        let fullResp = '';
        await streamGeminiResponse(text, BotMode.CONTEXTUAL_LEARNING, (chunk) => {
            fullResp += chunk;
            setMessages(prev => {
                const newArr = [...prev];
                if (newArr[newArr.length - 1].role === 'model' && newArr[newArr.length - 1].text !== fullResp) {
                     newArr[newArr.length - 1].text = fullResp;
                     return newArr;
                } else if (newArr[newArr.length - 1].role === 'user') {
                     return [...newArr, { role: 'model', text: fullResp }];
                }
                return newArr;
            });
        }, context);
        setIsTyping(false);
    };

    return (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-primary-100 z-40 flex flex-col overflow-hidden animate-fade-in-up h-[450px]">
             <div className="bg-gradient-to-r from-indigo-500 to-primary-600 p-4 flex justify-between items-center text-white">
                 <div className="flex items-center gap-2">
                     <Sparkles className="w-4 h-4" />
                     <span className="font-bold text-sm">Asisten Alur & Materi</span>
                 </div>
                 <button onClick={onClose}><XCircle className="w-5 h-5 opacity-80 hover:opacity-100" /></button>
             </div>
             <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                 {messages.map((m, i) => (
                     <div key={i} className={`p-2 rounded-lg text-xs ${m.role === 'user' ? 'bg-primary-600 text-white self-end ml-8 shadow-md' : 'bg-white text-gray-700 mr-8 shadow-sm border border-gray-100'}`}>
                         {m.text}
                     </div>
                 ))}
                 {isTyping && <div className="text-xs text-gray-400 italic">Sedang mengetik...</div>}
             </div>
             
             <div className="px-2 pt-2 flex gap-1 overflow-x-auto no-scrollbar bg-white pb-2">
                 {['Jelaskan Pendaftaran', 'Apa itu Triase?', 'Lama tunggu lab?'].map(txt => (
                     <button key={txt} onClick={() => handleSend(txt)} className="whitespace-nowrap px-2 py-1 bg-indigo-50 border border-indigo-100 text-[10px] text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors">
                         {txt}
                     </button>
                 ))}
             </div>

             <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                 <input 
                    className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tanya asisten SIMAS..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                 />
                 <button onClick={() => handleSend(input)} disabled={!input} className="p-2 bg-primary-600 text-white rounded-full disabled:opacity-50"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
             </div>
        </div>
    );
};

// --- Sub-Component: Lesson Player ---
const LessonPlayer: React.FC<{ course: Course; onBack: () => void }> = ({ course, onBack }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(course.bookmarked || false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [completed, setCompleted] = useState(course.completed || false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const isSIMRS = course.category === 'Sistem Manajemen RS (SIMRS)';

    return (
        <div className={`min-h-screen -m-6 z-50 relative flex flex-col ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header Toolbar */}
            <div className={`sticky top-0 px-6 py-4 flex justify-between items-center border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/95 backdrop-blur' : 'border-gray-100 bg-white/95 backdrop-blur'} z-20 shadow-sm`}>
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors flex items-center gap-1 text-sm font-medium">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Kembali</span>
                    </button>
                    <div className="border-l border-gray-300 dark:border-slate-700 h-6 mx-2 hidden sm:block"></div>
                    <div>
                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-emerald-400' : 'text-primary-600'}`}>{course.category}</p>
                        <h1 className="text-base sm:text-lg font-bold line-clamp-1">{course.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowAI(!showAI)} className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${showAI ? 'bg-indigo-600 text-white border-indigo-600' : 'border-indigo-200 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'}`}>
                        <Sparkles className="w-3 h-3" /> <span className="hidden sm:inline">Tanya AI</span>
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowShare(!showShare)} className={`p-2 rounded-full hover:bg-gray-500/10 ${showShare ? 'bg-gray-100 dark:bg-slate-800' : ''}`}>
                            <Share2 className="w-5 h-5" />
                        </button>
                        {showShare && <ShareOptions title={course.title} onClose={() => setShowShare(false)} />}
                    </div>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-500/10">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full hover:bg-gray-500/10 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : ''}`}>
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto w-full p-6 md:p-10 pb-32 flex-1">
                {/* Visual Workflow if SIMRS Category */}
                {isSIMRS && (
                    <div className="mb-12">
                        <SIMRSWorkflowMap />
                    </div>
                )}

                {/* Media Area (Only if not SIMRS or in addition) */}
                {!isSIMRS && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800">
                        {course.type === 'video' ? (
                            <div className="aspect-video bg-black flex items-center justify-center text-white relative group cursor-pointer">
                                <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                <PlayCircle className="w-20 h-20 opacity-80 group-hover:scale-110 transition-transform relative z-10" />
                                <span className="ml-2 relative z-10 font-bold">Putar Video</span>
                            </div>
                        ) : (
                            <img src={course.thumbnail} alt={course.title} className="w-full h-64 md:h-80 object-cover" />
                        )}
                    </div>
                )}

                {/* Content */}
                <article className={`prose lg:prose-xl max-w-none ${isDarkMode ? 'prose-invert' : 'prose-green'} prose-headings:font-bold prose-a:text-primary-600`}>
                    <div dangerouslySetInnerHTML={{ __html: course.content }} />
                </article>

                {/* Action Area */}
                <div className={`mt-12 p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-green-50'} flex flex-col md:flex-row gap-6 justify-between items-center shadow-sm border border-gray-100 dark:border-slate-800`}>
                    <div>
                        <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                            {completed ? <CheckCircle className="text-green-600 w-5 h-5" /> : null}
                            {completed ? 'Materi Selesai!' : 'Sudah paham materinya?'}
                        </h4>
                        <p className="text-sm opacity-80">
                            {completed 
                                ? 'Selamat! Anda telah menguasai materi ini. Sertifikat Anda siap.'
                                : `Selesaikan kuis singkat untuk mendapatkan sertifikat digital dan +${course.points} Poin.`
                            }
                        </p>
                    </div>
                    <Button 
                        onClick={() => completed ? setShowCertificate(true) : setShowQuiz(true)} 
                        className={`w-full md:w-auto px-8 py-3 shadow-lg ${
                            completed 
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                            : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                    >
                        {completed ? (
                            <span className="flex items-center gap-2"><Award className="w-5 h-5" /> Lihat Sertifikat</span>
                        ) : (
                            'Mulai Kuis Sekarang'
                        )}
                    </Button>
                </div>
            </div>

            {showQuiz && (
                <QuizModal 
                    quiz={course.quiz} 
                    onClose={(passed) => {
                        setShowQuiz(false);
                        if (passed) setCompleted(true);
                    }} 
                />
            )}

            {showCertificate && (
                <CertificateModal course={course} onClose={() => setShowCertificate(false)} />
            )}

            {showAI && <AIContextHelper context={course.content.replace(/<[^>]*>?/gm, '')} onClose={() => setShowAI(false)} />}
        </div>
    );
};

// --- Main Page Component ---
const Education: React.FC = () => {
  const [view, setView] = useState<'hub' | 'category' | 'player'>('hub');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = selectedCategory 
    ? COURSES.filter(c => c.category === CATEGORIES.find(cat => cat.id === selectedCategory)?.name)
    : [];

  const handleCategoryClick = (id: string) => {
      setSelectedCategory(id);
      setView('category');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseClick = (course: Course) => {
      setSelectedCourse(course);
      setView('player');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'player' && selectedCourse) {
      return <LessonPlayer course={selectedCourse} onBack={() => setView(selectedCategory ? 'category' : 'hub')} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="flex-1 bg-gradient-to-r from-primary-600 to-emerald-600 text-white border-none shadow-lg">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full"><Award className="w-8 h-8 text-yellow-300" /></div>
                  <div>
                      <h3 className="text-lg font-bold">Level 5: Kader Kesehatan</h3>
                      <p className="text-sm text-primary-50">1,250 Poin • 12 Sertifikat</p>
                  </div>
              </div>
          </Card>
          <Card className="flex-1 flex items-center justify-between border-l-4 border-l-primary-500">
               <div>
                   <div className="text-gray-500 dark:text-emerald-200 text-xs uppercase font-bold tracking-wider mb-1">Target Minggu Ini</div>
                   <div className="text-2xl font-bold text-gray-800 dark:text-emerald-50">3/5 <span className="text-sm font-normal text-gray-400 dark:text-emerald-400">Modul</span></div>
               </div>
               <div className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin-slow flex items-center justify-center bg-primary-50 dark:bg-slate-900">
                   <span className="text-xs font-bold text-primary-700 dark:text-emerald-300">60%</span>
               </div>
          </Card>
      </div>

      {view === 'hub' ? (
        <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-600" />
                Kategori Pembelajaran
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {CATEGORIES.map((cat) => {
                    const Icon = IconMap[cat.icon] || BookOpen;
                    return (
                        <button 
                            key={cat.id} 
                            onClick={() => handleCategoryClick(cat.id)}
                            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-primary-200 hover:-translate-y-1 transition-all group"
                        >
                            <div className={`p-4 rounded-full mb-3 ${cat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-slate-200 text-center leading-tight group-hover:text-primary-600 dark:group-hover:text-emerald-300">{cat.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Rekomendasi Untuk Anda</h3>
                    <button className="text-primary-600 dark:text-emerald-300 text-sm font-medium hover:underline">Lihat Semua</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.slice(0, 3).map((course) => (
                         <div key={course.id} onClick={() => handleCourseClick(course)} className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="relative h-44 overflow-hidden">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {course.duration}
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                                    {course.type}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="text-xs text-primary-600 dark:text-emerald-300 font-bold mb-1 uppercase tracking-wide opacity-70">{course.category}</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 text-lg group-hover:text-primary-700 dark:group-hover:text-emerald-300 transition-colors">{course.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-slate-300 line-clamp-2 mb-4">{course.description}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-slate-700">
                                    <Badge color="yellow">{course.points} Poin</Badge>
                                    <span className="text-xs font-bold text-primary-600 dark:text-emerald-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Mulai Belajar <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
            </div>
        </>
      ) : (
        <div>
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 dark:bg-slate-950 z-10 py-2">
                <button onClick={() => setView('hub')} className="p-2 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700 text-gray-800 dark:text-slate-100"><ChevronLeft /></button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Materi'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-300">Pilih materi untuk mulai belajar</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <Card key={course.id} className="cursor-pointer hover:shadow-lg hover:border-primary-300 dark:hover:border-emerald-500 transition-all group h-full flex flex-col" onClick={() => handleCourseClick(course)}>
                        <div className="flex gap-4 items-start p-2">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                                <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <Badge color="green" >{course.type}</Badge>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 mt-2 text-base group-hover:text-primary-700 dark:group-hover:text-emerald-300">{course.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 mt-2">
                                    <Clock className="w-3 h-3" /> {course.duration}
                                    <span>•</span>
                                    <Award className="w-3 h-3 text-yellow-500" /> {course.points} Poin
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto pt-3 border-t border-gray-50 dark:border-slate-700 px-2 pb-2">
                            <button className="w-full py-2 bg-primary-50 dark:bg-slate-900 text-primary-700 dark:text-emerald-200 rounded-lg text-sm font-bold hover:bg-primary-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <BookOpen className="w-4 h-4" /> Buka Materi
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Education;
