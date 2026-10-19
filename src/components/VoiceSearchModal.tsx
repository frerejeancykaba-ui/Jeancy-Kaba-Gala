import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, AlertCircle, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchConfirmed: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onSearchConfirmed,
}) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setTranscript('');
      setErrorMsg(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setErrorMsg(
        'La reconnaissance vocale n\'est pas prise en charge par ce navigateur. Tu peux taper directement ta question dans la barre de recherche.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'ln' ? 'fr-CD' : language === 'en' ? 'en-US' : 'fr-FR';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('L\'accès au microphone a été refusé. Veuillez autoriser le micro dans les paramètres du navigateur.');
        } else if (event.error === 'no-speech') {
          setErrorMsg('Aucune parole n\'a été détectée. Essaie de parler plus fort ou plus près du micro.');
        } else {
          setErrorMsg('Une erreur est survenue lors de l\'écoute. Tu peux réessayer.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to initialize speech recognition:', err);
      setIsSupported(false);
      setErrorMsg('Impossible d\'activer le microphone sur cet appareil.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleStartAgain = () => {
    setTranscript('');
    setErrorMsg(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleConfirm = () => {
    if (transcript.trim()) {
      onSearchConfirmed(transcript.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-[#111C3D] rounded-3xl shadow-2xl border border-[#1E3A8A]/10 dark:border-[#D4AF37]/20 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1E3A8A]/10 dark:bg-[#D4AF37]/15 text-[#1E3A8A] dark:text-[#D4AF37] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Recherche Vocale Biblique</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {isListening ? 'Je t\'écoute...' : 'Pose ta question oralement'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Exemple : « Pourquoi Dieu permet-il la souffrance ? » ou « Comment être sauvé ? »
        </p>

        {/* Big Mic Button with Pulsing Animation */}
        <div className="flex justify-center my-6">
          <div className="relative">
            {isListening && (
              <span className="absolute -inset-4 rounded-full bg-[#1E3A8A]/20 dark:bg-[#D4AF37]/20 animate-ping" />
            )}
            <button
              onClick={isListening ? handleStopListening : handleStartAgain}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all transform active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-red-500/30 scale-105'
                  : 'bg-gradient-to-tr from-[#1E3A8A] to-[#2563EB] text-white shadow-[#1E3A8A]/30 hover:scale-105'
              }`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-pulse text-white" />
              ) : (
                <MicOff className="w-9 h-9 text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Live Recognized Text Preview */}
        {transcript && (
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-left mb-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Texte reconnu :
            </p>
            <p className="text-base font-medium text-gray-900 dark:text-gray-100">
              « {transcript} »
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2 text-left mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {isListening ? (
            <button
              onClick={handleStopListening}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 transition-colors"
            >
              Arrêter l'écoute
            </button>
          ) : (
            <button
              onClick={handleStartAgain}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#1E3A8A]/10 dark:bg-gray-800 text-[#1E3A8A] dark:text-[#D4AF37] hover:bg-[#1E3A8A]/20 transition-colors"
            >
              Réécouter
            </button>
          )}

          {transcript.trim() && (
            <button
              onClick={handleConfirm}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold bg-[#1E3A8A] text-white hover:bg-[#172554] shadow-md transition-all transform active:scale-95"
            >
              <Check className="w-4 h-4 text-[#D4AF37]" />
              <span>Lancer la recherche</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
