import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- Component: MicrophoneIcon ---
interface MicrophoneIconProps {
  isListening: boolean;
  className?: string;
}

const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ isListening, className }) => {
  if (isListening) {
    // A square "stop" icon
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
      </svg>
    );
  }

  // A standard microphone icon for "ready to listen"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v1.5a4.5 4.5 0 109 0v-1.5a.75.75 0 011.5 0v1.5a6 6 0 11-12 0v-1.5A.75.75 0 016 10.5z" />
    </svg>
  );
};


// --- Component: SettingsIcon ---
interface SettingsIconProps {
  className?: string;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.85c-.09.55-.525.955-1.074 1.056L5.85 7.084c-.918.151-1.568.933-1.568 1.85v5.132c0 .917.65 1.699 1.568 1.85l2.126.178c.549.101.984.506 1.074 1.056l.178 2.126c.151.918.933 1.567 1.85 1.567h1.844c.917 0 1.699-.65 1.85-1.567l.178-2.126c.09-.55.525-.955 1.074-1.056l2.126-.178c.918-.151 1.568-.933 1.568-1.85v-5.132c0-.917-.65-1.699-1.568-1.85l-2.126-.178a1.125 1.125 0 01-1.074-1.056l-.178-2.126A1.875 1.875 0 0012.922 2.25h-1.844zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Component: SettingsPanel ---
interface SettingsPanelProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  fontColor: string;
  onFontColorChange: (color: string) => void;
  onClose: () => void;
}

const PRESET_COLORS = ['#FFFFFF', '#FFFF00', '#00FFFF', '#00FF00', '#FF69B4'];

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  fontSize,
  onFontSizeChange,
  fontColor,
  onFontColorChange,
  onClose,
}) => {
  // Prevent clicks inside the panel from closing the modal
  const handlePanelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm m-4 text-white"
        onClick={handlePanelClick}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold">顯示設定</h2>
          <button
            onClick={onClose}
            aria-label="關閉設定"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Font Size Control */}
          <div>
            <label htmlFor="fontSize" className="block text-lg mb-2">
              字體大小: <span className="font-semibold">{fontSize}px</span>
            </label>
            <input
              id="fontSize"
              type="range"
              min="50"
              max="250"
              step="1"
              value={fontSize}
              onChange={(e) => onFontSizeChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Font Color Control */}
          <div>
            <label className="block text-lg mb-3">字體顏色</label>
            <div className="flex items-center space-x-4">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onFontColorChange(color)}
                  aria-label={`設定顏色為 ${color}`}
                  className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    fontColor.toUpperCase() === color ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="relative w-10 h-10">
                <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => onFontColorChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="自訂顏色選擇器"
                />
                <div 
                    className="w-full h-full rounded-full border-2 border-dashed border-gray-400"
                    style={{ backgroundColor: fontColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

// Define interfaces for the Web Speech API for type safety.
// These are necessary because the official TypeScript DOM types might not include them.
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const App: React.FC = () => {
    const [transcript, setTranscript] = useState<string>('');
    const [interimTranscript, setInterimTranscript] = useState<string>('');
    const [isListening, setIsListening] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Settings State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [fontSize, setFontSize] = useState<number>(80);
    const [fontColor, setFontColor] = useState<string>('#FFFFFF');

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Load settings from localStorage on initial render
    useEffect(() => {
        try {
            const savedSize = localStorage.getItem('fontSize');
            const savedColor = localStorage.getItem('fontColor');
            if (savedSize) {
                const size = parseInt(savedSize, 10);
                if (!isNaN(size)) setFontSize(size);
            }
            if (savedColor) {
                setFontColor(savedColor);
            }
        } catch (e) {
            console.error("Failed to load settings from localStorage", e);
        }
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('fontSize', fontSize.toString());
            localStorage.setItem('fontColor', fontColor);
        } catch (e) {
            console.error("Failed to save settings to localStorage", e);
        }
    }, [fontSize, fontColor]);


    useEffect(() => {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) {
            setError('你的瀏覽器不支援語音辨識功能。');
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'zh-TW'; // Traditional Chinese (Taiwan)

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscriptSegment = '';
            let currentInterim = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscriptSegment += transcriptPart;
                } else {
                    currentInterim += transcriptPart;
                }
            }
            
            if (finalTranscriptSegment) {
                setTranscript(finalTranscriptSegment);
                setInterimTranscript('');
            } else {
                setInterimTranscript(currentInterim);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let errorMessage = `語音辨識錯誤: ${event.error}.`;
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                errorMessage = "麥克風權限被拒絕。請允許麥克風存取以使用此功能。";
            }
            setError(errorMessage);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

    }, []);

    const handleToggleListen = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setTranscript('');
            setInterimTranscript('');
            setError(null);
            try {
              recognitionRef.current.start();
              setIsListening(true);
            } catch (err) {
              setError("無法啟動麥克風，請稍後再試。");
            }
        }
    };

    return (
        <main className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none">
            <div className="absolute top-4 right-4 z-40">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    aria-label="開啟設定"
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                >
                    <SettingsIcon className="h-7 w-7" />
                </button>
            </div>

            <div className="flex-grow flex items-center justify-center w-full max-w-full px-4">
                <p 
                  className="font-bold text-center leading-relaxed break-words"
                  style={{ fontSize: `${fontSize}px`, color: fontColor }}
                >
                    {transcript}
                    <span className="opacity-60">{interimTranscript}</span>
                </p>
            </div>
            
            {error && (
                <div className="absolute top-4 left-4 right-4 bg-red-800 text-white p-3 rounded-lg text-center z-20 shadow-lg max-w-md mx-auto">
                    <p>{error}</p>
                </div>
            )}
            
            {!transcript && !interimTranscript && !isListening && !error && (
                <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
                    <p className="text-xl sm:text-2xl text-gray-500 animate-pulse">點擊麥克風按鈕開始說話</p>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-20">
                <button
                    onClick={handleToggleListen}
                    aria-label={isListening ? '停止辨識' : '開始辨識'}
                    className={`rounded-full p-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black shadow-2xl ${
                        isListening 
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 scale-110' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                >
                    <MicrophoneIcon isListening={isListening} className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </button>
            </div>
            
            {isSettingsOpen && (
                <SettingsPanel
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    fontColor={fontColor}
                    onFontColorChange={setFontColor}
                    onClose={() => setIsSettingsOpen(false)}
                />
            )}
        </main>
    );
};


// --- React App Mounting ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
