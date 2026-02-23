import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ViewMode } from '../types/allocation';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentDate: Date;
  onDateChange: (direction: 'prev' | 'next') => void;
  onNewAllocation: () => void;
  onAIAssistant: () => void;
  currentPeriod: string;
}

export function Header({
  viewMode,
  onViewModeChange,
  currentDate,
  onDateChange,
  onNewAllocation,
  onAIAssistant,
  currentPeriod,
}: HeaderProps) {
  return (
    <div className="bg-white px-6 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange('monthly')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors text-sm ${
              viewMode === 'monthly'
                ? 'bg-[#ff534c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onViewModeChange('quarterly')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors text-sm ${
              viewMode === 'quarterly'
                ? 'bg-[#ff534c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => onViewModeChange('annual')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors text-sm ${
              viewMode === 'annual'
                ? 'bg-[#ff534c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Annual
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onDateChange('prev')}
            className="p-1.5 hover:bg-gray-100 rounded-md"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-gray-900 text-sm">{currentPeriod}</span>
          </div>
          
          <button
            onClick={() => onDateChange('next')}
            className="p-1.5 hover:bg-gray-100 rounded-md"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <button className="px-3 py-1.5 text-sm text-[#ff534c] hover:bg-orange-50 rounded-md font-medium border border-orange-200">
            Today
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onAIAssistant}
            className="bg-[#a3c9ea] hover:bg-[#8db8df] text-gray-900 text-sm h-9"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button
            onClick={onNewAllocation}
            className="bg-[#ff534c] hover:bg-[#e64840] text-white text-sm h-9"
          >
            + New Allocation
          </Button>
        </div>
      </div>
    </div>
  );
}