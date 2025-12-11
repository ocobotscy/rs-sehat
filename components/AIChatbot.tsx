
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { BotMode, ChatMessage } from '../types';
import { streamGeminiResponse } from '../services/geminiService';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Halo! Saya SIMAS AI Assistant by Khoirul Anam. Apa yang bisa saya bantu terkait kesehatan atau layanan hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<BotMode>(BotMode.EDUCATION);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    const initialBotMsg: ChatMessage = { id: botMsgId, role: 'model', text: '', isStreaming: true };
    setMessages(prev => [...prev, initialBotMsg]);

    let fullText = '';
    await streamGeminiResponse(userMsg.text, mode, (chunk) => {
      fullText += chunk;
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId ? { ...msg, text: fullText } : msg
      ));
    });

    setMessages(prev => prev.map(msg => 
      msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
    ));
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-primary-600 text-white hover:bg-primary-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-sm">SIMAS AI Assistant by Khoirul Anam</h3>
                <p className="text-xs text-primary-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary-700 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selector */}
          <div className="bg-gray-50 p-2 border-b border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
            {Object.values(BotMode).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  mode === m 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-primary-100 text-primary-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.role === 'model' ? (
                      <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ) : msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-primary-400 animate-pulse align-middle"></span>}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1].role === 'user' && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaan kesehatan..."
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-full text-white transition-colors ${
                  !input.trim() || isTyping ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> AI dapat membuat kesalahan. Selalu konsultasi ke dokter.
                </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
