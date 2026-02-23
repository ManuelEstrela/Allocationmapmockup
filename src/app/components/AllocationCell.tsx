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
  onClick,
}: AllocationCellProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getCellColor = () => {
    if (isWeekend || isHoliday) {
      return 'bg-gray-100';
    }
    if (!allocation) {
      return 'bg-white hover:bg-gray-50';
    }

    switch (allocation.status) {
      case 'full':
        return 'bg-[#c8efe8] hover:bg-[#b0e5dc]';
      case 'partial':
        return 'bg-[#fcc29c] hover:bg-[#fbb481]';
      case 'vacation':
        return 'bg-[#ffe1e6] hover:bg-[#ffd0d9]';
      case 'reserved':
        return 'bg-[#a3c9ea] hover:bg-[#8db8df]';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const getCellWidth = () => {
    if (viewMode === 'monthly') return 'w-12';
    if (viewMode === 'quarterly') return 'w-16';
    return 'w-20';
  };

  const getDisplayValue = () => {
    if (!allocation || allocation.hoursPerDay === 0) return '';
    
    if (allocation.status === 'vacation') {
      return 'V';
    }

    if (viewMode === 'monthly') {
      // Show decimal values (0.5, 1.0, 2.0)
      return percentage.toFixed(1);
    } else {
      // Show percentages for quarterly and annual
      return `${(percentage * 100).toFixed(0)}%`;
    }
  };

  const getTooltipContent = () => {
    if (!allocation) return null;
    return (
      <div className="text-xs">
        <p className="font-semibold">{allocation.projectName}</p>
        <p className="text-gray-200 mt-1">
          {format(allocation.startDate, 'MMM d')} - {format(allocation.endDate, 'MMM d, yyyy')}
        </p>
        <p className="text-gray-200">
          {allocation.hoursPerDay}h per day ({(allocation.hoursPerDay / 8 * 100).toFixed(0)}%)
        </p>
        {allocation.isPending && (
          <p className="text-yellow-300 mt-1">Pending approval</p>
        )}
      </div>
    );
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!allocation) return;
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (onClick && allocation && viewMode === 'monthly') {
      onClick();
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            draggable={!!allocation && !isWeekend && !isHoliday}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            className={`
              flex-shrink-0 ${getCellWidth()} h-10 border-r border-gray-200 transition-all relative
              ${getCellColor()}
              ${isDragging ? 'opacity-50' : ''}
              ${allocation && !isWeekend && !isHoliday ? 'cursor-pointer' : ''}
            `}
          >
            {allocation && !isWeekend && !isHoliday && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-medium ${
                  allocation.status === 'vacation' ? 'text-[#ff534c]' : 'text-gray-700'
                }`}>
                  {getDisplayValue()}
                </span>
              </div>
            )}
            {allocation && allocation.isPending && (
              <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
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
