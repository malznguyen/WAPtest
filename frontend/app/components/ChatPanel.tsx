'use client';
import { useState } from 'react';
import { sendMessage } from '../services/chatApi';
import type { ChatMessage } from '../types/weather';

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hello! How can I help with the weather today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendMessage(input);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Sorry, I encountered an error.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg h-[calc(100vh-140px)] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Chat Panel</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white rounded-tr-sm'
                : 'bg-gray-100 text-gray-800 rounded-tl-sm'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-sm">
              <p className="text-sm text-gray-500">Typing...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
