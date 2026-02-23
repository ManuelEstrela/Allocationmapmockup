import { useState } from 'react';
import { TeamMember, ViewMode, Allocation } from '../types/allocation';
import { TeamMemberRow } from './TeamMemberRow';
import { AllocationDetailModal } from './AllocationDetailModal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, startOfQuarter, endOfQuarter, eachWeekOfInterval, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';
import { holidays } from '../data/mockData';

interface TimelineGridProps {
  teamMembers: TeamMember[];
  viewMode: ViewMode;
  currentDate: Date;
  currentQuarter?: number;
  currentYear?: number;
}

export function TimelineGrid({ teamMembers, viewMode, currentDate, currentQuarter, currentYear }: TimelineGridProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedAllocation, setSelectedAllocation] = useState<{
    allocation: Allocation;
    member: TeamMember;
    day: Date;
  } | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isHoliday = (date: Date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );
  };

  const handleAllocationClick = (allocation: Allocation, member: TeamMember, day: Date) => {
    if (viewMode === 'monthly') {
      setSelectedAllocation({ allocation, member, day });
    }
  };

  // Generate periods based on view mode
  let periods: Array<{ label: string; subLabel?: string; date: Date; isWeekend?: boolean; isHoliday?: boolean }> = [];

  if (viewMode === 'monthly') {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    periods = days.map(day => ({
      label: format(day, 'd'),
      subLabel: format(day, 'EEE'),
      date: day,
      isWeekend: isWeekend(day),
      isHoliday: isHoliday(day),
    }));
  } else if (viewMode === 'quarterly') {
    // Generate weeks for the quarter
    const quarterStart = startOfQuarter(currentDate);
    const quarterEnd = endOfQuarter(currentDate);
    const weeks = eachWeekOfInterval({ start: quarterStart, end: quarterEnd }, { weekStartsOn: 0 });
    
    const weekOffset = currentQuarter ? (currentQuarter - 1) * 13 : 0;
    
    periods = weeks.slice(0, 13).map((week, index) => ({
      label: `W${weekOffset + index + 1}`,
      date: week,
    }));
  } else if (viewMode === 'annual') {
    // Generate months for the year
    const yearStart = startOfYear(currentDate);
    const yearEnd = endOfYear(currentDate);
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });
    
    periods = months.map(month => ({
      label: format(month, 'MMM'),
      date: month,
    }));
  }

  return (
    <>
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="min-w-max">
          {/* Calendar Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex">
              <div className="w-64 px-6 py-3 border-r border-gray-200">
                <span className="text-xs font-medium text-gray-500 uppercase">Team Member</span>
              </div>
              <div className="flex-1 flex">
                {periods.map((period, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 ${viewMode === 'monthly' ? 'w-12' : viewMode === 'quarterly' ? 'w-16' : 'w-20'} px-2 py-3 border-r border-gray-200 text-center ${
                      period.isWeekend || period.isHoliday ? 'bg-gray-100' : ''
                    }`}
                  >
                    {period.subLabel && (
                      <div className="text-xs text-gray-500">{period.subLabel}</div>
                    )}
                    <div
                      className={`text-sm font-medium ${
                        period.subLabel ? 'mt-1' : ''
                      } ${
                        period.isWeekend || period.isHoliday ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {period.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            {teamMembers.map((member) => (
              <TeamMemberRow
                key={member.id}
                member={member}
                periods={periods}
                isExpanded={expandedRows.has(member.id)}
                onToggle={() => toggleRow(member.id)}
                viewMode={viewMode}
                onAllocationClick={handleAllocationClick}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3">
            <div className="flex items-center gap-6 text-xs">
              <span className="font-medium text-gray-700">Calendar Legend</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#c8efe8] rounded"></div>
                <span className="text-gray-600">Full 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fcc29c] rounded"></div>
                <span className="text-gray-600">Partial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ff534c] rounded"></div>
                <span className="text-gray-600">Overload</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#a3c9ea] rounded"></div>
                <span className="text-gray-600">Reserved for a project</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ffe1e6] rounded"></div>
                <span className="text-gray-600">Vacation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-gray-600">Weekend or Holiday</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AllocationDetailModal
        isOpen={selectedAllocation !== null}
        onClose={() => setSelectedAllocation(null)}
        allocation={selectedAllocation?.allocation || null}
        memberName={selectedAllocation?.member.name || ''}
        day={selectedAllocation?.day || new Date()}
      />
    </>
  );
}
