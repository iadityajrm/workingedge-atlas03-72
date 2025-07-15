import React from 'react';
import { useFocus } from './FocusProvider';
import { cn } from '@/lib/utils';
interface ContentItem {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
  duration?: string;
}
interface ContentRowProps {
  title: string;
  category: string;
}

// Sample content data
const getContentByCategory = (category: string): ContentItem[] => {
  const baseContent = [{
    id: '1',
    title: 'The Matrix',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    rating: '8.7',
    year: '1999',
    duration: '2h 16m'
  }, {
    id: '2',
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1489599588736-65c00750ddb0?w=300&h=450&fit=crop',
    rating: '8.8',
    year: '2010',
    duration: '2h 28m'
  }, {
    id: '3',
    title: 'Interstellar',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop',
    rating: '8.6',
    year: '2014',
    duration: '2h 49m'
  }, {
    id: '4',
    title: 'The Godfather',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
    rating: '9.2',
    year: '1972',
    duration: '2h 55m'
  }, {
    id: '5',
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop',
    rating: '8.9',
    year: '1994',
    duration: '2h 34m'
  }, {
    id: '6',
    title: 'Fight Club',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop',
    rating: '8.8',
    year: '1999',
    duration: '2h 19m'
  }];

  // Return different content based on category
  return baseContent.map((item, index) => ({
    ...item,
    id: `${category}-${index}`,
    title: `${item.title} ${category.includes('tv') ? 'Series' : ''}`
  }));
};
export const ContentRow = ({
  title,
  category
}: ContentRowProps) => {
  const {
    focusedElement
  } = useFocus();
  const content = getContentByCategory(category);
  const handleContentClick = (item: ContentItem) => {
    console.log(`Playing ${item.title}`);
    // Here you would implement the actual content playing logic
  };
  return <section className="mb-10 relative my-0 py-[20px]">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      
      <div className="flex space-x-4 overflow-x-hidden relative z-10">
        {content.map((item, index) => {
        const focusId = `content-${category}-${index}`;
        const isFocused = focusedElement === focusId;
        return <button key={item.id} data-focus-id={focusId} onClick={() => handleContentClick(item)} className={cn('group relative flex-shrink-0 w-48 transition-all duration-fast', 'rounded-xl overflow-hidden shadow-soft', isFocused && 'ring-4 ring-focus scale-105 shadow-glow')} style={{
          zIndex: isFocused ? 100 : 10,
          position: 'relative'
        }}>
              {/* Poster Image */}
              <div className="aspect-[2/3] relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                
                {/* Overlay on focus */}
                <div className={cn('absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent', 'transition-opacity duration-fast', isFocused ? 'opacity-100' : 'opacity-0')}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-white/80 text-xs">
                      <span>⭐ {item.rating}</span>
                      <span>{item.year}</span>
                    </div>
                    <div className="text-white/60 text-xs mt-1">
                      {item.duration}
                    </div>
                  </div>
                </div>

                {/* Play Button on Focus */}
                {isFocused && <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-scale-in">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>}
              </div>

              {/* Title (always visible) */}
              <div className="p-3 bg-card">
                <h3 className="text-foreground font-medium text-sm truncate">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  {item.year} • {item.duration}
                </p>
              </div>

              {/* Focus Indicator */}
              {isFocused && <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-focus/20 to-focus/20 animate-pulse -z-10" />}
            </button>;
      })}
      </div>
    </section>;
};