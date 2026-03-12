import { ChevronDown, ChevronRight, Info, AlertTriangle } from 'lucide-react';
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
  onAllocationClick: (allocation: Allocation | null, member: TeamMember, day: Date) => void;
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

  const getSummaryForPeriod = (date: Date) => {
    const active = getAllocationsForPeriod(date);
    if (active.length === 0) return { totalPercentage: 0, status: 'empty' as const, allocations: [] };

    const totalHours = active.reduce((sum, a) => sum + a.hoursPerDay, 0);
    const totalPct = totalHours / 8;

    let status: 'overload' | 'full' | 'partial' | 'vacation' | 'reserved' | 'empty';
    if (totalHours === 0) {
      status = 'vacation';
    } else if (totalPct > 1.0) {
      status = 'overload';
    } else if (active.every(a => a.status === 'reserved')) {
      status = 'reserved';
    } else if (totalPct >= 1.0) {
      status = 'full';
    } else {
      status = 'partial';
    }

    return { totalPercentage: totalPct, status, allocations: active };
  };

  const getSummaryColor = (status: string) => {
    switch (status) {
      case 'overload':  return 'bg-[#aaf7e2] hover:bg-[#8ff0d5]';
      case 'full':      return 'bg-[#aaf7e2] hover:bg-[#8ff0d5]';
      case 'partial':   return 'bg-[#fcc29c] hover:bg-[#fbb481]';
      case 'vacation':  return 'bg-[#ffe1e6] hover:bg-[#ffd0d9]';
      case 'reserved':  return 'bg-[#a3c9ea] hover:bg-[#8db8df]';
      default:          return 'bg-white hover:bg-gray-50';
    }
  };

  const getSummaryTextColor = (status: string) => {
    return status === 'overload' ? 'text-[#ff534c] font-semibold' : 'text-gray-700';
  };

  // Change 1: group allocations by project, keeping the first allocation's metadata per project
  const projectGroups = member.allocations.reduce((acc, allocation) => {
    const key = allocation.projectName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(allocation);
    return acc;
  }, {} as Record<string, typeof member.allocations>);

  // Compute per-project daysInfo and sum for person-level total
  const projectDaysInfo: Record<string, string> = {};
  let totalInternal = 0;
  let totalExternal = 0;
  Object.entries(projectGroups).forEach(([projectName, allocs]) => {
    const info = allocs[0]?.daysInfo;
    if (info) {
      projectDaysInfo[projectName] = info;
      const [a, b] = info.split('/').map(Number);
      if (!isNaN(a)) totalInternal += a;
      if (!isNaN(b)) totalExternal += b;
    }
  });
  const personDaysTotal = (totalInternal > 0 || totalExternal > 0)
    ? `${totalInternal}/${totalExternal}`
    : undefined;

  const buildWarningDays = () => {
    if (!member.warningDays || member.warningDays.length === 0) return null;
    return member.warningDays.join(', ');
  };

  return (
    <>
      {/* Main Summary Row */}
      <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors" style={{ minHeight: '52px' }}>
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
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-gray-900 truncate text-xs">{member.name}</p>
              {personDaysTotal && (
                <span className={`text-[10px] font-semibold flex-shrink-0 ${
                  totalInternal === totalExternal ? 'text-gray-400' : 'text-[#ff534c]'
                }`}>
                  {personDaysTotal}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-[11px] text-gray-500 truncate">
                {member.role}{member.grade ? ` - ${member.grade}` : ''}
              </p>
              {/* Warning icon — same popup style as team info */}
              {member.hasWarning && (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex-shrink-0 p-0 leading-none">
                        <AlertTriangle className="w-3 h-3 text-[#ff534c] hover:text-[#e64840] transition-colors" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={6} className="bg-white border border-[#ff534c] shadow-lg rounded-xl p-0 overflow-hidden w-56">
                      <div className="bg-orange-50 px-3 py-2 border-b border-orange-100">
                        <p className="text-[10px] font-semibold text-[#ff534c] uppercase tracking-wide">Overload Warning</p>
                      </div>
                      <div className="px-3 py-2.5">
                        {buildWarningDays() ? (
                          <p className="text-[11px] text-gray-700 leading-relaxed">
                            This user is experiencing overload on the <span className="font-semibold text-[#ff534c]">{buildWarningDays()}</span> of the month.
                          </p>
                        ) : (
                          <p className="text-[11px] text-gray-700 leading-relaxed">
                            This resource has scheduling conflicts.
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>

        {/* Summary cells */}
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
                  className={`flex-shrink-0 ${colClass} border-r border-gray-200 bg-white self-stretch cursor-pointer hover:bg-gray-50 transition-colors`}
                  onClick={() => onAllocationClick(null, member, period.date)}
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
                        {status === 'overload' ? (
                          <div className="flex flex-col items-center justify-center gap-0">
                            <AlertTriangle className="w-3.5 h-3.5 text-[#ff534c]" />
                            <span className="text-[10px] text-[#ff534c] font-semibold leading-tight">{displayValue}</span>
                          </div>
                        ) : (
                          <span className={`text-[11px] ${getSummaryTextColor(status)}`}>
                            {status === 'vacation' ? 'V' : displayValue}
                          </span>
                        )}
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

      {/* Change 1: Expanded Project Rows — now with team avatars and days info */}
      {isExpanded &&
        Object.entries(projectGroups).map(([projectName, allocations], idx) => {
          // Use the first allocation for metadata (team, daysInfo, client)
          const firstAlloc = allocations[0];
          return (
            <div key={idx} className="flex border-b border-gray-100 bg-gray-50" style={{ minHeight: '52px' }}>
              <div className="w-56 flex-shrink-0 px-4 border-r border-gray-200 flex items-center pl-12">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-gray-700 font-medium truncate">{projectName}</p>
                    {projectDaysInfo[projectName] && (
                      <span className={`text-[10px] font-semibold flex-shrink-0 ${
                        projectDaysInfo[projectName].split('/')[0] === projectDaysInfo[projectName].split('/')[1]
                          ? 'text-gray-400'
                          : 'text-[#ff534c]'
                      }`}>
                        {projectDaysInfo[projectName]}
                      </span>
                    )}
                    {/* Info icon per project — shows team members on hover */}
                    {firstAlloc.teamMembers && firstAlloc.teamMembers.length > 0 && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="flex-shrink-0 p-0 leading-none">
                              <Info className="w-3 h-3 text-gray-300 hover:text-[#ff534c] transition-colors" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={6} className="bg-white border border-[#ff534c] shadow-lg rounded-xl p-0 overflow-hidden w-48">
                            <div className="bg-orange-50 px-3 py-2 border-b border-orange-100">
                              <p className="text-[10px] font-semibold text-[#ff534c] uppercase tracking-wide">Team</p>
                            </div>
                            <div className="px-3 py-2.5 space-y-1.5">
                              {firstAlloc.teamMembers.map((tm, ti) => (
                                <div key={ti} className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-medium text-[#ff534c] uppercase tracking-wide">{tm.role}</span>
                                  <span className="text-[11px] text-gray-700 font-medium">{tm.name}</span>
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {firstAlloc.client || 'A-TO-BE'}
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
          );
        })}
    </>
  );
}