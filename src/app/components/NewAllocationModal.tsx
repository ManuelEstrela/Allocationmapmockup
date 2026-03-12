import { useMemo, useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface SprintDaySplit {
  sprint: string;
  totalDays: number;
  firstHalf: number;
  secondHalf: number;
}

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

const MAX_AI_SUGGESTIONS = 3;
const visibleSuggestions = aiSuggestions.slice(0, MAX_AI_SUGGESTIONS);

// Change 5: converted from a centered modal overlay to a right-side panel (sidebar)
// following the same pattern as FiltersPanel
export function NewAllocationModal({ isOpen, onClose }: NewAllocationModalProps) {
  const [mode, setMode] = useState<AllocationMode>('project');
  const [step, setStep] = useState<1 | 2>(1);

  const [project, setProject] = useState('');
  const [role, setRole] = useState('');
  const [customer, setCustomer] = useState('');
  const [retailCo, setRetailCo] = useState('');
  const [startDate, setStartDate] = useState('2024-10-01');
  const [endDate, setEndDate] = useState('2024-11-02');
  const [sprintCount, setSprintCount] = useState(3);
  const [sprintDays, setSprintDays] = useState<string[]>(['5', '5', '3']);
  const [showAiResults, setShowAiResults] = useState(false);
  const [aiCarouselIndex, setAiCarouselIndex] = useState(0);
  const [sprintSplits, setSprintSplits] = useState<SprintDaySplit[]>([]);

  const normalizedSprintCount = Math.max(1, Math.min(10, sprintCount || 1));

  const visibleSprintDays = useMemo(() => {
    const normalized = [...sprintDays];
    while (normalized.length < normalizedSprintCount) normalized.push('');
    return normalized.slice(0, normalizedSprintCount);
  }, [sprintDays, normalizedSprintCount]);

  const isStep1Valid =
    project.trim() !== '' &&
    role.trim() !== '' &&
    customer.trim() !== '' &&
    retailCo.trim() !== '' &&
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    visibleSprintDays.every((v) => Number(v) > 0);

  const handleSprintCountChange = (value: string) => {
    const parsed = Number(value);
    const nextCount = Number.isFinite(parsed) ? Math.max(1, Math.min(10, parsed)) : 1;
    setSprintCount(nextCount);
    setShowAiResults(false);
  };

  const handleSprintDayChange = (index: number, value: string) => {
    setSprintDays((current) => {
      const next = [...current];
      while (next.length <= index) next.push('');
      next[index] = value;
      return next;
    });
    setShowAiResults(false);
  };

  const handleProjectFieldChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setShowAiResults(false);
  };

  const handleGoToStep2 = () => {
    const splits: SprintDaySplit[] = visibleSprintDays.map((days, i) => {
      const total = Number(days) || 0;
      const firstHalf = Math.ceil(total / 2);
      return {
        sprint: `Sprint ${i + 1}`,
        totalDays: total,
        firstHalf,
        secondHalf: total - firstHalf,
      };
    });
    setSprintSplits(splits);
    setStep(2);
  };

  const handleSplitChange = (index: number, field: 'firstHalf' | 'secondHalf', value: string) => {
    setSprintSplits((current) =>
      current.map((s, i) => {
        if (i !== index) return s;
        const parsed = Math.max(0, Number(value) || 0);
        if (field === 'firstHalf') {
          return { ...s, firstHalf: parsed, secondHalf: Math.max(0, s.totalDays - parsed) };
        } else {
          return { ...s, secondHalf: parsed, firstHalf: Math.max(0, s.totalDays - parsed) };
        }
      })
    );
  };

  const handleClose = () => {
    setStep(1);
    setShowAiResults(false);
    setAiCarouselIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay — same as FiltersPanel */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={handleClose} />

      {/* Change 5: sidebar panel instead of centered modal */}
      <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-semibold text-gray-900">New Allocation</h2>
            {mode === 'project' && (
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? 'bg-[#ff534c] text-white' : 'bg-green-500 text-white'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <div className="w-6 h-px bg-gray-300" />
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2 ? 'bg-[#ff534c] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  2
                </div>
                <span className="text-xs text-gray-400">
                  {step === 1 ? 'Allocation details' : 'Sprint day splits'}
                </span>
              </div>
            )}
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Allocation type</Label>
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-100 p-1">
                  <Button
                    type="button"
                    variant={mode === 'project' ? 'default' : 'ghost'}
                    onClick={() => setMode('project')}
                    className={mode === 'project' ? 'bg-white text-gray-900 shadow-sm hover:bg-white h-8 text-sm' : 'text-gray-600 h-8 text-sm'}
                  >
                    Project
                  </Button>
                  <Button
                    type="button"
                    variant={mode === 'free' ? 'default' : 'ghost'}
                    onClick={() => setMode('free')}
                    className={mode === 'free' ? 'bg-white text-gray-900 shadow-sm hover:bg-white h-8 text-sm' : 'text-gray-600 h-8 text-sm'}
                  >
                    Free
                  </Button>
                </div>
              </div>

              {mode === 'project' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Project</Label>
                      <Select value={project} onValueChange={(v) => handleProjectFieldChange(setProject, v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select project" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atlas">Atlas Platform</SelectItem>
                          <SelectItem value="mobile">VV New Mobile App</SelectItem>
                          <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Role</Label>
                      <Select value={role} onValueChange={(v) => handleProjectFieldChange(setRole, v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select required role" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Engineer</SelectItem>
                          <SelectItem value="backend">Backend Engineer</SelectItem>
                          <SelectItem value="designer">Product Designer</SelectItem>
                          <SelectItem value="qa">QA Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Customer</Label>
                      <Select value={customer} onValueChange={(v) => handleProjectFieldChange(setCustomer, v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select customer" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme">Acme Corp</SelectItem>
                          <SelectItem value="techstart">TechStart</SelectItem>
                          <SelectItem value="global">GlobalTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">RetailCo</Label>
                      <Select value={retailCo} onValueChange={(v) => handleProjectFieldChange(setRetailCo, v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select option" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="security">Security Audit</SelectItem>
                          <SelectItem value="migration">Cloud Migration</SelectItem>
                          <SelectItem value="optimization">Performance Optimization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <Input type="date" value={startDate} onChange={(e) => handleProjectFieldChange(setStartDate, e.target.value)} className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                      <Input type="date" value={endDate} onChange={(e) => handleProjectFieldChange(setEndDate, e.target.value)} className="h-9 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">Number of sprints</Label>
                    <Input
                      type="number" min={1} max={10}
                      value={normalizedSprintCount}
                      onChange={(e) => handleSprintCountChange(e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: normalizedSprintCount }, (_, i) => (
                      <div className="space-y-1.5" key={`sprint-${i + 1}`}>
                        <Label className="text-sm font-medium text-gray-700">Sprint {i + 1} (days)</Label>
                        <Input
                          type="number" min={1}
                          value={visibleSprintDays[i] ?? ''}
                          onChange={(e) => handleSprintDayChange(i, e.target.value)}
                          className="h-9 text-sm"
                          placeholder="Number of days"
                        />
                      </div>
                    ))}
                  </div>

                  {/* AI Assistant banner */}
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 flex items-start justify-between gap-3">
                    <p className="text-sm text-gray-500 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" />
                      AI Assistant gives a compatibility summary for each sprint including per-sprint percentage and overall score.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0 h-8 text-xs"
                      disabled={!isStep1Valid}
                      onClick={() => { setShowAiResults(true); setAiCarouselIndex(0); }}
                    >
                      AI Assistant
                    </Button>
                  </div>

                  {/* Change 5: AI results displayed inside sidebar scroll area */}
                  {showAiResults && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">AI Assistant results</h3>
                        <span className="text-xs text-gray-400">{aiCarouselIndex + 1} / {visibleSuggestions.length}</span>
                      </div>

                      <div className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm space-y-3">
                        {(() => {
                          const s = visibleSuggestions[aiCarouselIndex];
                          return (
                            <>
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                                  <p className="text-xs text-gray-500">{s.role}</p>
                                </div>
                                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                                  Overall {s.overallCompatibility}%
                                </div>
                              </div>
                              <div className="grid gap-2">
                                {s.sprintSummaries.map((info) => (
                                  <div key={info.sprint} className="text-xs text-gray-600 rounded-md bg-gray-50 px-3 py-2 flex justify-between gap-3">
                                    <span>{info.sprint} ({info.range})</span>
                                    <span className="font-semibold text-violet-700">{info.compatibility}%</span>
                                  </div>
                                ))}
                              </div>
                              <Button type="button" variant="outline" className="h-8 w-full text-sm">
                                Choose this person
                              </Button>
                            </>
                          );
                        })()}
                      </div>

                      {/* Carousel nav */}
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAiCarouselIndex((i) => Math.max(0, i - 1))}
                          disabled={aiCarouselIndex === 0}
                          className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <div className="flex gap-1.5">
                          {visibleSuggestions.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setAiCarouselIndex(i)}
                              className={`w-2 h-2 rounded-full transition-colors ${i === aiCarouselIndex ? 'bg-violet-500' : 'bg-gray-300'}`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAiCarouselIndex((i) => Math.min(visibleSuggestions.length - 1, i + 1))}
                          disabled={aiCarouselIndex === visibleSuggestions.length - 1}
                          className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Free mode */
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Name</Label>
                      <Select>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select team member" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="andre">Andre Medeiros</SelectItem>
                          <SelectItem value="sarah">Sarah Johnson</SelectItem>
                          <SelectItem value="bruno">Bruno Costa</SelectItem>
                          <SelectItem value="david">David Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Role</Label>
                      <Select>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select role" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Project</Label>
                      <Select>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select project" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atlas">Atlas Platform</SelectItem>
                          <SelectItem value="mobile">VV New Mobile App</SelectItem>
                          <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Customer</Label>
                      <Select>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select customer" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme">Acme Corp</SelectItem>
                          <SelectItem value="techstart">TechStart</SelectItem>
                          <SelectItem value="global">GlobalTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">RetailCo</Label>
                    <Select>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select option" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security Audit</SelectItem>
                        <SelectItem value="migration">Cloud Migration</SelectItem>
                        <SelectItem value="optimization">Performance Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <Input type="date" defaultValue="2024-10-01" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                      <Input type="date" defaultValue="2024-11-02" className="h-9 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">Start Time</Label>
                      <Input type="time" defaultValue="09:00" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-gray-700">End Time</Label>
                      <Input type="time" defaultValue="18:00" className="h-9 text-sm" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── STEP 2: Sprint splits ── */}
          {step === 2 && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500">
                Configure how each sprint's days are distributed between the two halves. For example, 5 days can be split 3/2.
              </p>

              <div className="space-y-4">
                {sprintSplits.map((split, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">{split.sprint}</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {split.totalDays} days total
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-600">First half (days)</Label>
                        <Input
                          type="number" min={0} max={split.totalDays}
                          value={split.firstHalf}
                          onChange={(e) => handleSplitChange(i, 'firstHalf', e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-600">Second half (days)</Label>
                        <Input
                          type="number" min={0} max={split.totalDays}
                          value={split.secondHalf}
                          onChange={(e) => handleSplitChange(i, 'secondHalf', e.target.value)}
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>

                    {/* Visual split bar */}
                    <div className="flex rounded-full overflow-hidden h-2 bg-gray-100">
                      <div
                        className="bg-[#ff534c] transition-all duration-200"
                        style={{ width: split.totalDays > 0 ? `${(split.firstHalf / split.totalDays) * 100}%` : '50%' }}
                      />
                      <div
                        className="bg-[#a3c9ea] transition-all duration-200"
                        style={{ width: split.totalDays > 0 ? `${(split.secondHalf / split.totalDays) * 100}%` : '50%' }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#ff534c] inline-block" /> First half
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#a3c9ea] inline-block" /> Second half
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed footer — same structure as FiltersPanel */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          {step === 2 ? (
            <>
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-9 text-sm flex items-center gap-1.5">
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </Button>
              <Button variant="outline" onClick={handleClose} className="h-9 text-sm px-4">Cancel</Button>
              <Button className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9 text-sm">Save</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose} className="flex-1 h-9 text-sm">Cancel</Button>
              {mode === 'project' ? (
                <Button
                  onClick={handleGoToStep2}
                  disabled={!isStep1Valid}
                  className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9 text-sm flex items-center gap-1.5"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9 text-sm">Save</Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}