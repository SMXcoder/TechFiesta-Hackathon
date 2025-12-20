import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2 } from 'lucide-react';

const AiAssistant = () => {
  const [messages, setMessages] = useState([{ sender: 'ai', content: "Hello! I'm Aura. I'm here to listen. How are you feeling?" }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if(!input.trim()) return;
    const newMsgs = [...messages, { sender: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');

    // Mock AI Response (replace with real fetch if backend runs)
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', content: "I hear you. Tell me more about that." }]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      <div className="p-4 bg-white/50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-indigo-900">Aura AI</h2>
        <button onClick={() => setMessages([])} className="text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-slate-700 shadow-sm rounded-bl-sm'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input 
          className="flex-1 bg-slate-50 border-0 rounded-xl px-4 focus:ring-2 focus:ring-indigo-100 outline-none" 
          placeholder="Type your message..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && handleSend()} 
        />
        <button onClick={handleSend} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><Send size={20}/></button>
      </div>
    </div>
  );
};

export default AiAssistant;