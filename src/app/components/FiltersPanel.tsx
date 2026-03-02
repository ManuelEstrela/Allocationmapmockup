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

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-[320px] bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Filters + footer — stretch to fill remaining height */}
        <div className="flex-1 flex flex-col px-5 py-4 min-h-0">

          {/* Filter fields spaced evenly to fill height */}
          <div className="flex-1 flex flex-col justify-between">

            {/* Resource Name */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Resource Name</Label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <Input placeholder="Search by name..." value={searchValue} onChange={(e) => onSearchChange(e.target.value)} className="pl-8 h-8 text-sm" />
              </div>
            </div>

            {/* Customer */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Customer</Label>
              <Select value={filters.company} onValueChange={(v) => updateFilter('company', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select customer..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="360asset">360 ASSET (Americas)</SelectItem>
                  <SelectItem value="abbvie">ABBVIE (Americas)</SelectItem>
                  <SelectItem value="accenture">ACCENTURE (EMEA)</SelectItem>
                  <SelectItem value="adobe">ADOBE (Americas)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Project</Label>
              <Select value={filters.project} onValueChange={(v) => updateFilter('project', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select project..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="proj1">ADN.22312 - Insight App</SelectItem>
                  <SelectItem value="proj2">AME.22208.40 - AMERICARES</SelectItem>
                  <SelectItem value="proj4">Atlas Platform</SelectItem>
                  <SelectItem value="proj5">VV New Mobile App</SelectItem>
                  <SelectItem value="proj6">E-Commerce Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Job</Label>
              <Select value={filters.job} onValueChange={(v) => updateFilter('job', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select job..." /></SelectTrigger>
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

            {/* Job Grade */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Job Grade</Label>
              <Select value={filters.jobGrade} onValueChange={(v) => updateFilter('jobGrade', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select grade..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="experienced">Experienced</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="rolemodel">Role Model</SelectItem>
                  <SelectItem value="rookie">Rookie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resource Company */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Resource Company</Label>
              <Select value={filters.timezone} onValueChange={(v) => updateFilter('timezone', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select company..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="techstart">TechStart Inc</SelectItem>
                  <SelectItem value="globaltech">GlobalTech</SelectItem>
                  <SelectItem value="nexus">Nexus Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resource Timezones */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Resource Timezones</Label>
              <Select>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select timezone..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="utcplus1">UTC+1</SelectItem>
                  <SelectItem value="utcplus2">UTC+2</SelectItem>
                  <SelectItem value="utcminus5">UTC-5</SelectItem>
                  <SelectItem value="utcminus8">UTC-8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resource Office */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Resource Office</Label>
              <Select value={filters.office} onValueChange={(v) => updateFilter('office', v)}>
                <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select office..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="au-melb">AU - Melbourne</SelectItem>
                  <SelectItem value="ch-st">CH - St. Gallen</SelectItem>
                  <SelectItem value="de-mun">DE - Munich</SelectItem>
                  <SelectItem value="fr-par">FR - Paris</SelectItem>
                  <SelectItem value="us-nyc">US - New York</SelectItem>
                  <SelectItem value="us-sf">US - San Francisco</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">From</Label>
                <Input type="date" className="h-8 text-sm" value={filters.dateFrom} onChange={(e) => updateFilter('dateFrom', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-600">To</Label>
                <Input type="date" className="h-8 text-sm" value={filters.dateTo} onChange={(e) => updateFilter('dateTo', e.target.value)} />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
            <Button variant="outline" onClick={onReset} className="flex-1 h-9 text-sm">Reset</Button>
            <Button className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9 text-sm">
              <Search className="w-3.5 h-3.5 mr-1.5" />
              Search
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}