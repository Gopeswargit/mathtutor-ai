import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAdvisorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello! I'm **EulerBot**, your dedicated AI Math Earning Coach. 

As a math student, your analytical thinking and deductive reasoning are among the highest-paid freelance and remote assets in the market right now.

Here are some popular topics I can help you with:
- **AI Specialist Platforms**: How to apply and pass onboarding tests on *Outlier.ai*, *DataAnnotation*, and *Alignerr* ($30–$55/hr).
- **Tutoring Acquisition**: How to find 3–5 recurring AP Calculus or Linear Algebra students at $45–$75/hr.
- **Freelance & LaTeX**: How to bid on quantitative Python, data analysis, and LaTeX typesetting gigs.
- **Rate Negotiation & Packaging**: Setting rates without underselling your mathematical skill.

What would you like to explore first?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'How do I pass the Outlier / DataAnnotation math screening test?',
    'How do I find high school parents willing to pay $50/hr for AP Calculus?',
    'What are the best freelance gigs for someone good at Python and Linear Algebra?',
    'How can I make $500 in the next 7 days as a math major?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send conversation history to backend for context
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/gemini/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          conversationHistory,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get advice');
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I could not process that question. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Error: ${err instanceof Error ? err.message : 'Could not contact the advisor server.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Bot className="w-6 h-6 text-indigo-600" />
          EulerBot: AI Math Earning Coach
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Ask specific questions about tests, rate cards, client acquisition, and maximizing your hourly mathematical value.
        </p>
      </div>

      {/* Suggested Starter Prompts */}
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-all text-left flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[580px]">
        {/* Chat History Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">EulerBot (Gemini 3.7 Flash)</span>
            <span className="text-[11px] text-slate-400 font-medium">| Quantitative Advisor</span>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  id: 'welcome-reset',
                  role: 'assistant',
                  content: 'Chat cleared. How else can I assist your math monetization strategy today?',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="text-slate-400 hover:text-slate-600 text-xs font-medium"
          >
            Reset Chat
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] ${isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs text-left'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs prose prose-slate max-w-none text-left'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              <span>EulerBot is formulating an analytical answer...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about math tutoring rates, passing AI screening tests, LaTeX gigs..."
              disabled={isLoading}
              className="flex-1 text-xs border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white p-2.5 rounded-xl font-bold transition-colors shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
