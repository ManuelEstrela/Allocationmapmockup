import { useState } from 'react';
import { Allocation, ViewMode } from '../types/allocation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { format } from 'date-fns';

interface AllocationCellProps {
  allocation?: Allocation;
  isWeekend: boolean;
  isHoliday: boolean;
  day: Date;
  isProjectRow?: boolean;
  viewMode: ViewMode;
  percentage: number;
  colClass: string;
  onClick?: () => void;
}

export function AllocationCell({
  allocation,
  isWeekend,
  isHoliday,
  day,
  isProjectRow = false,
  viewMode,
  percentage,
  colClass,
  onClick,
}: AllocationCellProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getCellColor = () => {
    if (isWeekend || isHoliday) return 'bg-gray-100';
    if (!allocation) return 'bg-white hover:bg-gray-50';
    switch (allocation.status) {
      case 'full': return 'bg-[#c8efe8] hover:bg-[#b0e5dc]';
      case 'partial': return 'bg-[#fcc29c] hover:bg-[#fbb481]';
      case 'vacation': return 'bg-[#ffe1e6] hover:bg-[#ffd0d9]';
      case 'reserved': return 'bg-[#a3c9ea] hover:bg-[#8db8df]';
      default: return 'bg-white hover:bg-gray-50';
    }
  };

  const getDisplayValue = () => {
    if (!allocation || allocation.hoursPerDay === 0) return '';
    if (allocation.status === 'vacation') return 'V';
    if (viewMode === 'monthly') return percentage.toFixed(1);
    return `${(percentage * 100).toFixed(0)}%`;
  };

  const getTooltipContent = () => {
    if (!allocation) return null;
    return (
      <div className="text-xs">
        <p className="font-semibold">{allocation.projectName}</p>
        <p className="text-gray-200 mt-1">
          {format(allocation.startDate, 'MMM d')} – {format(allocation.endDate, 'MMM d, yyyy')}
        </p>
        <p className="text-gray-200">
          {allocation.hoursPerDay}h/day ({(allocation.hoursPerDay / 8 * 100).toFixed(0)}%)
        </p>
        {allocation.isPending && <p className="text-yellow-300 mt-1">Pending approval</p>}
      </div>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            draggable={!!allocation && !isWeekend && !isHoliday}
            onDragStart={(e) => { setIsDragging(true); e.dataTransfer.effectAllowed = 'move'; }}
            onDragEnd={() => setIsDragging(false)}
            onClick={() => onClick && allocation && viewMode === 'monthly' && onClick()}
            className={`
              flex-shrink-0 ${colClass} border-r border-gray-200 transition-all relative self-stretch
              ${getCellColor()}
              ${isDragging ? 'opacity-50' : ''}
              ${allocation && !isWeekend && !isHoliday ? 'cursor-pointer' : ''}
            `}
          >
            {allocation && !isWeekend && !isHoliday && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[11px] font-medium ${
                  allocation.status === 'vacation' ? 'text-[#ff534c]' : 'text-gray-700'
                }`}>
                  {getDisplayValue()}
                </span>
              </div>
            )}
            {allocation?.isPending && (
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full border border-white" />
            )}
          </div>
        </TooltipTrigger>
        {allocation && getTooltipContent() && (
          <TooltipContent className="bg-gray-900 text-white border-gray-700">
            {getTooltipContent()}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}