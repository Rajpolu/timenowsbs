'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export interface WidgetConfig {
  tools: string[];
  theme: 'light' | 'dark' | 'auto';
  position: { x: number; y: number };
  size: 'compact' | 'standard' | 'expanded';
  customColors?: {
    primary: string;
    background: string;
    text: string;
  };
}

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  totalSessions: number;
}

interface StopwatchState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  laps: string[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface WidgetState {
  config: WidgetConfig;
  timer: TimerState;
  stopwatch: StopwatchState;
  tasks: Task[];
  timezone: string;
}

const DEFAULT_CONFIG: WidgetConfig = {
  tools: ['timer', 'stopwatch', 'planner'],
  theme: 'auto',
  position: { x: 0, y: 0 },
  size: 'standard',
  customColors: {
    primary: '#F4C430',
    background: '#1a1a1a',
    text: '#ffffff',
  },
};

const DEFAULT_STATE: WidgetState = {
  config: DEFAULT_CONFIG,
  timer: {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    totalSessions: 0,
  },
  stopwatch: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
    laps: [],
  },
  tasks: [],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const useWidgetState = (userId?: string) => {
  const [state, setState] = useState<WidgetState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage and Supabase
  useEffect(() => {
    const loadState = async () => {
      try {
        setIsLoading(true);

        // First, try to load from localStorage
        const localState = localStorage.getItem('widget-state');
        if (localState) {
          const parsed = JSON.parse(localState);
          setState(parsed);
        }

        // If user is logged in, sync with Supabase
        if (userId) {
          const supabase = getSupabaseClient();
          const { data, error } = await supabase
            .from('widget_configs')
            .select('*')
            .eq('user_id', userId)
            .single();

          if (!error && data) {
            setState(prev => ({
              ...prev,
              config: { ...prev.config, ...data.config },
            }));
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load widget state:', err);
        setError(err instanceof Error ? err.message : 'Failed to load state');
        setIsLoading(false);
      }
    };

    loadState();
  }, [userId]);

  // Save state to localStorage (auto-save)
  useEffect(() => {
    localStorage.setItem('widget-state', JSON.stringify(state));
  }, [state]);

  // Save state to Supabase
  const saveToSupabase = useCallback(async () => {
    if (!userId) return;

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('widget_configs')
        .upsert(
          {
            user_id: userId,
            config: state.config,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  }, [userId, state.config]);

  // Update config
  const updateConfig = useCallback((updates: Partial<WidgetConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...updates },
    }));
  }, []);

  // Update timer
  const updateTimer = useCallback((updates: Partial<TimerState>) => {
    setState(prev => ({
      ...prev,
      timer: { ...prev.timer, ...updates },
    }));
  }, []);

  // Update stopwatch
  const updateStopwatch = useCallback((updates: Partial<StopwatchState>) => {
    setState(prev => ({
      ...prev,
      stopwatch: { ...prev.stopwatch, ...updates },
    }));
  }, []);

  // Add task
  const addTask = useCallback((title: string) => {
    const task: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      tasks: [task, ...prev.tasks],
    }));
  }, []);

  // Update task
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t)),
    }));
  }, []);

  // Delete task
  const deleteTask = useCallback((taskId: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId),
    }));
  }, []);

  // Add lap to stopwatch
  const addLap = useCallback(() => {
    const lapTime = `${String(state.stopwatch.hours).padStart(2, '0')}:${String(state.stopwatch.minutes).padStart(2, '0')}:${String(state.stopwatch.seconds).padStart(2, '0')}`;
    setState(prev => ({
      ...prev,
      stopwatch: {
        ...prev.stopwatch,
        laps: [lapTime, ...prev.stopwatch.laps],
      },
    }));
  }, [state.stopwatch.hours, state.stopwatch.minutes, state.stopwatch.seconds]);

  // Reset all
  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    localStorage.removeItem('widget-state');
  }, []);

  // Export data
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `widget-state-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [state]);

  // Import data
  const importData = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        try {
          const imported = JSON.parse(event.target?.result as string) as WidgetState;
          setState(imported);
          localStorage.setItem('widget-state', JSON.stringify(imported));
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return {
    state,
    isLoading,
    error,
    updateConfig,
    updateTimer,
    updateStopwatch,
    addTask,
    updateTask,
    deleteTask,
    addLap,
    resetAll,
    exportData,
    importData,
    saveToSupabase,
  };
};

export default useWidgetState;
