import React, { createContext, useContext, useState, useEffect } from 'react';

interface FocusContextType {
  focusedElement: string | null;
  setFocusedElement: (id: string | null) => void;
  navigateVertical: (direction: 'up' | 'down') => void;
  navigateHorizontal: (direction: 'left' | 'right') => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};

interface FocusProviderProps {
  children: React.ReactNode;
}

export const FocusProvider = ({ children }: FocusProviderProps) => {
  const [focusedElement, setFocusedElement] = useState<string | null>('header-mic');

  // Auto-scroll to keep focused element centered
  const scrollToFocusedElement = (elementId: string) => {
    setTimeout(() => {
      const element = document.querySelector(`[data-focus-id="${elementId}"]`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }, 50);
  };

  // Update focused element and scroll to it
  const updateFocusedElement = (id: string | null) => {
    setFocusedElement(id);
    if (id) {
      scrollToFocusedElement(id);
    }
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          navigateVertical('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateVertical('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateHorizontal('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateHorizontal('right');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          activateFocusedElement();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement]);

  const navigateVertical = (direction: 'up' | 'down') => {
    if (!focusedElement) return;

    const [section, ...rest] = focusedElement.split('-');
    const indexStr = rest[rest.length - 1];
    const index = parseInt(indexStr);

    switch (section) {
      case 'header':
        if (direction === 'down') {
          updateFocusedElement('hero-0');
        }
        break;
      case 'hero':
        if (direction === 'up') {
          updateFocusedElement('header-mic');
        } else if (direction === 'down') {
          updateFocusedElement('app-0');
        }
        break;
      case 'app':
        if (direction === 'up') {
          updateFocusedElement('hero-0');
        } else if (direction === 'down') {
          updateFocusedElement('content-trending-movies-0');
        }
        break;
      case 'content':
        const category = rest.slice(0, -1).join('-');
        if (direction === 'up') {
          if (category === 'trending-movies') {
            updateFocusedElement('app-0');
          } else if (category === 'popular-tv') {
            updateFocusedElement('content-trending-movies-0');
          } else if (category === 'continue-watching') {
            updateFocusedElement('content-popular-tv-0');
          } else if (category === 'recently-added') {
            updateFocusedElement('content-continue-watching-0');
          }
        } else if (direction === 'down') {
          if (category === 'trending-movies') {
            updateFocusedElement('content-popular-tv-0');
          } else if (category === 'popular-tv') {
            updateFocusedElement('content-continue-watching-0');
          } else if (category === 'continue-watching') {
            updateFocusedElement('content-recently-added-0');
          }
          // recently-added is the last section, no down navigation
        }
        break;
    }
  };

  const navigateHorizontal = (direction: 'left' | 'right') => {
    if (!focusedElement) return;

    const [section, ...rest] = focusedElement.split('-');
    const indexStr = rest[rest.length - 1];
    const index = parseInt(indexStr);

    switch (section) {
      case 'header':
        const headerButtons = ['mic', 'search', 'settings'];
        const currentHeaderIndex = headerButtons.indexOf(rest.join('-'));
        if (direction === 'right' && currentHeaderIndex < headerButtons.length - 1) {
          updateFocusedElement(`header-${headerButtons[currentHeaderIndex + 1]}`);
        } else if (direction === 'left' && currentHeaderIndex > 0) {
          updateFocusedElement(`header-${headerButtons[currentHeaderIndex - 1]}`);
        }
        break;
      case 'hero':
        const maxHero = 4; // 5 hero items
        if (direction === 'right' && index < maxHero) {
          updateFocusedElement(`hero-${index + 1}`);
        } else if (direction === 'left' && index > 0) {
          updateFocusedElement(`hero-${index - 1}`);
        }
        break;
      case 'app':
        const maxApps = 7; // 8 apps
        if (direction === 'right' && index < maxApps) {
          updateFocusedElement(`app-${index + 1}`);
        } else if (direction === 'left' && index > 0) {
          updateFocusedElement(`app-${index - 1}`);
        }
        break;
      case 'content':
        const category = rest.slice(0, -1).join('-');
        const maxContent = 5; // 6 content items per row
        if (direction === 'right' && index < maxContent) {
          updateFocusedElement(`content-${category}-${index + 1}`);
        } else if (direction === 'left' && index > 0) {
          updateFocusedElement(`content-${category}-${index - 1}`);
        }
        break;
    }
  };

  const activateFocusedElement = () => {
    if (!focusedElement) return;
    
    const element = document.querySelector(`[data-focus-id="${focusedElement}"]`);
    if (element) {
      (element as HTMLElement).click();
    }
  };

  return (
    <FocusContext.Provider value={{
      focusedElement,
      setFocusedElement: updateFocusedElement,
      navigateVertical,
      navigateHorizontal
    }}>
      {children}
    </FocusContext.Provider>
  );
};
