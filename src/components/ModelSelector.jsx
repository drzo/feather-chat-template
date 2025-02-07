import { useState, useEffect } from 'react';
import { fetchModels } from '../services/api';

const POPULAR_MODELS = [
  'mistralai/Mistral-Nemo-Instruct-2407',
  'Sao10K/L3.3-70B-Euryale-v2.3',
  'deepseek-ai/DeepSeek-R1',
  'meta-llama/Meta-Llama-3.1-8B-Instruct',
  'mistralai/Mistral-Small-24B-Instruct-2501',
  'Qwen/Qwen2.5-32B-Instruct',
  'Qwen/Qwen2.5-72B-Instruct'
];

export default function ModelSelector({ selectedModel, onModelSelect }) {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('popular'); // 'popular' or 'all'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      const availableModels = await fetchModels();
      setModels(availableModels.filter(m => m.available_on_current_plan));
      setIsLoading(false);
    };
    loadModels();
  }, []);

  const popularModels = models.filter(model => 
    POPULAR_MODELS.includes(model.id)
  );

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border rounded-lg bg-[#f0f0e6] dark:bg-gray-800 dark:text-white shadow-sm hover:border-[#1db954] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="block truncate text-sm">
              {isLoading 
                ? 'Loading models...' 
                : (models.find(m => m.id === selectedModel)?.name || selectedModel)}
            </span>
            <svg
              className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-[#f0f0e6] dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setView('popular')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  view === 'popular' 
                    ? 'text-[#1db954] border-b-2 border-[#1db954]' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setView('all')}
                className={`flex-1 px-4 py-2 text-sm font-medium ${
                  view === 'all' 
                    ? 'text-[#1db954] border-b-2 border-[#1db954]' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                All Models
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {view === 'popular' ? (
                <div className="p-2">
                  {popularModels.map(model => (
                    <ModelOption 
                      key={model.id}
                      model={model}
                      isSelected={model.id === selectedModel}
                      onSelect={() => {
                        onModelSelect(model.id);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954]"
                    />
                  </div>
                  <div className="p-2">
                    {filteredModels.map(model => (
                      <ModelOption 
                        key={model.id}
                        model={model}
                        isSelected={model.id === selectedModel}
                        onSelect={() => {
                          onModelSelect(model.id);
                          setIsOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModelOption({ model, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${
        isSelected 
          ? 'bg-[#1db954]/20 text-gray-900 dark:text-white' 
          : 'hover:bg-[#e6e6dc] dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="block truncate">{model.name}</span>
        {isSelected && (
          <svg className="w-4 h-4 text-[#1db954]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
}