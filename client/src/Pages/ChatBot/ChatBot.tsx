import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Paperclip, X, Send, Sparkles } from 'lucide-react';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

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
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setMessages([{
          text: "Bonjour! Je suis Konekt'IA, votre assistant intelligent personnel. Comment puis-je vous aider aujourd'hui?",
          sender: 'ai',
          timestamp: new Date()
        }]);
      }, 4000);
      return () => clearTimeout(timer);
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
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAh23dYkk5D6H4eHvltgwl9juLjQmpXtxg",
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

  const Robot3D = () => (
    <div className="relative w-48 h-48 transform-gpu">
      <svg className="w-full h-full filter drop-shadow-2xl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Corps du robot */}
        <g className="animate-float">
          {/* Tête */}
          <rect x="60" y="40" width="80" height="70" rx="10" fill="#4F46E5" className="animate-pulse"/>
          
          {/* Yeux */}
          <circle cx="85" cy="70" r="10" fill="#60A5FA" className="animate-glow"/>
          <circle cx="115" cy="70" r="10" fill="#60A5FA" className="animate-glow"/>
          
          {/* Antennes */}
          <line x1="75" y1="40" x2="65" y2="20" stroke="#818CF8" strokeWidth="4" className="animate-wave"/>
          <line x1="125" y1="40" x2="135" y2="20" stroke="#818CF8" strokeWidth="4" className="animate-wave"/>
          <circle cx="65" cy="20" r="5" fill="#60A5FA" className="animate-pulse"/>
          <circle cx="135" cy="20" r="5" fill="#60A5FA" className="animate-pulse"/>
          
          {/* Corps */}
          <rect x="50" y="110" width="100" height="60" rx="10" fill="#4F46E5"/>
          
          {/* Motif du corps */}
          <path d="M60 130 H140" stroke="#818CF8" strokeWidth="2"/>
          <path d="M60 140 H140" stroke="#818CF8" strokeWidth="2"/>
          <path d="M60 150 H140" stroke="#818CF8" strokeWidth="2"/>
          
          {/* Bras */}
          <g className="animate-wave">
            <rect x="30" y="120" width="20" height="40" rx="5" fill="#4F46E5"/>
            <rect x="150" y="120" width="20" height="40" rx="5" fill="#4F46E5"/>
          </g>
          
          {/* Jambes */}
          <rect x="60" y="170" width="30" height="20" rx="5" fill="#4F46E5"/>
          <rect x="110" y="170" width="30" height="20" rx="5" fill="#4F46E5"/>
        </g>
        
        {/* Particules d'énergie */}
        <g className="animate-float">
          <circle cx="40" cy="60" r="3" fill="#60A5FA" className="animate-pulse"/>
          <circle cx="160" cy="60" r="3" fill="#60A5FA" className="animate-pulse"/>
          <circle cx="100" cy="10" r="3" fill="#60A5FA" className="animate-pulse"/>
        </g>
      </svg>
    </div>
  );

  const renderMessage = (message: Message, index: number) => (
    <div 
      key={index} 
      className={`
        flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
        mb-4
        animate-fade-in
      `}
    >
      {message.sender === 'ai' && (
        <div className="w-8 h-8 mr-2 rounded-full bg-indigo-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`
        max-w-[80%] p-4 rounded-2xl
        ${message.sender === 'user' 
          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-indigo-100 dark:border-gray-700'}
        shadow-lg hover:shadow-2xl
        transform transition-all duration-300 hover:scale-[1.02]
      `}>
        <ReactMarkdown className="prose dark:prose-invert">
          {message.text}
        </ReactMarkdown>
        <div className={`
          text-xs mt-2
          ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}
        `}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );

  const WelcomeScreen = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 z-10">
      <div className="mb-8 transform-gpu">
        <Robot3D />
      </div>
      <h2 className="text-4xl font-bold text-white mb-4 text-center animate-fade-in">
        Bienvenue sur Konekt'IA
      </h2>
      <p className="text-xl text-indigo-100 text-center animate-fade-in-delay">
        Votre assistant intelligent nouvelle génération
      </p>
      <div className="mt-6 flex space-x-2 animate-bounce">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-white rounded-full" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="
          w-96 h-[600px]
          bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
          rounded-3xl
          shadow-2xl
          flex flex-col
          border border-indigo-200 dark:border-gray-700
          overflow-hidden
          transition-all duration-500 ease-out
          transform hover:scale-[1.02]
          relative
        ">
          <div className="
            flex justify-between items-center
            px-6 py-4
            bg-gradient-to-r from-indigo-600 to-blue-600
            text-white
          ">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <h1 className="text-xl font-bold tracking-wide">Konekt'IA</h1>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="
                p-2
                rounded-full
                hover:bg-white/20
                transition-colors
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="
            flex-grow
            overflow-y-auto
            p-6
            space-y-4
            relative
            scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent
          ">
            {showWelcome ? <WelcomeScreen /> : (
              <>
                {messages.map(renderMessage)}
                {isLoading && (
                  <div className="flex justify-center">
                    <div className="flex space-x-2 items-center bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="
            p-4
            border-t border-indigo-100 dark:border-gray-700
            bg-white/50 dark:bg-gray-900/50
            backdrop-blur-sm
          ">
            <div className="
              flex
              items-center
              space-x-2
              bg-white dark:bg-gray-800
              rounded-full
              px-6
              py-3
              shadow-lg
              hover:shadow-xl
              transition-shadow
              border border-indigo-100 dark:border-gray-700
            ">
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
                  bg-transparent
                  focus:outline-none
                  text-gray-800 dark:text-gray-200
                  placeholder-gray-500
                  disabled:opacity-50
                "
              />
              <button 
                onClick={generateAnswer}
                disabled={isLoading || !input.trim()}
                className="
                  p-2
                  rounded-full
                  bg-gradient-to-r from-indigo-600 to-blue-600
                  text-white
                  hover:shadow-lg
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition-all
                  transform hover:scale-110
                "
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcome(true);
          }}
          className="
            group
            w-16 h-16
            bg-gradient-to-r from-indigo-600 to-blue-600
            rounded-full
            shadow-lg
            flex items-center justify-center
            hover:shadow-2xl
            transition-all duration-300
            transform hover:scale-110
            relative
          "
        >
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <Robot3D />
          </div>
          <div className="
            absolute
            -top-12
            left-1/2
            transform -translate-x-1/2
            bg-white
            dark:bg-gray-800
            text-gray-800
            dark:text-gray-200
            px-4
            py-2
            rounded-lg
            shadow-md
            opacity-0
            group-hover:opacity-100
            transition-opacity
            whitespace-nowrap
          ">
            Konekt'IA
          </div>
          <Sparkles className="w-8 h-8 text-white" />
        </button>
      )}
    </div>
  );
}

export default ChatBot;