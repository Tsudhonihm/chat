import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Hand-Drawn Icons
const HandDrawnFacebook = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4h-8c-2.2 0-4-1.8-4-4v-8z" />
    <path d="M13 7v3h3l-.6 3h-2.4v7h-3v-7h-2v-3h2v-2c0-1.7 1.3-3 3-3h2v3h-2z" />
  </svg>
);

const HandDrawnInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
    <circle cx="12" cy="12" r="3" />
    <path d="M16.5 7.5v.001" />
  </svg>
);

// Message Interface
interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

// API URL Configuration
const API_URL = import.meta.env.PROD
  ? 'https://anything-boes.web.app/' // Firebase Hosting domain (correct)
  : '/api'; // Local development

function App() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add a new message to the chat
  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        sender,
        message,
        timestamp: new Date(),
      },
    ]);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (!message || isLoading) return; // Prevent empty or duplicate submissions
    setIsLoading(true); // Show loading indicator
    addMessage('You', message); // Add user's message to the chat
    setUserInput(''); // Clear input field
    try {
      // Send the message to the backend and get the bot's response
      const response = await axios.post(`${API_URL}/message`, { message });
      addMessage('Bot', response.data.response); // Add bot's response to the chat
    } catch (error) {
      console.error('Error fetching bot response:', error);
      addMessage('Bot', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
            <div className="flex items-center justify-between">
              {/* Title */}
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-3xl font-bold text-white"
              >
                Welcome to Anything Boes Studio
              </motion.h1>
              {/* Social Links */}
              <div className="flex items-center gap-6">
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.facebook.com/AnythingBoes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HandDrawnFacebook />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/peter_boes1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 transition-colors"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HandDrawnInstagram />
                  </motion.a>
                </div>
                {/* Larger Penny Button */}
                <motion.a
                  href="https://sites.google.com/view/anythingboes/the-boes-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group perspective-1000"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-24 h-24 rounded-full relative transform-gpu transition-all duration-300 group-hover:rotate-12">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] transform-gpu transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-amber-200 to-transparent opacity-30" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center overflow-hidden">
                      <span className="text-amber-100 font-bold text-sm text-center leading-tight">
                        Visit<br />Boes Hub
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-amber-300 opacity-20" />
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
          {/* Bottom Bar with Centered Content */}
          <div className="flex flex-col items-center justify-center px-6 py-4 border-t border-gray-100 space-y-3">
            {/* Project Description */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-semibold text-gray-800"
            >
              Serious
              <span className="mx-2 text-blue-600">( ly Cool )</span>
              Projects
            </motion.div>
            {/* AI Text */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-md text-lg"
            >
              Try our AI for Free
            </motion.div>
          </div>
        </div>
        {/* Chat Container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-blue-600 p-3 flex items-center gap-2">
            {/* Fixed Message Bubble Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle
                className="text-white align-middle"
                size={20}
                style={{ marginRight: '8px', transform: 'rotate(0deg)' }}
              />
            </motion.div>
            <h2 className="text-lg font-semibold text-white align-middle">Chat with Bot</h2>
          </div>
          {/* Messages Container */}
          <div
            ref={messagesContainerRef}
            className="h-[400px] overflow-y-auto p-4 space-y-4"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.sender === 'You'
                        ? 'border-2 border-blue-500 bg-transparent text-black' // Outline blue bubble with black text
                        : 'bg-gray-100 text-gray-800' // Light gray background with dark gray text
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{msg.sender}</span>
                      <span className="text-xs opacity-75">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="break-words">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} className="rotate-[-45deg]" />
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <footer className="text-center text-white mt-8 pb-4">
        © 2025 Anything Boes Design Studio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
