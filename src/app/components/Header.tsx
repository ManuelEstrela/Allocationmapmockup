import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  onDateChange,
  currentPeriod,
}: HeaderProps) {
  return (
    <div className="bg-white px-6 py-2 border-b border-gray-200 flex items-center justify-center gap-2">
      <button
        onClick={() => onDateChange('prev')}
        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 min-w-[120px] justify-center">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-medium text-gray-900 text-sm">{currentPeriod}</span>
      </div>
      <button
        onClick={() => onDateChange('next')}
        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}