import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot'; 
  timestamp: Date;
}

interface ChatSectionProps {
  highlightedText: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ highlightedText }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText('');
    
    // Simulate AI response (in a real app, you would call an API here)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a simulated response from the AI assistant.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      width: "calc(100% - 20px)",
      height: "calc(100% - 70px)",
      margin: "60px 10px 0px 10px", // Reduced bottom margin from 10px to 0px
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Highlighted text section */}
      <div style={{
        padding: "15px",
        borderBottom: "1px solid #edf2f7",
        backgroundColor: "#f8fafc"
      }}>
        <div style={{
          fontSize: "12px",
          color: "#64748b",
          marginBottom: "4px"
        }}>
          Selected Text
        </div>
        <div style={{
          backgroundColor: "#ebf5ff",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "14px",
          borderLeft: "4px solid #3b82f6",
          maxHeight: "100px",
          overflow: "hidden", // Hide overflow instead of scrolling
          textOverflow: "ellipsis", // Add ellipsis for text truncation
          display: "-webkit-box",
          WebkitLineClamp: 4, // Limit to 4 lines
          WebkitBoxOrient: "vertical",
          wordBreak: "break-word"
        }}>
          {highlightedText || "No text selected"}
        </div>
      </div>

      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "15px",
      }}>
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: "16px"
            }}
          >
            <div style={{
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: message.sender === 'user' ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              backgroundColor: message.sender === 'user' ? "#3b82f6" : "#f1f5f9",
              color: message.sender === 'user' ? "white" : "#334155",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        borderTop: "1px solid #edf2f7",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff"
      }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask a question about the highlighted text..."
          style={{
            flex: 1,
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "12px 16px",
            resize: "none",
            height: "48px",
            lineHeight: "24px",
            outline: "none",
            fontSize: "14px",
            fontFamily: "inherit"
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          <IoSend />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatSection;