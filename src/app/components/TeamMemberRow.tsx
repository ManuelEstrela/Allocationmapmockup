import { ChevronDown, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { TeamMember, ViewMode, Allocation } from '../types/allocation';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AllocationCell } from './AllocationCell';
import { isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { holidays } from '../data/mockData';

interface TeamMemberRowProps {
  member: TeamMember;
  periods: Array<{ label: string; subLabel?: string; date: Date; isWeekend?: boolean; isHoliday?: boolean }>;
  isExpanded: boolean;
  onToggle: () => void;
  viewMode: ViewMode;
  onAllocationClick: (allocation: Allocation, member: TeamMember, day: Date) => void;
  colClass: string;
}

export function TeamMemberRow({
  member,
  periods,
  isExpanded,
  onToggle,
  viewMode,
  onAllocationClick,
  colClass,
}: TeamMemberRowProps) {
  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const isHoliday = (date: Date) =>
    holidays.some(
      (h) =>
        h.getDate() === date.getDate() &&
        h.getMonth() === date.getMonth() &&
        h.getFullYear() === date.getFullYear()
    );

  const getAllocationForPeriod = (period: Date) => {
    if (viewMode === 'monthly') {
      return member.allocations.find((a) => {
        const t = period.getTime();
        return t >= a.startDate.getTime() && t <= a.endDate.getTime();
      });
    } else if (viewMode === 'quarterly') {
      const weekStart = startOfWeek(period, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(period, { weekStartsOn: 0 });
      return member.allocations.find(
        (a) =>
          isWithinInterval(a.startDate, { start: weekStart, end: weekEnd }) ||
          isWithinInterval(a.endDate, { start: weekStart, end: weekEnd }) ||
          (a.startDate <= weekStart && a.endDate >= weekEnd)
      );
    } else {
      const monthStart = startOfMonth(period);
      const monthEnd = endOfMonth(period);
      return member.allocations.find(
        (a) =>
          isWithinInterval(a.startDate, { start: monthStart, end: monthEnd }) ||
          isWithinInterval(a.endDate, { start: monthStart, end: monthEnd }) ||
          (a.startDate <= monthStart && a.endDate >= monthEnd)
      );
    }
  };

  const getPercentage = (allocation: Allocation | undefined): number =>
    allocation ? allocation.hoursPerDay / 8 : 0;

  const projectGroups = member.allocations.reduce((acc, allocation) => {
    const key = allocation.projectName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(allocation);
    return acc;
  }, {} as Record<string, typeof member.allocations>);

  return (
    <>
      {/* Main Row */}
      <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors" style={{ minHeight: '48px' }}>
        <div className="w-56 flex-shrink-0 px-4 border-r border-gray-200 flex items-center gap-2.5">
          <button onClick={onToggle} className="flex-shrink-0 hover:bg-gray-100 rounded p-0.5">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            )}
          </button>
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-[#ff534c] text-white text-xs">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="font-medium text-gray-900 truncate text-xs">{member.name}</p>
              {member.hasWarning && <AlertCircle className="w-3.5 h-3.5 text-[#ff534c] flex-shrink-0" />}
              {member.isIdle && <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
            </div>
            <p className="text-[11px] text-gray-500">{member.role}</p>
          </div>
        </div>

        <div className="flex flex-1 items-stretch">
          {periods.map((period, index) => {
            const allocation = getAllocationForPeriod(period.date);
            return (
              <AllocationCell
                key={index}
                allocation={allocation}
                isWeekend={period.isWeekend || false}
                isHoliday={period.isHoliday || false}
                day={period.date}
                viewMode={viewMode}
                percentage={getPercentage(allocation)}
                colClass={colClass}
                onClick={() => allocation && onAllocationClick(allocation, member, period.date)}
              />
            );
          })}
        </div>
      </div>

      {/* Expanded Project Rows */}
      {isExpanded &&
        Object.entries(projectGroups).map(([projectName, allocations], idx) => (
          <div key={idx} className="flex border-b border-gray-100 bg-gray-50" style={{ minHeight: '40px' }}>
            <div className="w-56 flex-shrink-0 px-4 border-r border-gray-200 flex items-center pl-12">
              <div>
                <p className="text-xs text-gray-700 font-medium truncate">{projectName}</p>
                <p className="text-[11px] text-gray-500">
                  A-TO-BE •{' '}
                  {allocations[0].hoursPerDay > 0
                    ? (allocations[0].hoursPerDay / 8 * 100).toFixed(0)
                    : 0}%
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-stretch">
              {periods.map((period, index) => {
                const allocation = allocations.find((a) => {
                  if (viewMode === 'monthly') {
                    const t = period.date.getTime();
                    return t >= a.startDate.getTime() && t <= a.endDate.getTime();
                  } else if (viewMode === 'quarterly') {
                    const weekStart = startOfWeek(period.date, { weekStartsOn: 0 });
                    const weekEnd = endOfWeek(period.date, { weekStartsOn: 0 });
                    return (
                      isWithinInterval(a.startDate, { start: weekStart, end: weekEnd }) ||
                      isWithinInterval(a.endDate, { start: weekStart, end: weekEnd }) ||
                      (a.startDate <= weekStart && a.endDate >= weekEnd)
                    );
                  } else {
                    const monthStart = startOfMonth(period.date);
                    const monthEnd = endOfMonth(period.date);
                    return (
                      isWithinInterval(a.startDate, { start: monthStart, end: monthEnd }) ||
                      isWithinInterval(a.endDate, { start: monthStart, end: monthEnd }) ||
                      (a.startDate <= monthStart && a.endDate >= monthEnd)
                    );
                  }
                });
                return (
                  <AllocationCell
                    key={index}
                    allocation={allocation}
                    isWeekend={period.isWeekend || false}
                    isHoliday={period.isHoliday || false}
                    day={period.date}
                    isProjectRow
                    viewMode={viewMode}
                    percentage={getPercentage(allocation)}
                    colClass={colClass}
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