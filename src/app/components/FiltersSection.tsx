import { Filter, RotateCcw, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FilterOptions } from '../types/allocation';

interface FiltersSectionProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FiltersSection({
  filters,
  onFilterChange,
  onReset,
  isExpanded,
  onToggle,
}: FiltersSectionProps) {
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Resource Name</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-5 gap-4 pt-4 border-t border-gray-100">
          <Select value={filters.job} onValueChange={(value) => updateFilter('job', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="frontend">Frontend Developer</SelectItem>
              <SelectItem value="backend">Backend Developer</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.project} onValueChange={(value) => updateFilter('project', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="atlas">Atlas Platform</SelectItem>
              <SelectItem value="mobile">VV New Mobile App</SelectItem>
              <SelectItem value="ecommerce">E-Commerce Platform</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.timezone} onValueChange={(value) => updateFilter('timezone', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Timezones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Timezones</SelectItem>
              <SelectItem value="pst">PST</SelectItem>
              <SelectItem value="est">EST</SelectItem>
              <SelectItem value="gmt">GMT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.jobGrade} onValueChange={(value) => updateFilter('jobGrade', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Job Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid">Mid-level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.deliveryUnit} onValueChange={(value) => updateFilter('deliveryUnit', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Delivery Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Units</SelectItem>
              <SelectItem value="alpha">Alpha Team</SelectItem>
              <SelectItem value="beta">Beta Team</SelectItem>
              <SelectItem value="gamma">Gamma Team</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.office} onValueChange={(value) => updateFilter('office', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Office" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offices</SelectItem>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.company} onValueChange={(value) => updateFilter('company', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.talentHubs} onValueChange={(value) => updateFilter('talentHubs', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Talent Hubs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hubs</SelectItem>
              <SelectItem value="design">Design Hub</SelectItem>
              <SelectItem value="engineering">Engineering Hub</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            placeholder="Date From"
            value={filters.dateFrom}
            onChange={(e) => updateFilter('dateFrom', e.target.value)}
          />

          <Input
            type="date"
            placeholder="Date To"
            value={filters.dateTo}
            onChange={(e) => updateFilter('dateTo', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
