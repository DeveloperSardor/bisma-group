'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LangContext';

// --- Types ---
interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

export default function ChatWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chat.greeting'),
      sender: 'bot',
      timestamp: '10:00 AM'
    }
  ]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0 || prev[0].sender !== 'bot') return prev;
      const next = [...prev];
      next[0] = { ...next[0], text: t('chat.greeting') };
      return next;
    });
  }, [t]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: t('chat.autoReply'),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="bisma-chat-system">
      {/* 2. CHAT BUTTON - NO WHITE BACKGROUND, CIRCULAR LOGO */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            className="chat-fab-premium"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            <div className="fab-logo-circle">
              <img src="/chat.jpg" alt="Bisma" className="logo-actual" />
            </div>
            <div className="notification-dot" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window-premium"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as any }}
          >
            {/* HEADER */}
            <div className="chat-header-premium">
              <div className="header-left">
                <div className="header-avatar">
                  <img src="/chat.jpg" alt="B" />
                </div>
                <div className="header-meta">
                  <span className="assistant-name">{t('chat.assistantName')}</span>
                  <span className="assistant-status">{t('chat.assistantStatus')}</span>
                </div>
              </div>
              <div className="header-right">
                <button className="header-icon-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="header-icon-btn close-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* MESSAGE BODY */}
            <div className="chat-body-premium" ref={scrollRef}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id} 
                  className={`message-row ${msg.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-bubble-premium">
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">{msg.timestamp}</div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="message-row bot">
                  <div className="message-bubble-premium typing">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}
            </div>

            {/* INPUT AREA */}
            <form className="chat-footer-premium" onSubmit={handleSend}>
              <div className="input-pill-container">
                <input
                  type="text"
                  placeholder={t('chat.inputPlaceholder')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="input-actions">
                  <button type="submit" className="send-icon-btn" disabled={!inputValue.trim()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="powered-by-label">{t('chat.poweredBy')}</div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .bisma-chat-system {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 10000;
          font-family: 'Inter', sans-serif;
        }

        /* 2. CHAT BUTTON - NO WHITE BG */
        .chat-fab-premium {
          width: 65px;
          height: 65px;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          outline: none;
        }

        .fab-logo-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff; 
        }

        .logo-actual {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .notification-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          background: #2997ff; /* Cyan Dot */
          border: 2px solid #ffffff;
          border-radius: 50%;
          z-index: 10;
        }

        /* 3. CHAT WINDOW */
        .chat-window-premium {
          position: absolute;
          bottom: 85px;
          right: 0;
          width: 360px;
          height: 580px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .chat-header-premium {
          height: 64px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          background: #ffffff;
        }
        .header-left { display: flex; align-items: center; gap: 12px; }
        .header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #E5E7EB;
        }
        .header-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .header-meta { display: flex; flex-direction: column; gap: 1px; }
        .assistant-name { font-size: 15px; font-weight: 600; color: var(--brand-navy); }
        .assistant-status { font-size: 11px; color: #10B981; line-height: 1.2; font-weight: 600; }

        .header-right { display: flex; align-items: center; gap: 4px; }
        .header-icon-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: none;
          color: var(--brand-navy);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .chat-body-premium {
          flex: 1; padding: 20px; overflow-y: auto; background: #F9FAFB; display: flex; flex-direction: column; gap: 16px;
        }
        .message-row { display: flex; width: 100%; }
        .message-row.user { justify-content: flex-end; }
        .message-bubble-premium { max-width: 75%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
        .bot .message-bubble-premium { background: #ffffff; color: var(--brand-navy); border-bottom-left-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.05); box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .user .message-bubble-premium { background: var(--brand-navy); color: #ffffff; border-bottom-right-radius: 4px; }

        .chat-footer-premium { padding: 16px 20px; background: #ffffff; border-top: 1px solid rgba(0, 0, 0, 0.05); }
        .input-pill-container {
          display: flex; align-items: center; background: #F3F4F6; border: 1px solid transparent; border-radius: 100px; padding: 4px 4px 4px 16px;
          transition: all 0.2s;
        }
        .input-pill-container:focus-within { background: #ffffff; border-color: var(--brand-cyan); box-shadow: 0 0 0 4px rgba(41, 151, 255, 0.1); }
        .input-pill-container input { flex: 1; border: none; background: none; padding: 8px 0; font-size: 14px; outline: none; color: var(--brand-navy); }
        .send-icon-btn { width: 32px; height: 32px; border: none; background: none; color: var(--brand-cyan); cursor: pointer; }
        
        .powered-by-label { margin-top: 10px; font-size: 10px; color: #9CA3AF; text-align: center; }

        .typing .dot { width: 4px; height: 4px; background: #9CA3AF; border-radius: 50%; animation: typing 1.4s infinite; }
        @keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}
