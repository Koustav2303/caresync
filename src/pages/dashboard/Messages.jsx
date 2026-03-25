import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Search, Send, Paperclip, Phone, Video, 
  MoreVertical, CheckCheck, Clock, Image as ImageIcon
} from 'lucide-react';

// --- MOCK CHAT DATA ---
const mockContacts = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', avatar: 'https://i.pravatar.cc/150?u=sarah', unread: 2, lastMessage: 'Your lab results look great.', time: '10:42 AM', isOnline: true },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', avatar: 'https://i.pravatar.cc/150?u=michael', unread: 0, lastMessage: 'Please remember to take the new medication.', time: 'Yesterday', isOnline: false },
  { id: 3, name: 'CareSync Support', specialty: 'Platform Help', avatar: 'https://i.pravatar.cc/150?u=support', unread: 0, lastMessage: 'Your appointment has been rescheduled.', time: 'Mon', isOnline: true },
];

const initialMessages = {
  1: [
    { id: 101, sender: 'doctor', text: 'Hello Alex, I have reviewed your recent blood pressure logs.', time: '10:30 AM' },
    { id: 102, sender: 'user', text: 'Hi Dr. Jenkins. Are the numbers looking better this week?', time: '10:35 AM' },
    { id: 103, sender: 'doctor', text: 'Yes, there is a significant improvement. Your lab results look great.', time: '10:42 AM' },
    { id: 104, sender: 'doctor', text: 'Keep up with the current diet and medication routine. We will review again during your next visit.', time: '10:42 AM' },
  ],
  2: [
    { id: 201, sender: 'doctor', text: 'Checking in on your migraines, Alex.', time: 'Yesterday' },
    { id: 202, sender: 'doctor', text: 'Please remember to take the new medication.', time: 'Yesterday' },
  ],
  3: [
    { id: 301, sender: 'doctor', text: 'Hello! How can we help you today?', time: 'Mon' },
    { id: 302, sender: 'user', text: 'I needed to move my Tuesday appointment.', time: 'Mon' },
    { id: 303, sender: 'doctor', text: 'Your appointment has been rescheduled.', time: 'Mon' },
  ]
};

const Messages = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [chatHistories, setChatHistories] = useState(initialMessages);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { contextSafe } = useGSAP();

  const activeContact = mockContacts.find(c => c.id === activeChatId);
  const currentMessages = chatHistories[activeChatId] || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Initial Load Animation
  useGSAP(() => {
    gsap.fromTo('.contact-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
    gsap.fromTo('.message-bubble',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  // Handle sending a new message
  const handleSend = contextSafe((e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update state
    setChatHistories(prev => ({
      ...prev,
      [activeChatId]: [...prev[activeChatId], newMessage]
    }));
    setInputText('');

    // Animate the specific new bubble in
    setTimeout(() => {
      const bubbles = document.querySelectorAll('.message-bubble');
      const lastBubble = bubbles[bubbles.length - 1];
      if (lastBubble) {
        gsap.fromTo(lastBubble, 
          { opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
        );
      }
    }, 50);
  });

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] min-h-[600px] flex gap-6 pb-6">
      
      {/* --- LEFT SIDEBAR: CONTACTS LIST --- */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden md:flex">
        
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {mockContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setActiveChatId(contact.id)}
              className={`contact-item w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-200 mb-1 text-left ${
                activeChatId === contact.id ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                {contact.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold text-sm truncate ${activeChatId === contact.id ? 'text-primary-900' : 'text-gray-900'}`}>{contact.name}</h3>
                  <span className={`text-xs whitespace-nowrap ${activeChatId === contact.id ? 'text-primary-600' : 'text-gray-400'}`}>{contact.time}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={`text-xs truncate ${contact.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: ACTIVE CHAT AREA --- */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="h-20 px-6 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              {activeContact.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full"></div>}
            </div>
            <div>
              <h2 className="font-heading font-bold text-gray-900">{activeContact.name}</h2>
              <p className="text-xs text-gray-500 font-medium">{activeContact.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block"><Phone size={20} /></button>
            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors hidden sm:block"><Video size={20} /></button>
            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] custom-scrollbar" ref={chatContainerRef}>
          <div className="flex justify-center mb-6">
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
          </div>

          <div className="space-y-4">
            {currentMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`message-bubble flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[75%] md:max-w-[65%] px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    isUser 
                      ? 'bg-primary-600 text-white rounded-br-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] text-gray-400 font-medium">{msg.time}</span>
                    {isUser && <CheckCheck size={12} className="text-primary-500" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex items-center gap-1 shrink-0 pb-2 hidden sm:flex">
              <button type="button" className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><Paperclip size={20} /></button>
              <button type="button" className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><ImageIcon size={20} /></button>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none max-h-32 min-h-[50px] custom-scrollbar text-sm"
              rows={1}
            />
            
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md"
            >
              <Send size={20} className="ml-0.5" />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-2">Messages are end-to-end encrypted. In case of emergency, call 911.</p>
        </div>

      </div>
    </div>
  );
};

export default Messages;