import { Filter, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ViewMode } from '../types/allocation';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onFiltersClick: () => void;
  filtersOpen: boolean;
  onAIAssistant: () => void;
  onNewAllocation: () => void;
}

export function Toolbar({
  viewMode,
  onViewModeChange,
  onFiltersClick,
  filtersOpen,
  onAIAssistant,
  onNewAllocation,
}: ToolbarProps) {
  return (
    <div className="bg-white px-6 py-2.5 border-b border-gray-200 flex items-center justify-between">
      {/* Left: View mode buttons */}
      <div className="flex items-center gap-1">
        {(['monthly', 'quarterly', 'annual'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors text-sm capitalize ${
              viewMode === mode
                ? 'bg-[#ff534c] text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onFiltersClick}
          className={`border-[#ff534c] text-[#ff534c] hover:bg-orange-50 h-8 ${filtersOpen ? 'bg-orange-50' : ''}`}
        >
          <Filter className="w-4 h-4 mr-1.5" />
          Filters
        </Button>
        <Button
          onClick={onAIAssistant}
          size="sm"
          className="bg-[#a3c9ea] hover:bg-[#8db8df] text-gray-900 text-sm h-8"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          AI Assistant
        </Button>
        <Button
          onClick={onNewAllocation}
          size="sm"
          className="bg-[#ff534c] hover:bg-[#e64840] text-white text-sm h-8"
        >
          + New Allocation
        </Button>
      </div>
    </div>
  );
}