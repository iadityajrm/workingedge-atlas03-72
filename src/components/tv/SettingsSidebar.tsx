import React from 'react';
import { X, Monitor, Volume2, Wifi, Users, Shield, Info, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SettingsSidebarProps {
  isActive: boolean;
  onClose: () => void;
}

const settingsItems: SettingsItem[] = [
  {
    id: 'display',
    label: 'Display & Picture',
    icon: Monitor,
    description: 'Screen resolution, brightness, and picture settings'
  },
  {
    id: 'audio',
    label: 'Audio & Sound',
    icon: Volume2,
    description: 'Volume, sound effects, and audio output settings'
  },
  {
    id: 'network',
    label: 'Network & Internet',
    icon: Wifi,
    description: 'Wi-Fi, ethernet, and connectivity settings'
  },
  {
    id: 'accounts',
    label: 'Accounts & Profiles',
    icon: Users,
    description: 'User profiles, parental controls, and account management'
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    icon: Shield,
    description: 'Data collection, voice settings, and security options'
  },
  {
    id: 'about',
    label: 'System Info',
    icon: Info,
    description: 'Device information, updates, and system details'
  },
  {
    id: 'power',
    label: 'Power & Sleep',
    icon: Power,
    description: 'Sleep timer, power saving, and shutdown options'
  }
];

export const SettingsSidebar = ({ isActive, onClose }: SettingsSidebarProps) => {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    console.log(`Opening ${itemId} settings`);
    // Here you would implement the actual settings navigation
  };

  if (!isActive) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-96 bg-card/95 backdrop-blur-xl border-l border-border/30 z-50 animate-slide-left shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground mt-1">Working Edge Smart TV</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/30 hover:bg-muted transition-colors duration-fast flex items-center justify-center focus:ring-2 focus:ring-focus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl transition-all duration-fast',
                    'hover:bg-muted/50 focus:ring-2 focus:ring-focus',
                    isSelected ? 'bg-primary/10 border border-primary/20' : 'bg-transparent'
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      'bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20'
                    )}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        'font-semibold mb-1',
                        isSelected ? 'text-primary' : 'text-foreground'
                      )}>
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Working Edge Smart TV OS
            </p>
            <p className="text-xs text-muted-foreground">
              Version 1.0.0 • Raspberry Pi Edition
            </p>
          </div>
        </div>
      </div>
    </>
  );
};