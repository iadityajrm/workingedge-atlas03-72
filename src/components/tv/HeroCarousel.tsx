
import React from 'react';
import { useFocus } from './FocusProvider';
import { cn } from '@/lib/utils';

interface HeroItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const heroItems: HeroItem[] = [
  {
    id: '1',
    title: 'The Crown',
    description: 'Follow the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
    category: 'Drama Series'
  },
  {
    id: '2',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    image: 'https://images.unsplash.com/photo-1489599588736-65c00750ddb0?w=1200&h=600&fit=crop',
    category: 'Sci-Fi Series'
  },
  {
    id: '3',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=600&fit=crop',
    category: 'Crime Drama'
  },
  {
    id: '4',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
    category: 'Fantasy Series'
  },
  {
    id: '5',
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
    category: 'Thriller Series'
  }
];

export const HeroCarousel = () => {
  const { focusedElement } = useFocus();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-rotate carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update current index based on focused element
  React.useEffect(() => {
    if (focusedElement?.startsWith('hero-')) {
      const index = parseInt(focusedElement.split('-')[1]);
      setCurrentIndex(index);
    }
  }, [focusedElement]);

  const currentItem = heroItems[currentIndex];

  return (
    <section className="relative h-[60vh] mb-12 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentItem.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-12">
        <div className="max-w-2xl">
          <div className="text-primary text-sm font-medium mb-2 uppercase tracking-wider">
            {currentItem.category}
          </div>
          <h1 className="text-6xl font-bold mb-6 text-foreground">
            {currentItem.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {currentItem.description}
          </p>
          <div className="flex space-x-4">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-lg focus:ring-2 focus:ring-focus transition-colors duration-fast">
              ▶ Play
            </button>
            <button className="bg-card/80 backdrop-blur-sm text-foreground px-8 py-3 rounded-lg font-semibold text-lg border border-border focus:ring-2 focus:ring-focus transition-colors duration-fast">
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-12 flex space-x-3">
        {heroItems.map((_, index) => {
          const isActive = index === currentIndex;
          const isFocused = focusedElement === `hero-${index}`;
          
          return (
            <button
              key={index}
              data-focus-id={`hero-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-fast',
                isActive ? 'bg-primary w-8' : 'bg-muted',
                isFocused && 'ring-2 ring-focus scale-110 z-50'
              )}
              style={{ zIndex: isFocused ? 50 : 'auto' }}
            />
          );
        })}
      </div>
    </section>
  );
};
