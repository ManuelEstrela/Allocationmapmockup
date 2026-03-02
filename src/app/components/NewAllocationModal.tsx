import { useMemo, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
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

interface NewAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AllocationMode = 'project' | 'free';

interface SprintSummary {
  sprint: string;
  range: string;
  compatibility: number;
}

interface AISuggestion {
  id: string;
  name: string;
  role: string;
  overallCompatibility: number;
  sprintSummaries: SprintSummary[];
  }

const aiSuggestions: AISuggestion[] = [
  {
    id: 'andre',
    name: 'Andre Medeiros',
    role: 'Frontend Engineer',
    overallCompatibility: 95,
    sprintSummaries: [
      { sprint: 'Sprint 1', range: '10/04/2024 - 24/04/2024', compatibility: 98 },
      { sprint: 'Sprint 2', range: '25/04/2024 - 08/05/2024', compatibility: 93 },
      { sprint: 'Sprint 3', range: '09/05/2024 - 22/05/2024', compatibility: 94 },
    ],
  },
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    role: 'Backend Engineer',
    overallCompatibility: 87,
    sprintSummaries: [
      { sprint: 'Sprint 1', range: '10/04/2024 - 24/04/2024', compatibility: 84 },
      { sprint: 'Sprint 2', range: '25/04/2024 - 08/05/2024', compatibility: 90 },
      { sprint: 'Sprint 3', range: '09/05/2024 - 22/05/2024', compatibility: 86 },
    ],
  },
  {
    id: 'bruno',
    name: 'Bruno Costa',
    role: 'Product Designer',
    overallCompatibility: 82,
    sprintSummaries: [
      { sprint: 'Sprint 1', range: '10/04/2024 - 24/04/2024', compatibility: 88 },
      { sprint: 'Sprint 2', range: '25/04/2024 - 08/05/2024', compatibility: 79 },
      { sprint: 'Sprint 3', range: '09/05/2024 - 22/05/2024', compatibility: 80 },
    ],
  },
];

