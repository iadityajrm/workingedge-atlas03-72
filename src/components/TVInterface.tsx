import React, { useState, useEffect } from 'react';
import { TVHeader } from './tv/TVHeader';
import { HeroCarousel } from './tv/HeroCarousel';
import { AppGrid } from './tv/AppGrid';
import { ContentRow } from './tv/ContentRow';
import { VoiceOverlay } from './tv/VoiceOverlay';
import { SearchOverlay } from './tv/SearchOverlay';
import { SettingsSidebar } from './tv/SettingsSidebar';
import { FocusProvider } from './tv/FocusProvider';

export const TVInterface = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  // Voice activation listener for "Hey Atlas"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle voice with 'V' key for demo (replace with actual voice detection)
      if (e.key.toLowerCase() === 'v' && !isSearchActive && !isSettingsActive) {
        setIsVoiceActive(!isVoiceActive);
      }
      // Toggle search with '/' key
      if (e.key === '/' && !isVoiceActive && !isSettingsActive) {
        e.preventDefault();
        setIsSearchActive(!isSearchActive);
      }
      // Escape key closes all overlays
      if (e.key === 'Escape') {
        setIsVoiceActive(false);
        setIsSearchActive(false);
        setIsSettingsActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceActive, isSearchActive, isSettingsActive]);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setIsVoiceActive(false);
    setIsSettingsActive(false);
  };

  const handleSettingsToggle = () => {
    setIsSettingsActive(!isSettingsActive);
    setIsVoiceActive(false);
    setIsSearchActive(false);
  };

  return (
    <FocusProvider>
      <div className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Main TV Interface */}
        <div className="relative">
          <TVHeader 
            onSearchClick={handleSearchToggle}
            onSettingsClick={handleSettingsToggle}
            onMicClick={() => setIsVoiceActive(!isVoiceActive)}
          />
          
          <main className="px-8 pb-8">
            {/* Hero Section with Recommendations Carousel */}
            <HeroCarousel />
            
            {/* Apps Section */}
            <AppGrid />
            
            {/* Content Recommendations */}
            <ContentRow title="Trending Movies" category="trending-movies" />
            <ContentRow title="Popular TV Shows" category="popular-tv" />
            <ContentRow title="Continue Watching" category="continue-watching" />
            <ContentRow title="Recently Added" category="recently-added" />
          </main>
        </div>

        {/* Overlays */}
        {isVoiceActive && (
          <VoiceOverlay 
            isActive={isVoiceActive}
            onClose={() => setIsVoiceActive(false)}
          />
        )}
        
        {isSearchActive && (
          <SearchOverlay 
            isActive={isSearchActive}
            onClose={() => setIsSearchActive(false)}
          />
        )}
        
        {isSettingsActive && (
          <SettingsSidebar 
            isActive={isSettingsActive}
            onClose={() => setIsSettingsActive(false)}
          />
        )}
      </div>
    </FocusProvider>
  );
};