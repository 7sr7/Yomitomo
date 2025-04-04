import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface Message {
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea when content changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set the height to scrollHeight to fit the content
    const newHeight = Math.min(textarea.scrollHeight, 120); // Cap at 120px
    textarea.style.height = `${newHeight}px`;
  }, [inputText]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    // Add user message
    const newUserMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText('');
    setIsLoading(true);
    
    try{
      // Instead of using chrome.runtime.sendMessage, we'll use window.postMessage
      // to communicate with the content script
      window.postMessage({
        source: "yomitomo-overlay",
        action: "apiRequest",
        data: {
          message: inputText,
          previousMessages: messages.map((msg) => ({
            sender: msg.sender,
            message: msg.text,
          })),
          highlightedText,
        }
      }, "*");
      
      // Create a promise that will be resolved when we get a response
      const responsePromise = new Promise((resolve, reject) => {
        const handleResponse = (event: any) => {
          // Only accept messages from the same window
          if (event.source !== window) return;
          
          const data = event.data;
          if (typeof data === 'object' && data.source === 'yomitomo-content' && data.action === 'apiResponse') {
            window.removeEventListener('message', handleResponse);
            
            if (data.success) {
              resolve(data.data);
            } else {
              reject(new Error(data.error || "Failed to get AI response"));
            }
          }
        };
        
        window.addEventListener('message', handleResponse);
        
        // Set a timeout to reject the promise if we don't get a response
        setTimeout(() => {
          window.removeEventListener('message', handleResponse);
          reject(new Error("API request timed out"));
        }, 30000); // 30 seconds timeout
      });
      
      // Wait for the response
      const responseData = await responsePromise as { message: string };
      
      const botMessage: Message = {
        text: responseData.message,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log("Error getting AI response:", error);
      
      // Add an error message to the chat
      const errorMessage: Message = {
        text: 'Sorry, something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Typing indicator component for loading state
  const TypingIndicator = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "16px"
      }}
    >
      <div style={{
        padding: "14px 18px",
        borderRadius: "18px 18px 18px 4px",
        backgroundColor: "#f1f5f9",
        color: "#334155",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        minWidth: "60px"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#64748b",
                borderRadius: "50%",
                margin: "0 3px"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      width: "calc(100% - 20px)",
      height: "calc(100% - 70px)",
      margin: "60px 10px 0px 10px",
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
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 4,
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
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 transparent",
      }}>
        {messages.map((message, idx) => (
          <div
            key={idx}
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
        
        {/* Show typing indicator when loading */}
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        borderTop: "1px solid #edf2f7",
        padding: "15px",
        display: "flex",
        alignItems: "flex-end",
        backgroundColor: "#ffffff"
      }}>
        <div style={{
          flex: 1,
          position: "relative",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          transition: "all 0.2s ease"
        }}>
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question about the highlighted text..."
            disabled={isLoading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "20px",
              padding: "12px 16px",
              resize: "none",
              minHeight: "48px",
              maxHeight: "120px",
              lineHeight: "24px",
              outline: "none",
              fontSize: "14px",
              fontFamily: "inherit",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 transparent",
              boxSizing: "border-box",
              transition: "height 0.2s ease",
              opacity: isLoading ? 0.7 : 1,
            }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={isLoading || inputText.trim() === ''}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: isLoading ? "#93c5fd" : "#3b82f6",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginLeft: "10px",
            flexShrink: 0,
            opacity: (isLoading || inputText.trim() === '') ? 0.7 : 1
          }}
        >
          <IoSend />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatSection;