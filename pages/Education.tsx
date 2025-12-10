import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { COURSES, CATEGORIES } from '../services/mockData';
import { Course, QuizQuestion, BotMode } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { 
  PlayCircle, Clock, Award, BookOpen, ChevronLeft, 
  HeartPulse, Apple, Ambulance, Brain, Leaf, Baby, 
  Biohazard, Activity, Accessibility, Sun, Moon, 
  Bookmark, Share2, Sparkles, CheckCircle, XCircle, ArrowRight
} from 'lucide-react';

// --- Icon Mapping Helper ---
const IconMap: Record<string, React.ElementType> = {
  HeartPulse, Apple, Ambulance, Brain, Leaf, Baby, Biohazard, Activity, Accessibility, Sun
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
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in-up">
                    {passed ? (
                        <div className="text-green-500 mb-4 flex justify-center"><Award className="w-16 h-16" /></div>
                    ) : (
                        <div className="text-red-500 mb-4 flex justify-center"><XCircle className="w-16 h-16" /></div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{passed ? 'Selamat! Lulus!' : 'Belum Lulus'}</h3>
                    <p className="text-gray-600 mb-6">Skor Anda: {score} dari {quiz.length}</p>
                    <Button onClick={() => onClose(passed)} className="w-full">
                        {passed ? 'Klaim Sertifikat' : 'Coba Lagi'}
                    </Button>
                </div>
            </div>
        );
    }

    const q = quiz[currentIdx];
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
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
        { role: 'model', text: 'Hai! Saya sudah membaca materi ini. Ada bagian yang membingungkan?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async (text: string) => {
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
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-primary-100 z-40 flex flex-col overflow-hidden animate-fade-in-up h-[400px]">
             <div className="bg-gradient-to-r from-indigo-500 to-primary-600 p-3 flex justify-between items-center text-white">
                 <div className="flex items-center gap-2">
                     <Sparkles className="w-4 h-4" />
                     <span className="font-bold text-sm">Asisten Materi</span>
                 </div>
                 <button onClick={onClose}><XCircle className="w-5 h-5 opacity-80 hover:opacity-100" /></button>
             </div>
             <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                 {messages.map((m, i) => (
                     <div key={i} className={`p-2 rounded-lg text-xs ${m.role === 'user' ? 'bg-primary-600 text-white self-end ml-8' : 'bg-white text-gray-700 mr-8 shadow-sm border border-gray-100'}`}>
                         {m.text}
                     </div>
                 ))}
                 {isTyping && <div className="text-xs text-gray-400 italic">Sedang mengetik...</div>}
             </div>
             
             {/* Quick Prompts */}
             <div className="px-2 pt-2 flex gap-1 overflow-x-auto no-scrollbar">
                 {['Jelaskan Sederhana', 'Ringkas Poin Utama', 'Apa Hubungannya?'].map(txt => (
                     <button key={txt} onClick={() => handleSend(txt)} className="whitespace-nowrap px-2 py-1 bg-white border border-indigo-100 text-[10px] text-indigo-600 rounded-full hover:bg-indigo-50">
                         {txt}
                     </button>
                 ))}
             </div>

             <div className="p-2 bg-white border-t border-gray-100 flex gap-2">
                 <input 
                    className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-xs focus:outline-none"
                    placeholder="Tanya tentang materi..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                 />
                 <button onClick={() => handleSend(input)} disabled={!input} className="p-1.5 bg-primary-600 text-white rounded-full"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
             </div>
        </div>
    );
};