export function NewAllocationModal({ isOpen, onClose }: NewAllocationModalProps) {
  const [mode, setMode] = useState<AllocationMode>('project');
  const [project, setProject] = useState('');
  const [role, setRole] = useState('');
  const [customer, setCustomer] = useState('');
  const [retailCo, setRetailCo] = useState('');
  const [startDate, setStartDate] = useState('2024-10-01');
  const [endDate, setEndDate] = useState('2024-11-02');
  const [sprintCount, setSprintCount] = useState(3);
  const [sprintDays, setSprintDays] = useState<string[]>(['5', '5', '3']);
  const [showAiResults, setShowAiResults] = useState(false);

  const normalizedSprintCount = Math.max(1, Math.min(10, sprintCount || 1));

  const visibleSprintDays = useMemo(() => {
    const normalized = [...sprintDays];
    while (normalized.length < normalizedSprintCount) {
      normalized.push('');
    }
    return normalized.slice(0, normalizedSprintCount);
  }, [sprintDays, normalizedSprintCount]);

  const isProjectFormValid =
    project.trim() !== '' &&
    role.trim() !== '' &&
    customer.trim() !== '' &&
    retailCo.trim() !== '' &&
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    visibleSprintDays.every((value) => Number(value) > 0);

  const handleSprintCountChange = (value: string) => {
    const parsed = Number(value);
    const nextCount = Number.isFinite(parsed) ? Math.max(1, Math.min(10, parsed)) : 1;
    setSprintCount(nextCount);
    setShowAiResults(false);
  };

  const handleSprintDayChange = (index: number, value: string) => {
    setSprintDays((current) => {
      const next = [...current];
      while (next.length <= index) {
        next.push('');
      }
      next[index] = value;
      return next;
    });
    setShowAiResults(false);
  };

  const handleProjectFieldChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setShowAiResults(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">New Allocation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-8 py-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Allocation type</Label>
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-100 p-1">
                <Button
                  type="button"
                  variant={mode === 'project' ? 'default' : 'ghost'}
                  onClick={() => setMode('project')}
                  className={mode === 'project' ? 'bg-white text-gray-900 shadow-sm hover:bg-white' : 'text-gray-600'}
                >
                  Project
                </Button>
                <Button
                  type="button"
                  variant={mode === 'free' ? 'default' : 'ghost'}
                  onClick={() => setMode('free')}
                  className={mode === 'free' ? 'bg-white text-gray-900 shadow-sm hover:bg-white' : 'text-gray-600'}
                >
                  Free
                </Button>
              </div>
            </div>

            {mode === 'project' ? (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Project</Label>
                    <Select value={project} onValueChange={(value) => handleProjectFieldChange(setProject, value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atlas">Atlas Platform</SelectItem>
                        <SelectItem value="mobile">VV New Mobile App</SelectItem>
                        <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Role</Label>
                    <Select value={role} onValueChange={(value) => handleProjectFieldChange(setRole, value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select required role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Engineer</SelectItem>
                        <SelectItem value="backend">Backend Engineer</SelectItem>
                        <SelectItem value="designer">Product Designer</SelectItem>
                        <SelectItem value="qa">QA Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Customer</Label>
                    <Select value={customer} onValueChange={(value) => handleProjectFieldChange(setCustomer, value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="techstart">TechStart</SelectItem>
                        <SelectItem value="global">GlobalTech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">RetailCo</Label>
                    <Select value={retailCo} onValueChange={(value) => handleProjectFieldChange(setRetailCo, value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security Audit</SelectItem>
                        <SelectItem value="migration">Cloud Migration</SelectItem>
                        <SelectItem value="optimization">Performance Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(event) => handleProjectFieldChange(setStartDate, event.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(event) => handleProjectFieldChange(setEndDate, event.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Number of sprints</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={normalizedSprintCount}
                    onChange={(event) => handleSprintCountChange(event.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {Array.from({ length: normalizedSprintCount }, (_, index) => (
                    <div className="space-y-2" key={`sprint-${index + 1}`}>
                      <Label className="text-sm font-medium text-gray-700">Sprint {index + 1} (number of days)</Label>
                      <Input
                        type="number"
                        min={1}
                        value={visibleSprintDays[index] ?? ''}
                        onChange={(event) => handleSprintDayChange(index, event.target.value)}
                        className="h-10"
                        placeholder="Enter number of days"
                      />
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-500 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 text-violet-500" />
                    AI Assistant gives a compatibility summary for each sprint, including sprint dates, per-sprint compatibility percentage, and overall compatibility.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0"
                    disabled={!isProjectFormValid}
                    onClick={() => setShowAiResults(true)}
                  >
                    AI Assistant
                  </Button>
                </div>

                {showAiResults ? (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-800">AI Assistant results</h3>
                    {aiSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{suggestion.name}</p>
                            <p className="text-xs text-gray-500">{suggestion.role}</p>
                          </div>
                          <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                            Overall {suggestion.overallCompatibility}%
                          </div>
                        </div>

                        <div className="grid gap-2">
                          {suggestion.sprintSummaries.map((sprintInfo) => (
                            <div
                              key={sprintInfo.sprint}
                              className="text-xs text-gray-600 rounded-md bg-gray-50 px-3 py-2 flex justify-between gap-3"
                            >
                              <span>
                                {sprintInfo.sprint} ({sprintInfo.range})
                              </span>
                              <span className="font-semibold text-violet-700">
                                {sprintInfo.compatibility}%
                              </span>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-gray-500">{suggestion.summary}</p>

                        <Button type="button" variant="outline" className="h-9">
                          Choose this person
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andre">Andre Medeiros</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="bruno">Bruno Costa</SelectItem>
                        <SelectItem value="david">David Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Role</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Project</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atlas">Atlas Platform</SelectItem>
                        <SelectItem value="mobile">VV New Mobile App</SelectItem>
                        <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Customer</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="techstart">TechStart</SelectItem>
                        <SelectItem value="global">GlobalTech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">RetailCo</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security Audit</SelectItem>
                      <SelectItem value="migration">Cloud Migration</SelectItem>
                      <SelectItem value="optimization">Performance Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                    <Input type="date" defaultValue="2024-10-01" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">End Date</Label>
                    <Input type="date" defaultValue="2024-11-02" className="h-10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Start Time</Label>
                    <Input type="time" defaultValue="09:00" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">End Time</Label>
                    <Input type="time" defaultValue="18:00" className="h-10" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="px-6 h-10">
            Cancel
          </Button>
          <Button className="bg-[#ff534c] hover:bg-[#e64840] text-white px-6 h-10">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}