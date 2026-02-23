import { ChevronDown, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { TeamMember, ViewMode, Allocation } from '../types/allocation';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AllocationCell } from './AllocationCell';
import { isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { holidays } from '../data/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

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

  const isHolidayDate = (date: Date) =>
    holidays.some(
      (h) =>
        h.getDate() === date.getDate() &&
        h.getMonth() === date.getMonth() &&
        h.getFullYear() === date.getFullYear()
    );

  /** Returns all allocations active on a given period date */
  const getAllocationsForPeriod = (date: Date): Allocation[] => {
    return member.allocations.filter((a) => {
      if (viewMode === 'monthly') {
        const t = date.getTime();
        return t >= a.startDate.getTime() && t <= a.endDate.getTime();
      } else if (viewMode === 'quarterly') {
        const weekStart = startOfWeek(date, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
        return (
          isWithinInterval(a.startDate, { start: weekStart, end: weekEnd }) ||
          isWithinInterval(a.endDate, { start: weekStart, end: weekEnd }) ||
          (a.startDate <= weekStart && a.endDate >= weekEnd)
        );
      } else {
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        return (
          isWithinInterval(a.startDate, { start: monthStart, end: monthEnd }) ||
          isWithinInterval(a.endDate, { start: monthStart, end: monthEnd }) ||
          (a.startDate <= monthStart && a.endDate >= monthEnd)
        );
      }
    });
  };

  /**
   * For the summary row: sum hoursPerDay across all active allocations,
   * then determine the aggregate status.
   */
  const getSummaryForPeriod = (date: Date) => {
    const active = getAllocationsForPeriod(date);
    if (active.length === 0) return { totalPercentage: 0, status: 'empty' as const, allocations: [] };

    const totalHours = active.reduce((sum, a) => sum + a.hoursPerDay, 0);
    const totalPct = totalHours / 8;

    let status: 'overload' | 'full' | 'partial' | 'vacation' | 'empty';
    if (totalHours === 0) {
      status = 'vacation';
    } else if (totalPct > 1.0) {
      status = 'overload';
    } else if (totalPct >= 1.0) {
      status = 'full';
    } else {
      status = 'partial';
    }

    return { totalPercentage: totalPct, status, allocations: active };
  };

  const getSummaryColor = (status: string) => {
    switch (status) {
      case 'overload': return 'bg-[#ff534c] hover:bg-[#e64840]';
      case 'full':     return 'bg-[#c8efe8] hover:bg-[#b0e5dc]';
      case 'partial':  return 'bg-[#fcc29c] hover:bg-[#fbb481]';
      case 'vacation': return 'bg-[#ffe1e6] hover:bg-[#ffd0d9]';
      default:         return 'bg-white hover:bg-gray-50';
    }
  };

  const getSummaryTextColor = (status: string) => {
    return status === 'overload' ? 'text-white font-semibold' : 'text-gray-700';
  };

  const projectGroups = member.allocations.reduce((acc, allocation) => {
    const key = allocation.projectName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(allocation);
    return acc;
  }, {} as Record<string, typeof member.allocations>);

  return (
    <>
      {/* Main Summary Row */}
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

        {/* Summary cells — sum of all projects per day */}
        <div className="flex flex-1 items-stretch">
          {periods.map((period, index) => {
            const isWknd = period.isWeekend || false;
            const isHol = period.isHoliday || false;

            if (isWknd || isHol) {
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 ${colClass} border-r border-gray-200 bg-gray-100 self-stretch`}
                />
              );
            }

            const { totalPercentage, status, allocations: activeAllocs } = getSummaryForPeriod(period.date);

            if (status === 'empty') {
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 ${colClass} border-r border-gray-200 bg-white self-stretch`}
                />
              );
            }

            const displayValue = viewMode === 'monthly'
              ? totalPercentage.toFixed(1)
              : `${(totalPercentage * 100).toFixed(0)}%`;

            return (
              <TooltipProvider key={index} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex-shrink-0 ${colClass} border-r border-gray-200 self-stretch relative cursor-pointer transition-all ${getSummaryColor(status)}`}
                      onClick={() => activeAllocs[0] && onAllocationClick(activeAllocs[0], member, period.date)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[11px] ${getSummaryTextColor(status)}`}>
                          {status === 'vacation' ? 'V' : displayValue}
                        </span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white border-gray-700">
                    <div className="text-xs">
                      {status === 'overload' && (
                        <p className="font-semibold text-red-400 mb-1">⚠ Overloaded ({(totalPercentage * 100).toFixed(0)}%)</p>
                      )}
                      {activeAllocs.map(a => (
                        <p key={a.id} className="text-gray-200">
                          {a.projectName}: {a.hoursPerDay > 0 ? `${(a.hoursPerDay / 8 * 100).toFixed(0)}%` : 'Vacation'}
                        </p>
                      ))}
                      {activeAllocs.length > 1 && (
                        <p className="text-gray-400 mt-1 border-t border-gray-700 pt-1">
                          Total: {(totalPercentage * 100).toFixed(0)}%
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                    percentage={allocation ? allocation.hoursPerDay / 8 : 0}
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