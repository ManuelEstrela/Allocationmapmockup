import { useState, useMemo } from 'react';
import { TopNavigation } from './TopNavigation';
import { Header } from './Header';
import { FiltersPopover } from './FiltersPopover';
import { TimelineGrid } from './TimelineGrid';
import { AIAssistantPanel } from './AIAssistantPanel';
import { NewAllocationModal } from './NewAllocationModal';
import { ViewMode, FilterOptions } from '../types/allocation';
import { mockTeamMembers } from '../data/mockData';
import { format, addMonths, subMonths, addQuarters, subQuarters, addYears, subYears, getQuarter } from 'date-fns';

export function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 1)); // Feb 2024
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isNewAllocationOpen, setIsNewAllocationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    job: 'all',
    project: 'all',
    timezone: 'all',
    jobGrade: 'all',
    deliveryUnit: 'all',
    office: 'all',
    company: 'all',
    talentHubs: 'all',
    dateFrom: '',
    dateTo: '',
    search: '',
  });

  const handleDateChange = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      if (viewMode === 'monthly') {
        return direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1);
      } else if (viewMode === 'quarterly') {
        return direction === 'prev' ? subQuarters(prev, 1) : addQuarters(prev, 1);
      } else {
        return direction === 'prev' ? subYears(prev, 1) : addYears(prev, 1);
      }
    });
  };

  const handleResetFilters = () => {
    setFilters({
      job: 'all',
      project: 'all',
      timezone: 'all',
      jobGrade: 'all',
      deliveryUnit: 'all',
      office: 'all',
      company: 'all',
      talentHubs: 'all',
      dateFrom: '',
      dateTo: '',
      search: '',
    });
    setSearchValue('');
  };

  // Get current period label
  const currentPeriod = useMemo(() => {
    if (viewMode === 'monthly') {
      return format(currentDate, 'MMM yyyy');
    } else if (viewMode === 'quarterly') {
      const quarter = getQuarter(currentDate);
      const year = currentDate.getFullYear();
      return `Q${quarter} ${year}`;
    } else {
      return format(currentDate, 'yyyy');
    }
  }, [viewMode, currentDate]);

  // Get current quarter for quarterly view
  const currentQuarter = useMemo(() => {
    return getQuarter(currentDate);
  }, [currentDate]);

  // Filter team members based on search
  const filteredTeamMembers = mockTeamMembers.filter(member => {
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        member.name.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopNavigation />
      
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onNewAllocation={() => setIsNewAllocationOpen(true)}
        onAIAssistant={() => setIsAIPanelOpen(true)}
        currentPeriod={currentPeriod}
      />

      <FiltersPopover
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <TimelineGrid
        teamMembers={filteredTeamMembers}
        viewMode={viewMode}
        currentDate={currentDate}
        currentQuarter={currentQuarter}
        currentYear={currentDate.getFullYear()}
      />

      <AIAssistantPanel
        isOpen={isAIPanelOpen}
        onClose={() => setIsAIPanelOpen(false)}
      />

      <NewAllocationModal
        isOpen={isNewAllocationOpen}
        onClose={() => setIsNewAllocationOpen(false)}
      />

      {/* Overlay when AI panel is open */}
      {isAIPanelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsAIPanelOpen(false)}
        ></div>
      )}
    </div>
  );
}