// --- Sub-Component: Lesson Player (Halaman Baca) ---
const LessonPlayer: React.FC<{ course: Course; onBack: () => void }> = ({ course, onBack }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(course.bookmarked || false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [completed, setCompleted] = useState(course.completed || false);

    const toggleDark = () => setIsDarkMode(!isDarkMode);

    return (
        <div className={`min-h-screen -m-6 z-50 relative flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            {/* Header Toolbar */}
            <div className={`sticky top-0 px-6 py-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/95 backdrop-blur' : 'border-gray-100 bg-white/95 backdrop-blur'} z-20 shadow-sm`}>
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors flex items-center gap-1 text-sm font-medium">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Kembali</span>
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-2 hidden sm:block"></div>
                    <div>
                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>{course.category}</p>
                        <h1 className="text-base sm:text-lg font-bold line-clamp-1">{course.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowAI(!showAI)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${showAI ? 'bg-indigo-600 text-white border-indigo-600' : 'border-indigo-200 text-indigo-600'}`}>
                        <Sparkles className="w-3 h-3" /> <span className="hidden sm:inline">Tanya AI</span>
                    </button>
                    <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-500/10">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full hover:bg-gray-500/10 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : ''}`}>
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto w-full p-6 md:p-10 pb-32 flex-1">
                {/* Media Area */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
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

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm opacity-70 mb-8 border-b border-gray-200 pb-4">
                     <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration} Baca</span>
                     <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {course.points} Poin</span>
                     <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Terverifikasi Medis</span>
                </div>

                {/* Content */}
                <article className={`prose lg:prose-xl max-w-none ${isDarkMode ? 'prose-invert' : 'prose-green'} prose-headings:font-bold prose-a:text-primary-600`}>
                    <div dangerouslySetInnerHTML={{ __html: course.content }} />
                </article>

                {/* Action Area */}
                <div className={`mt-12 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'} flex flex-col md:flex-row gap-6 justify-between items-center`}>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Sudah paham materinya?</h4>
                        <p className="text-sm opacity-80">
                            Selesaikan kuis singkat untuk mendapatkan sertifikat digital dan <strong>+{course.points} Poin</strong>.
                        </p>
                    </div>
                    <Button 
                        onClick={() => setShowQuiz(true)} 
                        className={`w-full md:w-auto px-8 py-3 ${completed ? 'bg-green-600 hover:bg-green-700' : 'bg-primary-600 hover:bg-primary-700'}`}
                    >
                        {completed ? 'Lihat Sertifikat Anda' : 'Mulai Kuis Sekarang'}
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

            {showAI && <AIContextHelper context={course.content.replace(/<[^>]*>?/gm, '')} onClose={() => setShowAI(false)} />}
        </div>
    );
};

// --- Main Page Component ---
const Education: React.FC = () => {
  const [view, setView] = useState<'hub' | 'category' | 'player'>('hub');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Filter courses based on category
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
      {/* Top Stats - Only show in Hub or Category view */}
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
                   <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Target Minggu Ini</div>
                   <div className="text-2xl font-bold text-gray-800">3/5 <span className="text-sm font-normal text-gray-400">Modul</span></div>
               </div>
               <div className="h-12 w-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin-slow flex items-center justify-center bg-primary-50">
                   <span className="text-xs font-bold text-primary-700">60%</span>
               </div>
          </Card>
      </div>

      {view === 'hub' ? (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
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
                            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200 hover:-translate-y-1 transition-all group"
                        >
                            <div className={`p-4 rounded-full mb-3 ${cat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 text-center leading-tight group-hover:text-primary-600">{cat.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Rekomendasi Untuk Anda</h3>
                    <button className="text-primary-600 text-sm font-medium hover:underline">Lihat Semua</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.slice(0, 3).map((course) => (
                         <div key={course.id} onClick={() => handleCourseClick(course)} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
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
                                <div className="text-xs text-primary-600 font-bold mb-1 uppercase tracking-wide opacity-70">{course.category}</div>
                                <h4 className="font-bold text-gray-900 mb-2 line-clamp-1 text-lg group-hover:text-primary-700 transition-colors">{course.title}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                    <Badge color="yellow">{course.points} Poin</Badge>
                                    <span className="text-xs font-bold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Baca Sekarang <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
            </div>
        </>
      ) : (
        /* Category View */
        <div>
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-gray-50 z-10 py-2">
                <button onClick={() => setView('hub')} className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-gray-200"><ChevronLeft /></button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Materi'}
                    </h2>
                    <p className="text-sm text-gray-500">Pilih materi untuk mulai belajar</p>
                </div>
            </div>
            
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="cursor-pointer hover:shadow-lg hover:border-primary-300 transition-all group h-full flex flex-col" onClick={() => handleCourseClick(course)}>
                            <div className="flex gap-4 items-start p-2">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <Badge color="green" >{course.type}</Badge>
                                    </div>
                                    <h4 className="font-bold text-gray-900 line-clamp-2 mb-1 mt-2 text-base group-hover:text-primary-700">{course.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                        <Clock className="w-3 h-3" /> {course.duration}
                                        <span>•</span>
                                        <Award className="w-3 h-3 text-yellow-500" /> {course.points} Poin
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-3 border-t border-gray-50 px-2 pb-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCourseClick(course);
                                    }}
                                    className="w-full py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-bold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" /> Baca Materi
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border-dashed border-2 border-gray-200">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Belum ada materi</h3>
                    <p className="text-gray-500">Materi untuk kategori ini sedang disiapkan.</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Education;