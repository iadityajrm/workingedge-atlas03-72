
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'app';
  image: string;
  rating?: string;
  year?: string;
}

interface SearchOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'The Matrix',
    type: 'movie',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop',
    rating: '8.7',
    year: '1999'
  },
  {
    id: '2',
    title: 'Netflix',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Stranger Things',
    type: 'series',
    image: 'https://images.unsplash.com/photo-1489599588736-65c00750ddb0?w=200&h=300&fit=crop',
    rating: '8.7',
    year: '2016'
  },
  {
    id: '4',
    title: 'Inception',
    type: 'movie',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=300&fit=crop',
    rating: '8.8',
    year: '2010'
  },
  {
    id: '5',
    title: 'YouTube',
    type: 'app',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=200&fit=crop',
  },
  {
    id: '6',
    title: 'The Crown',
    type: 'series',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop',
    rating: '8.6',
    year: '2016'
  }
];

export const SearchOverlay = ({ isActive, onClose }: SearchOverlayProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (isActive) {
      // Focus the search input when overlay opens
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
      setFocusedIndex(-1);
    }
  }, [isActive]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults(mockResults);
      setIsSearching(false);
    }
  }, [searchTerm]);

  // Keyboard navigation for search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < results.length) {
            handleResultClick(results[focusedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, results, focusedIndex, onClose]);

  const handleResultClick = (result: SearchResult) => {
    console.log(`Selected: ${result.title} (${result.type})`);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return '🎬';
      case 'series':
        return '📺';
      case 'app':
        return '📱';
      default:
        return '📄';
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 animate-fade-in">
      <div className="container mx-auto px-8 py-8 h-full flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Search</h2>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 focus:ring-2 focus:ring-focus transition-all duration-fast flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies, shows, apps..."
              className="w-full bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl pl-14 pr-6 py-4 text-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-focus focus:border-focus transition-all duration-fast"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    'group relative rounded-xl overflow-hidden shadow-soft transition-all duration-fast',
                    focusedIndex === index && 'ring-4 ring-focus scale-105 shadow-glow z-10'
                  )}
                  style={{ zIndex: focusedIndex === index ? 10 : 'auto' }}
                >
                  {/* Image */}
                  <div className={cn(
                    'relative',
                    result.type === 'app' ? 'aspect-square' : 'aspect-[2/3]'
                  )}>
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white">
                      {getTypeIcon(result.type)} {result.type}
                    </div>

                    {/* Focus Overlay */}
                    {focusedIndex === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                            {result.title}
                          </h3>
                          {result.rating && result.year && (
                            <div className="flex items-center justify-between text-white/80 text-xs">
                              <span>⭐ {result.rating}</span>
                              <span>{result.year}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Play Button */}
                    {focusedIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="p-3 bg-card">
                    <h3 className="text-foreground font-medium text-sm truncate">
                      {result.title}
                    </h3>
                    {result.year && (
                      <p className="text-muted-foreground text-xs mt-1">
                        {result.year}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">Try searching for something else</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Start typing to search</h3>
              <p className="text-muted-foreground">Find movies, shows, and apps</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center pt-6 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            Use arrow keys to navigate • Press Enter to select • ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};
