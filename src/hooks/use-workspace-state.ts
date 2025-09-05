import { useState, useCallback, useMemo } from 'react';

interface WorkspaceState {
  inputPrompt: string;
  selectedModel: string;
  selectedTechnique: string;
  selectedFormat: string;
}

interface WorkspaceActions {
  setInputPrompt: (value: string) => void;
  setSelectedModel: (value: string) => void;
  setSelectedTechnique: (value: string) => void;
  setSelectedFormat: (value: string) => void;
  resetToDefaults: () => void;
}

const DEFAULT_STATE: WorkspaceState = {
  inputPrompt: '',
  selectedModel: 'deepseek/deepseek-chat-v3-0324',
  selectedTechnique: 'chain-of-thought',
  selectedFormat: 'text',
};

export function useWorkspaceState(): WorkspaceState & WorkspaceActions {
  const [state, setState] = useState<WorkspaceState>(DEFAULT_STATE);

  const setInputPrompt = useCallback((value: string) => {
    setState(prev => ({ ...prev, inputPrompt: value }));
  }, []);

  const setSelectedModel = useCallback((value: string) => {
    setState(prev => ({ ...prev, selectedModel: value }));
  }, []);

  const setSelectedTechnique = useCallback((value: string) => {
    setState(prev => ({ ...prev, selectedTechnique: value }));
  }, []);

  const setSelectedFormat = useCallback((value: string) => {
    setState(prev => ({ ...prev, selectedFormat: value }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return useMemo(() => ({
    ...state,
    setInputPrompt,
    setSelectedModel,
    setSelectedTechnique,
    setSelectedFormat,
    resetToDefaults,
  }), [state, setInputPrompt, setSelectedModel, setSelectedTechnique, setSelectedFormat, resetToDefaults]);
}
