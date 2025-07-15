
import React from 'react';
import { useFocus } from './FocusProvider';
import { cn } from '@/lib/utils';

interface AppItem {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const apps: AppItem[] = [
  { id: 'netflix', name: 'Netflix', icon: '🎬', color: 'from-red-600 to-red-700' },
  { id: 'youtube', name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600' },
  { id: 'prime', name: 'Prime Video', icon: '🎭', color: 'from-blue-600 to-blue-700' },
  { id: 'plex', name: 'Plex', icon: '📡', color: 'from-orange-500 to-orange-600' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', color: 'from-green-500 to-green-600' },
  { id: 'hbo', name: 'HBO Max', icon: '🎪', color: 'from-purple-600 to-purple-700' },
  { id: 'disney', name: 'Disney+', icon: '🏰', color: 'from-blue-500 to-blue-600' },
  { id: 'hulu', name: 'Hulu', icon: '📱', color: 'from-green-400 to-green-500' }
];

export const AppGrid = () => {
  const { focusedElement } = useFocus();

  const handleAppClick = (appId: string) => {
    console.log(`Opening ${appId} app`);
    // Here you would implement the actual app opening logic
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Apps</h2>
      
      <div className="grid grid-cols-8 gap-6">
        {apps.map((app, index) => {
          const isFocused = focusedElement === `app-${index}`;
          
          return (
            <button
              key={app.id}
              data-focus-id={`app-${index}`}
              onClick={() => handleAppClick(app.id)}
              className={cn(
                'group relative aspect-square rounded-2xl transition-all duration-fast',
                'bg-gradient-to-br', app.color,
                'shadow-soft',
                isFocused && 'ring-4 ring-focus scale-105 shadow-glow z-50'
              )}
              style={{ zIndex: isFocused ? 50 : 'auto' }}
            >
              {/* App Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl filter drop-shadow-lg">
                  {app.icon}
                </span>
              </div>
              
              {/* App Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-3">
                <span className="text-white text-sm font-medium truncate block">
                  {app.name}
                </span>
              </div>

              {/* Focus Indicator */}
              {isFocused && (
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-focus/20 to-focus/20 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
