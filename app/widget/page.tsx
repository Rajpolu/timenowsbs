'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Clock, Timer, CheckSquare, Globe, Minimize2, Maximize2, Settings, X } from 'lucide-react';

interface WidgetConfig {
  tools: string[];
  theme: 'light' | 'dark' | 'auto';
  position: { x: number; y: number };
  size: 'compact' | 'standard' | 'expanded';
}

interface WidgetPosition {
  x: number;
  y: number;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

const AVAILABLE_TOOLS = [
  { id: 'timer', name: 'Timer', icon: Timer },
  { id: 'stopwatch', name: 'Stopwatch', icon: Clock },
  { id: 'planner', name: 'Planner', icon: CheckSquare },
  { id: 'timezone', name: 'Timezone', icon: Globe },
];

export default function WidgetPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [config, setConfig] = useState<WidgetConfig>({
    tools: ['timer', 'stopwatch', 'planner'],
    theme: 'auto',
    position: { x: 0, y: 0 },
    size: 'standard',
  });
  const [position, setPosition] = useState<WidgetPosition>({
    x: 0,
    y: 0,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(config.tools[0]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('widget-config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
        setActiveTab(parsed.tools[0]);
      } catch (e) {
        console.error('Failed to load widget config');
      }
    }
  }, []);

  // Save config to localStorage
  useEffect(() => {
    localStorage.setItem('widget-config', JSON.stringify(config));
  }, [config]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    
    setPosition(prev => ({
      ...prev,
      isDragging: true,
      dragOffset: {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      },
    }));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!position.isDragging) return;

      setPosition(prev => ({
        ...prev,
        x: e.clientX - prev.dragOffset.x,
        y: e.clientY - prev.dragOffset.y,
      }));
    };

    const handleMouseUp = () => {
      setPosition(prev => ({
        ...prev,
        isDragging: false,
      }));
    };

    if (position.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position.isDragging, position.dragOffset]);

  const toggleTool = (toolId: string) => {
    setConfig(prev => ({
      ...prev,
      tools: prev.tools.includes(toolId)
        ? prev.tools.filter(t => t !== toolId)
        : [...prev.tools, toolId],
    }));
  };

  const sizeClasses = {
    compact: 'w-64 h-80',
    standard: 'w-80 h-96',
    expanded: 'w-96 h-full',
  };

  const containerStyle = isMobile
    ? {} // Full screen on mobile
    : {
        position: 'fixed' as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: position.isDragging ? 'grabbing' : 'grab',
      };

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      {/* Desktop/Embedded Widget */}
      <div
        style={containerStyle}
        className={`
          ${!isMobile ? `${sizeClasses[config.size]} rounded-xl shadow-2xl` : 'w-full h-full'}
          bg-background border border-border flex flex-col
          transition-all duration-300
          ${isMinimized && !isMobile ? 'h-14' : ''}
        `}
      >
        {/* Header - Draggable */}
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-border cursor-move select-none hover:from-primary/30 hover:to-primary/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="timenow" className="w-5 h-5" />
            <span className="font-bold text-sm">timenow Widget</span>
          </div>
          <div className="flex gap-2" data-no-drag>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-muted rounded transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            {!isMobile && (
              <button
                onClick={() => window.close()}
                className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="flex-1 overflow-auto flex flex-col">
            {showSettings ? (
              // Settings Panel
              <div className="p-4 space-y-4 flex-1 overflow-auto">
                <div>
                  <h3 className="font-semibold mb-3">Enabled Tools</h3>
                  <div className="space-y-2">
                    {AVAILABLE_TOOLS.map(tool => (
                      <label key={tool.id} className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={config.tools.includes(tool.id)}
                          onChange={() => toggleTool(tool.id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <tool.icon size={16} />
                        <span className="text-sm">{tool.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-3">Widget Size</h3>
                  <div className="space-y-2">
                    {(['compact', 'standard', 'expanded'] as const).map(size => (
                      <label key={size} className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={config.size === size}
                          onChange={() => setConfig(prev => ({ ...prev, size }))}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm capitalize">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-3">Theme</h3>
                  <div className="space-y-2">
                    {(['light', 'dark', 'auto'] as const).map(theme => (
                      <label key={theme} className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded transition-colors">
                        <input
                          type="radio"
                          name="theme"
                          value={theme}
                          checked={config.theme === theme}
                          onChange={() => setConfig(prev => ({ ...prev, theme }))}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm capitalize">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full mt-4 bg-primary text-primary-foreground rounded py-2 hover:opacity-90 transition-opacity font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              // Tool Tabs
              <>
                <div className="flex border-b border-border">
                  {config.tools.map(toolId => {
                    const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
                    if (!tool) return null;
                    return (
                      <button
                        key={toolId}
                        onClick={() => setActiveTab(toolId)}
                        className={`flex-1 flex items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors border-b-2 ${
                          activeTab === toolId
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <tool.icon size={16} />
                        <span className="hidden sm:inline">{tool.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tool Content */}
                <div className="flex-1 p-4 space-y-4">
                  {activeTab === 'timer' && (
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-center text-primary">00:25</div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-primary text-primary-foreground rounded py-2 hover:opacity-90 transition-opacity">Start</button>
                        <button className="flex-1 border border-border rounded py-2 hover:bg-muted transition-colors">Reset</button>
                      </div>
                      <input
                        type="number"
                        defaultValue="25"
                        className="w-full bg-muted border border-border rounded px-3 py-2 text-center"
                        min="1"
                        max="60"
                      />
                    </div>
                  )}

                  {activeTab === 'stopwatch' && (
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-center text-primary">00:00:00</div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-primary text-primary-foreground rounded py-2 hover:opacity-90 transition-opacity">Start</button>
                        <button className="flex-1 border border-border rounded py-2 hover:bg-muted transition-colors">Lap</button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'planner' && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {['Complete Project', 'Review Code', 'Update Docs'].map((task, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 bg-muted rounded">
                            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                            <span className="text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add a task..."
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {activeTab === 'timezone' && (
                    <div className="space-y-3">
                      {['New York', 'London', 'Tokyo', 'Sydney'].map((city, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm font-semibold">{city}</span>
                          <span className="text-sm text-muted-foreground">12:30 PM</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Instructions for standalone mode */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-4">
          <div className="bg-muted border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground">
            Swipe up to customize
          </div>
        </div>
      )}
    </div>
  );
}
