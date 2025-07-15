
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

export const VoiceOverlay = ({ isActive, onClose }: VoiceOverlayProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'waiting' | 'listening' | 'processing' | 'response'>('waiting');

  useEffect(() => {
    if (isActive) {
      setStatus('waiting');
      // Simulate voice activation
      const timer = setTimeout(() => {
        setStatus('listening');
        setIsListening(true);
        // Simulate listening for 3 seconds
        setTimeout(() => {
          setStatus('processing');
          setIsListening(false);
          setTranscript('Play The Matrix movie');
          // Simulate processing
          setTimeout(() => {
            setStatus('response');
            setTimeout(() => {
              onClose();
            }, 2000);
          }, 1000);
        }, 3000);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onClose]);

  if (!isActive) return null;

  const getStatusText = () => {
    switch (status) {
      case 'waiting':
        return 'Say "Hey Atlas" to activate...';
      case 'listening':
        return 'Listening...';
      case 'processing':
        return 'Processing your request...';
      case 'response':
        return 'Playing The Matrix movie';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'waiting':
        return 'text-muted-foreground';
      case 'listening':
        return 'text-primary';
      case 'processing':
        return 'text-accent';
      case 'response':
        return 'text-green-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      {/* Compact Voice Assistant Card */}
      <div className="bg-card/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-8 border border-border/50 shadow-2xl animate-scale-in">
        
        {/* Voice Visualizer */}
        <div className="flex items-center justify-center mb-6">
          <div className={cn(
            'relative w-20 h-20 rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-primary/20 to-accent/20 border-2',
            isListening ? 'border-primary animate-pulse' : 'border-border',
            'transition-all duration-fast'
          )}>
            {isListening ? (
              <Mic className="w-8 h-8 text-primary animate-pulse" />
            ) : (
              <MicOff className="w-8 h-8 text-muted-foreground" />
            )}
            
            {/* Listening Animation */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDelay: '0.2s' }} />
              </>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-4">
          <p className={cn('text-base font-medium', getStatusColor())}>
            {getStatusText()}
          </p>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-muted/30 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <Volume2 className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">You said:</span>
            </div>
            <p className="text-foreground text-sm">"{transcript}"</p>
          </div>
        )}

        {/* Processing Indicator */}
        {status === 'processing' && (
          <div className="flex items-center justify-center space-x-1 mb-4">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}

        {/* Response */}
        {status === 'response' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4 animate-scale-in">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-xs font-medium text-green-400">Atlas:</span>
            </div>
            <p className="text-foreground text-sm">Opening The Matrix movie for you...</p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Try: "Play a movie", "Open Netflix", "Show watchlist"</p>
        </div>
      </div>
    </div>
  );
};
