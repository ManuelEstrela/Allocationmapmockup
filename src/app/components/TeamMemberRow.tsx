import { ChevronDown, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { TeamMember, ViewMode, Allocation } from '../types/allocation';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AllocationCell } from './AllocationCell';
import { isWeekend, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { holidays } from '../data/mockData';

interface TeamMemberRowProps {
  member: TeamMember;
  periods: Array<{ label: string; subLabel?: string; date: Date; isWeekend?: boolean; isHoliday?: boolean }>;
  isExpanded: boolean;
  onToggle: () => void;
  viewMode: ViewMode;
  onAllocationClick: (allocation: Allocation, member: TeamMember, day: Date) => void;
}

export function TeamMemberRow({ member, periods, isExpanded, onToggle, viewMode, onAllocationClick }: TeamMemberRowProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const isHoliday = (date: Date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );
  };

  const getAllocationForPeriod = (period: Date) => {
    if (viewMode === 'monthly') {
      // Daily view - exact match
      return member.allocations.find((allocation) => {
        const dayTime = period.getTime();
        const startTime = allocation.startDate.getTime();
        const endTime = allocation.endDate.getTime();
        return dayTime >= startTime && dayTime <= endTime;
      });
    } else if (viewMode === 'quarterly') {
      // Weekly view - check if allocation overlaps with week
      const weekStart = startOfWeek(period, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(period, { weekStartsOn: 0 });
      
      return member.allocations.find((allocation) => {
        return isWithinInterval(allocation.startDate, { start: weekStart, end: weekEnd }) ||
               isWithinInterval(allocation.endDate, { start: weekStart, end: weekEnd }) ||
               (allocation.startDate <= weekStart && allocation.endDate >= weekEnd);
      });
    } else {
      // Monthly view in annual - check if allocation overlaps with month
      const monthStart = startOfMonth(period);
      const monthEnd = endOfMonth(period);
      
      return member.allocations.find((allocation) => {
        return isWithinInterval(allocation.startDate, { start: monthStart, end: monthEnd }) ||
               isWithinInterval(allocation.endDate, { start: monthStart, end: monthEnd }) ||
               (allocation.startDate <= monthStart && allocation.endDate >= monthEnd);
      });
    }
  };

  const getPercentageForPeriod = (allocation: Allocation | undefined, period: Date): number => {
    if (!allocation) return 0;
    
    if (viewMode === 'monthly') {
      return allocation.hoursPerDay / 8;
    } else if (viewMode === 'quarterly') {
      // Calculate percentage for the week
      const weekStart = startOfWeek(period, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(period, { weekStartsOn: 0 });
      
      // Simplified: use allocation percentage
      return allocation.hoursPerDay / 8;
    } else {
      // Annual - monthly percentage
      return allocation.hoursPerDay / 8;
    }
  };

  // Group allocations by project for expanded view
  const projectGroups = member.allocations.reduce((acc, allocation) => {
    const key = allocation.projectName;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(allocation);
    return acc;
  }, {} as Record<string, typeof member.allocations>);

  return (
    <>
      {/* Main Row */}
      <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
        <div className="w-64 px-6 py-3 border-r border-gray-200 flex items-center gap-3">
          <button
            onClick={onToggle}
            className="flex-shrink-0 hover:bg-gray-100 rounded p-1"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-[#ff534c] text-white text-sm">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900 truncate text-sm">{member.name}</p>
              {member.hasWarning && (
                <AlertCircle className="w-4 h-4 text-[#ff534c] flex-shrink-0" />
              )}
              {member.isIdle && (
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500">{member.role}</p>
          </div>
        </div>
        <div className="flex-1 flex">
          {periods.map((period, index) => {
            const allocation = getAllocationForPeriod(period.date);
            const percentage = getPercentageForPeriod(allocation, period.date);

            return (
              <AllocationCell
                key={index}
                allocation={allocation}
                isWeekend={period.isWeekend || false}
                isHoliday={period.isHoliday || false}
                day={period.date}
                viewMode={viewMode}
                percentage={percentage}
                onClick={() => allocation && onAllocationClick(allocation, member, period.date)}
              />
            );
          })}
        </div>
      </div>

      {/* Expanded Project Rows */}
      {isExpanded && Object.entries(projectGroups).map(([projectName, allocations], idx) => (
        <div key={idx} className="flex border-b border-gray-100 bg-gray-50">
          <div className="w-64 px-6 py-2.5 border-r border-gray-200 pl-16">
            <p className="text-sm text-gray-700 font-medium truncate">{projectName}</p>
            <p className="text-xs text-gray-500">A-TO-BE • {allocations[0].hoursPerDay > 0 ? (allocations[0].hoursPerDay / 8 * 100).toFixed(0) : 0}%</p>
          </div>
          <div className="flex-1 flex">
            {periods.map((period, index) => {
              const allocation = allocations.find((a) => {
                if (viewMode === 'monthly') {
                  const dayTime = period.date.getTime();
                  const startTime = a.startDate.getTime();
                  const endTime = a.endDate.getTime();
                  return dayTime >= startTime && dayTime <= endTime;
                } else if (viewMode === 'quarterly') {
                  const weekStart = startOfWeek(period.date, { weekStartsOn: 0 });
                  const weekEnd = endOfWeek(period.date, { weekStartsOn: 0 });
                  return isWithinInterval(a.startDate, { start: weekStart, end: weekEnd }) ||
                         isWithinInterval(a.endDate, { start: weekStart, end: weekEnd }) ||
                         (a.startDate <= weekStart && a.endDate >= weekEnd);
                } else {
                  const monthStart = startOfMonth(period.date);
                  const monthEnd = endOfMonth(period.date);
                  return isWithinInterval(a.startDate, { start: monthStart, end: monthEnd }) ||
                         isWithinInterval(a.endDate, { start: monthStart, end: monthEnd }) ||
                         (a.startDate <= monthStart && a.endDate >= monthEnd);
                }
              });
              const percentage = getPercentageForPeriod(allocation, period.date);

              return (
                <AllocationCell
                  key={index}
                  allocation={allocation}
                  isWeekend={period.isWeekend || false}
                  isHoliday={period.isHoliday || false}
                  day={period.date}
                  isProjectRow
                  viewMode={viewMode}
                  percentage={percentage}
                  onClick={() => allocation && onAllocationClick(allocation, member, period.date)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
