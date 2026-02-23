import { X, RotateCcw, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FilterOptions } from '../types/allocation';

interface FiltersPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
}

export function FiltersPanel({
  filters,
  onFilterChange,
  onReset,
  searchValue,
  onSearchChange,
  onClose,
}: FiltersPanelProps) {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-lg z-30 relative">
      {/* Panel header */}
      <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <span className="text-sm font-semibold text-gray-800">Filter Resources</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#ff534c] hover:text-[#e64840] font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filter fields */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-5 gap-3">
          {/* Row 1 */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Job</Label>
            <Select value={filters.job} onValueChange={(v) => updateFilter('job', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project</Label>
            <Select value={filters.project} onValueChange={(v) => updateFilter('project', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="atlas">Atlas Platform</SelectItem>
                <SelectItem value="mobile">VV New Mobile App</SelectItem>
                <SelectItem value="ecommerce">E-Commerce Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Timezones</Label>
            <Select value={filters.timezone} onValueChange={(v) => updateFilter('timezone', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Timezones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timezones</SelectItem>
                <SelectItem value="pst">PST</SelectItem>
                <SelectItem value="est">EST</SelectItem>
                <SelectItem value="gmt">GMT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Job Grade</Label>
            <Select value={filters.jobGrade} onValueChange={(v) => updateFilter('jobGrade', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Delivery Unit</Label>
            <Select value={filters.deliveryUnit} onValueChange={(v) => updateFilter('deliveryUnit', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="alpha">Alpha Team</SelectItem>
                <SelectItem value="beta">Beta Team</SelectItem>
                <SelectItem value="gamma">Gamma Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 2 */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Office</Label>
            <Select value={filters.office} onValueChange={(v) => updateFilter('office', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Offices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offices</SelectItem>
                <SelectItem value="sf">San Francisco</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company</Label>
            <Select value={filters.company} onValueChange={(v) => updateFilter('company', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Talent Hubs</Label>
            <Select value={filters.talentHubs} onValueChange={(v) => updateFilter('talentHubs', v)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="All Hubs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hubs</SelectItem>
                <SelectItem value="design">Design Hub</SelectItem>
                <SelectItem value="engineering">Engineering Hub</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date From</Label>
            <Input
              type="date"
              className="h-8 text-xs"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date To</Label>
            <Input
              type="date"
              className="h-8 text-xs"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
            />
          </div>
        </div>

        {/* Search row */}
        <div className="mt-3 flex items-end gap-3">
          <div className="flex-1 space-y-1">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Search</Label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search by name or role..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
          </div>
          <Button
            size="sm"
            onClick={onClose}
            className="bg-[#ff534c] hover:bg-[#e64840] text-white h-8 px-5 text-xs"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}