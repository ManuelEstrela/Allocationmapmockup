import { X, Search } from 'lucide-react';
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

  // Shared classes
  const dropdownClass = "flex flex-col gap-1.5 w-90";
  const dateClass = "flex flex-col gap-1.5 w-36";

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-5 space-y-4">

      {/* Row 1: Resource Name + Customer + Controls */}
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-1.5 flex-[2]">
          <Label className="text-xs font-medium text-gray-600">Resource Name</Label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by Resource Name"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-[2]">
          <Label className="text-xs font-medium text-gray-600">Customer</Label>
          <Select value={filters.company} onValueChange={(v) => updateFilter('company', v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="360asset">360 ASSET (Americas)</SelectItem>
              <SelectItem value="abbvie">ABBVIE (Americas)</SelectItem>
              <SelectItem value="abdiel">ABDIEL (Americas)</SelectItem>
              <SelectItem value="accenture">ACCENTURE (EMEA)</SelectItem>
              <SelectItem value="adobe">ADOBE (Americas)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-2 transition-colors"
          >
            Reset
          </button>
          <Button
            size="sm"
            className="bg-[#ff534c] hover:bg-[#e64840] text-white h-9 px-5 text-sm gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </Button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* Filter rows card */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-4">

        {/* Row 2: Job | Job Grade | Resource Company | From | To */}
        <div className="flex gap-4 items-end">
          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Job</Label>
            <Select value={filters.job} onValueChange={(v) => updateFilter('job', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ba">Business Analyst</SelectItem>
                <SelectItem value="dm">Delivery Manager</SelectItem>
                <SelectItem value="dev">Developer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="qa">QA Engineer</SelectItem>
                <SelectItem value="pm">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Job Grade</Label>
            <Select value={filters.jobGrade} onValueChange={(v) => updateFilter('jobGrade', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="experienced">Experienced</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="rolemodel">Role Model</SelectItem>
                <SelectItem value="rookie">Rookie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Resource Company</Label>
            <Select value={filters.timezone} onValueChange={(v) => updateFilter('timezone', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acme">Acme Corp</SelectItem>
                <SelectItem value="techstart">TechStart Inc</SelectItem>
                <SelectItem value="globaltech">GlobalTech</SelectItem>
                <SelectItem value="nexus">Nexus Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dateClass}>
            <Label className="text-xs font-medium text-gray-600">From</Label>
            <Input
              type="date"
              className="h-9 text-sm"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
            />
          </div>

          <div className={dateClass}>
            <Label className="text-xs font-medium text-gray-600">To</Label>
            <Input
              type="date"
              className="h-9 text-sm"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
            />
          </div>
        </div>

        {/* Row 3: Project | Resource Delivery Unit | Resource Talent Hubs */}
        <div className="flex gap-4 items-end">
          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Project</Label>
            <Select value={filters.project} onValueChange={(v) => updateFilter('project', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proj1">ADN.22312 - Insight App - Real-Time Terminal Performance (UC1)</SelectItem>
                <SelectItem value="proj2">AME.22208.40 - AMERICARES - Maintenance on Demand</SelectItem>
                <SelectItem value="proj3">AME.24150 - AMERICARES - FIT &amp; OAT Application Enhancements</SelectItem>
                <SelectItem value="proj4">Atlas Platform</SelectItem>
                <SelectItem value="proj5">VV New Mobile App</SelectItem>
                <SelectItem value="proj6">E-Commerce Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Resource Delivery Unit</Label>
            <Select value={filters.deliveryUnit} onValueChange={(v) => updateFilter('deliveryUnit', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
                <SelectItem value="emea">EMEA</SelectItem>
                <SelectItem value="digital">Digital Experience</SelectItem>
                <SelectItem value="extended">Extended Services</SelectItem>
                <SelectItem value="talenthub">Talent Hub - UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Resource Talent Hubs</Label>
            <Select value={filters.talentHubs} onValueChange={(v) => updateFilter('talentHubs', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev-india">Developers India</SelectItem>
                <SelectItem value="dev-malaysia">Developers Malaysia</SelectItem>
                <SelectItem value="em-americas">EMs Americas</SelectItem>
                <SelectItem value="design-hub">Design Hub</SelectItem>
                <SelectItem value="eng-hub">Engineering Hub</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 4: Resource Timezones | Resource Office */}
        <div className="flex gap-4 items-end">
          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Resource Timezones</Label>
            <Select>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmt">GMT</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="utcplus1">UTC+1</SelectItem>
                <SelectItem value="utcplus2">UTC+2</SelectItem>
                <SelectItem value="utcplus3">UTC+3</SelectItem>
                <SelectItem value="utcminus5">UTC-5</SelectItem>
                <SelectItem value="utcminus8">UTC-8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={dropdownClass}>
            <Label className="text-xs font-medium text-gray-600">Resource Office</Label>
            <Select value={filters.office} onValueChange={(v) => updateFilter('office', v)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="au-melb">AU - Melbourne</SelectItem>
                <SelectItem value="ch-st">CH - St. Gallen</SelectItem>
                <SelectItem value="de-mun">DE - Munich</SelectItem>
                <SelectItem value="fr-par">FR - Paris</SelectItem>
                <SelectItem value="hr-zag">HR - Zagreb</SelectItem>
                <SelectItem value="us-nyc">US - New York</SelectItem>
                <SelectItem value="us-sf">US - San Francisco</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>
    </div>
  );
}