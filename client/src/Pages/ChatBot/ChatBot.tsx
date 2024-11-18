import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


interface ApiResponse {
  data: {
    candidates: Array<{
      content: {
        parts: Array<{
          text: string
        }>
      }
    }>
  }
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function ChatBot(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Bonjour! Comment puis-je vous aider?",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function generateAnswer(): Promise<void> {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response: ApiResponse = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCrW9NPrLqgTZS0zEQr_xe8Xq1eN76epK0",
        method: "post",
        data: {
          contents: [{parts:[{text: trimmedInput}]}]
        }
      });

      const aiMessage: Message = {
        text: response.data.candidates[0].content.parts[0].text,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        text: "Désolé, une erreur est survenue. Veuillez réessayer.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !isLoading) {
      generateAnswer();
    }
  };

  const renderMessage = (message: Message, index: number) => (
    <div 
      key={index} 
      className={`
        p-2 rounded-lg max-w-[80%] my-2
        ${message.sender === 'user' 
          ? 'bg-blue-100 ml-auto text-right' 
          : 'bg-gray-200 mr-auto text-left'}
      `}
    >
      <ReactMarkdown>{message.text}</ReactMarkdown>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] border border-gray-300 rounded-lg flex flex-col bg-white shadow-lg">
          <div className="flex justify-between items-center p-3 bg-gray-100">
            <h1 className="font-semibold">Assistant IA</h1>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-3 space-y-2">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="text-center text-gray-500 italic">
                En train de réfléchir...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex p-3 border-t border-gray-200">
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="
                flex-grow 
                mr-2 
                p-2 
                border 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
                disabled:opacity-50
              "
            />
            <button 
              onClick={generateAnswer}
              disabled={isLoading || !input.trim()}
              className="
                bg-blue-500 
                text-white 
                p-2 
                rounded-lg 
                hover:bg-blue-600 
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="
            w-16 
            h-16 
            bg-blue-500 
            text-white 
            rounded-full 
            flex 
            items-center 
            justify-center 
            shadow-lg
            hover:bg-blue-600
            transition-colors
          "
          onClick={() => setIsOpen(true)}
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );
}

export default ChatBot;