import { useState } from 'react';
import { TeamMember, ViewMode, Allocation } from '../types/allocation';
import { TeamMemberRow } from './TeamMemberRow';
import { AllocationDetailModal } from './AllocationDetailModal';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  startOfQuarter,
  endOfQuarter,
  eachWeekOfInterval,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from 'date-fns';
import { holidays } from '../data/mockData';

interface TimelineGridProps {
  teamMembers: TeamMember[];
  viewMode: ViewMode;
  currentDate: Date;
  currentQuarter?: number;
  currentYear?: number;
}

export function TimelineGrid({
  teamMembers,
  viewMode,
  currentDate,
  currentQuarter,
  currentYear,
}: TimelineGridProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedAllocation, setSelectedAllocation] = useState<{
    allocation: Allocation | null;
    member: TeamMember;
    day: Date;
  } | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isHoliday = (date: Date) => {
    return holidays.some(
      (h) =>
        h.getDate() === date.getDate() &&
        h.getMonth() === date.getMonth() &&
        h.getFullYear() === date.getFullYear()
    );
  };

  const handleAllocationClick = (allocation: Allocation | null, member: TeamMember, day: Date) => {
    if (viewMode === 'monthly') setSelectedAllocation({ allocation, member, day });
  };

  // Generate periods based on view mode
  let periods: Array<{
    label: string;
    subLabel?: string;
    date: Date;
    isWeekend?: boolean;
    isHoliday?: boolean;
  }> = [];

  if (viewMode === 'monthly') {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    periods = days.map((day) => ({
      label: format(day, 'd'),
      subLabel: format(day, 'EEE'),
      date: day,
      isWeekend: isWeekend(day),
      isHoliday: isHoliday(day),
    }));
  } else if (viewMode === 'quarterly') {
    const quarterStart = startOfQuarter(currentDate);
    const quarterEnd = endOfQuarter(currentDate);
    const weeks = eachWeekOfInterval({ start: quarterStart, end: quarterEnd }, { weekStartsOn: 0 });
    const weekOffset = currentQuarter ? (currentQuarter - 1) * 13 : 0;
    periods = weeks.slice(0, 13).map((week, index) => ({
      label: `W${weekOffset + index + 1}`,
      date: week,
    }));
  } else {
    const yearStart = startOfYear(currentDate);
    const yearEnd = endOfYear(currentDate);
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });
    periods = months.map((month) => ({
      label: format(month, 'MMM'),
      date: month,
    }));
  }

  const colClass =
    viewMode === 'monthly'
      ? 'flex-1 min-w-[28px]'
      : viewMode === 'quarterly'
      ? 'flex-1 min-w-[60px]'
      : 'flex-1 min-w-[80px]';

  return (
    <>
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="w-full">
          {/* Calendar Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex">
              <div className="w-56 flex-shrink-0 px-4 py-2 border-r border-gray-200">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Team Member
                </span>
              </div>
              <div className="flex flex-1">
                {periods.map((period, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 ${colClass} px-1 py-2 border-r border-gray-200 text-center ${
                      period.isWeekend || period.isHoliday ? 'bg-gray-100' : ''
                    }`}
                  >
                    {period.subLabel && (
                      <div className="text-[10px] text-gray-400 leading-tight">{period.subLabel}</div>
                    )}
                    <div
                      className={`text-xs font-medium leading-tight ${
                        period.subLabel ? 'mt-0.5' : 'mt-1'
                      } ${
                        period.isWeekend || period.isHoliday ? 'text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {period.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Member Rows */}
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
                colClass={colClass}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-2.5">
            <div className="flex items-center gap-5 text-xs flex-wrap">
              <span className="font-medium text-gray-700">Calendar Legend</span>
              {[
                { color: 'bg-[#aaf7e2]', label: 'Full 100%' },
                { color: 'bg-[#fcc29c]', label: 'Partial' },
                { color: 'bg-[#ff534c]', label: 'Overload' },
                { color: 'bg-[#a3c9ea]', label: 'Reserved for a project' },
                { color: 'bg-[#ffe1e6]', label: 'Vacation' },
                { color: 'bg-gray-200', label: 'Weekend or Holiday' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 ${color} rounded`} />
                  <span className="text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AllocationDetailModal
        isOpen={selectedAllocation !== null}
        onClose={() => setSelectedAllocation(null)}
        allocation={selectedAllocation?.allocation ?? null}
        memberName={selectedAllocation?.member.name || ''}
        day={selectedAllocation?.day || new Date()}
      />
    </>
  );
}