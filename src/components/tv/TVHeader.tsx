
import React from 'react';
import { Mic, Search, Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFocus } from './FocusProvider';
import { cn } from '@/lib/utils';

interface TVHeaderProps {
  onMicClick: () => void;
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

export const TVHeader = ({ onMicClick, onSearchClick, onSettingsClick }: TVHeaderProps) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const { focusedElement } = useFocus();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm border-b border-border/20">
      {/* Left - Brand */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          WORKING EDGE
        </div>
      </div>

      {/* Center - Clock Widget */}
      <div className="flex items-center space-x-4 text-center">
        <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-border/30">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xl font-bold text-primary">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          data-focus-id="header-mic"
          onClick={onMicClick}
          className={cn(
            "w-12 h-12 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 transition-all duration-fast",
            focusedElement === 'header-mic' && "ring-4 ring-focus scale-110 shadow-glow bg-primary/20"
          )}
        >
          <Mic className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          data-focus-id="header-search"
          onClick={onSearchClick}
          className={cn(
            "w-12 h-12 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 transition-all duration-fast",
            focusedElement === 'header-search' && "ring-4 ring-focus scale-110 shadow-glow bg-primary/20"
          )}
        >
          <Search className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          data-focus-id="header-settings"
          onClick={onSettingsClick}
          className={cn(
            "w-12 h-12 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 transition-all duration-fast",
            focusedElement === 'header-settings' && "ring-4 ring-focus scale-110 shadow-glow bg-primary/20"
          )}
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};
