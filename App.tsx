import React, { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon } from './components/MicrophoneIcon';
import { SettingsIcon } from './components/SettingsIcon';
import { SettingsPanel } from './components/SettingsPanel';

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

export default App;
