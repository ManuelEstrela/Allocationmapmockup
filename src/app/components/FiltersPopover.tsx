import { Filter, RotateCcw, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FilterOptions } from '../types/allocation';

interface FiltersPopoverProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function FiltersPopover({
  filters,
  onFilterChange,
  onReset,
  searchValue,
  onSearchChange,
}: FiltersPopoverProps) {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleApply = () => {
    // Close popover - handled by Radix UI automatically
  };

  return (
    <div className="bg-white px-6 py-3 border-b border-gray-200 flex items-center justify-end gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Search team members..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="text-[#ff534c] border-[#fcc29c] hover:bg-orange-50 h-9"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-[#ff534c] text-[#ff534c] hover:bg-orange-50 h-9"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] rounded-xl p-6" align="end">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Filter Options</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Job</Label>
                <Select value={filters.job} onValueChange={(value) => updateFilter('job', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Project</Label>
                <Select value={filters.project} onValueChange={(value) => updateFilter('project', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Resource Timezones</Label>
                <Select value={filters.timezone} onValueChange={(value) => updateFilter('timezone', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Job Grade</Label>
                <Select value={filters.jobGrade} onValueChange={(value) => updateFilter('jobGrade', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Delivery Unit</Label>
                <Select value={filters.deliveryUnit} onValueChange={(value) => updateFilter('deliveryUnit', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Office</Label>
                <Select value={filters.office} onValueChange={(value) => updateFilter('office', value)}>
                  <SelectTrigger className="h-9">
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

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Company</Label>
                <Select value={filters.company} onValueChange={(value) => updateFilter('company', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Companies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Talent Hubs</Label>
                <Select value={filters.talentHubs} onValueChange={(value) => updateFilter('talentHubs', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Hubs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hubs</SelectItem>
                    <SelectItem value="design">Design Hub</SelectItem>
                    <SelectItem value="engineering">Engineering Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Date From</Label>
                <Input
                  type="date"
                  className="h-9"
                  value={filters.dateFrom}
                  onChange={(e) => updateFilter('dateFrom', e.target.value)}
                />
              </div>

              <div>
                <Label className="text-xs text-gray-600 mb-1.5">Date To</Label>
                <Input
                  type="date"
                  className="h-9"
                  value={filters.dateTo}
                  onChange={(e) => updateFilter('dateTo', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={onReset}>
                Clear All
              </Button>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  onClick={handleApply}
                  className="bg-[#ff534c] hover:bg-[#e64840] text-white"
                >
                  Apply Filters
                </Button>
              </PopoverTrigger>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
