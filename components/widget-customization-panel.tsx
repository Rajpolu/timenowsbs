'use client';

import { useState } from 'react';
import { WidgetConfig } from '@/hooks/useWidgetState';
import { Palette, Layout, Zap, Save, RotateCcw } from 'lucide-react';

interface WidgetCustomizationPanelProps {
  config: WidgetConfig;
  onSave: (config: WidgetConfig) => void;
  onReset: () => void;
}

const PRESET_THEMES = [
  {
    name: 'Gold Standard',
    colors: { primary: '#F4C430', background: '#1a1a1a', text: '#ffffff' },
  },
  {
    name: 'Ocean',
    colors: { primary: '#0EA5E9', background: '#0f172a', text: '#f1f5f9' },
  },
  {
    name: 'Forest',
    colors: { primary: '#10b981', background: '#0f2f1f', text: '#f0fdf4' },
  },
  {
    name: 'Sunset',
    colors: { primary: '#f97316', background: '#1f1f1f', text: '#fafaf9' },
  },
  {
    name: 'Purple Dream',
    colors: { primary: '#a855f7', background: '#1a0033', text: '#faf5ff' },
  },
  {
    name: 'Light Mode',
    colors: { primary: '#3b82f6', background: '#ffffff', text: '#1f2937' },
  },
];

const PRESET_CONFIGS = [
  {
    name: 'Productivity Focus',
    description: 'Timer, Planner, Timezone',
    config: {
      tools: ['timer', 'planner', 'timezone'],
      size: 'standard' as const,
    },
  },
  {
    name: 'Time Tracking',
    description: 'Timer, Stopwatch, Tasks',
    config: {
      tools: ['timer', 'stopwatch', 'planner'],
      size: 'standard' as const,
    },
  },
  {
    name: 'Global Team',
    description: 'Timezone, Timer, Planner',
    config: {
      tools: ['timezone', 'timer', 'planner'],
      size: 'expanded' as const,
    },
  },
  {
    name: 'Minimal',
    description: 'Timer only',
    config: {
      tools: ['timer'],
      size: 'compact' as const,
    },
  },
];

export default function WidgetCustomizationPanel({
  config,
  onSave,
  onReset,
}: WidgetCustomizationPanelProps) {
  const [tempConfig, setTempConfig] = useState<WidgetConfig>(config);
  const [activeTab, setActiveTab] = useState<'tools' | 'appearance' | 'presets'>('tools');

  const handleToolToggle = (toolId: string) => {
    setTempConfig(prev => ({
      ...prev,
      tools: prev.tools.includes(toolId)
        ? prev.tools.filter(t => t !== toolId)
        : [...prev.tools, toolId],
    }));
  };

  const handleSizeChange = (size: WidgetConfig['size']) => {
    setTempConfig(prev => ({ ...prev, size }));
  };

  const handleThemeChange = (theme: WidgetConfig['theme']) => {
    setTempConfig(prev => ({ ...prev, theme }));
  };

  const handleColorChange = (
    colorType: 'primary' | 'background' | 'text',
    value: string
  ) => {
    setTempConfig(prev => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [colorType]: value,
      },
    }));
  };

  const applyPresetTheme = (colors: typeof PRESET_THEMES[0]['colors']) => {
    setTempConfig(prev => ({
      ...prev,
      customColors: colors,
    }));
  };

  const applyPresetConfig = (presetConfig: (typeof PRESET_CONFIGS[0])['config']) => {
    setTempConfig(prev => ({
      ...prev,
      ...presetConfig,
    }));
  };

  const handleSave = () => {
    onSave(tempConfig);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-6">
        {(['tools', 'appearance', 'presets'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'tools' && <span className="flex items-center gap-2"><Zap size={16} /> Tools</span>}
            {tab === 'appearance' && <span className="flex items-center gap-2"><Palette size={16} /> Appearance</span>}
            {tab === 'presets' && <span className="flex items-center gap-2"><Layout size={16} /> Presets</span>}
          </button>
        ))}
      </div>

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Enabled Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'timer', name: 'Timer', description: 'Pomodoro timer' },
                { id: 'stopwatch', name: 'Stopwatch', description: 'Time tracking' },
                { id: 'planner', name: 'Planner', description: 'Task management' },
                { id: 'timezone', name: 'Timezone', description: 'World times' },
              ].map(tool => (
                <label
                  key={tool.id}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={tempConfig.tools.includes(tool.id)}
                    onChange={() => handleToolToggle(tool.id)}
                    className="w-5 h-5 cursor-pointer mt-1 rounded"
                  />
                  <div>
                    <p className="font-semibold">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Widget Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 'compact' as const, label: 'Compact', w: 'w-40', h: 'h-48' },
                { size: 'standard' as const, label: 'Standard', w: 'w-48', h: 'h-64' },
                { size: 'expanded' as const, label: 'Expanded', w: 'w-64', h: 'h-full' },
              ].map(option => (
                <button
                  key={option.size}
                  onClick={() => handleSizeChange(option.size)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tempConfig.size === option.size
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className={`mx-auto mb-2 ${option.w} ${option.h} border-2 border-dashed border-current rounded`} />
                  <p className="text-sm font-semibold">{option.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Theme Mode</h3>
            <div className="flex gap-3">
              {(['light', 'dark', 'auto'] as const).map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                    tempConfig.theme === theme
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {theme === 'auto' ? 'System' : theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Custom Colors</h3>
            <div className="space-y-4">
              {[
                { key: 'primary', label: 'Primary Color', description: 'Main accent color' },
                { key: 'background', label: 'Background', description: 'Widget background' },
                { key: 'text', label: 'Text Color', description: 'Primary text color' },
              ].map(color => (
                <div key={color.key} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{color.label}</p>
                    <p className="text-xs text-muted-foreground">{color.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tempConfig.customColors?.[color.key as keyof typeof tempConfig.customColors] || '#000000'}
                      onChange={e =>
                        handleColorChange(
                          color.key as 'primary' | 'background' | 'text',
                          e.target.value
                        )
                      }
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempConfig.customColors?.[color.key as keyof typeof tempConfig.customColors] || '#000000'}
                      onChange={e =>
                        handleColorChange(
                          color.key as 'primary' | 'background' | 'text',
                          e.target.value
                        )
                      }
                      className="w-24 px-3 py-2 text-sm rounded border border-border bg-background text-foreground font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">Preset Themes</h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_THEMES.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyPresetTheme(preset.colors)}
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: preset.colors.background }}
                    />
                  </div>
                  <p className="text-sm font-semibold">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Presets Tab */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          {PRESET_CONFIGS.map(preset => (
            <button
              key={preset.name}
              onClick={() => applyPresetConfig(preset.config)}
              className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors text-left"
            >
              <p className="font-semibold">{preset.name}</p>
              <p className="text-sm text-muted-foreground">{preset.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border hover:bg-muted transition-colors font-semibold"
        >
          <RotateCcw size={18} />
          Reset
        </button>
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
