import { useState } from 'react';
import { X, Sparkles, TrendingUp } from 'lucide-react';
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
import { AICandidate } from '../types/allocation';
import { Avatar, AvatarFallback } from './ui/avatar';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistantPanel({ isOpen, onClose }: AIAssistantPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [candidates, setCandidates] = useState<AICandidate[]>([]);
  const [formData, setFormData] = useState({
    role: '',
    customer: '',
    project: '',
    startDate: '',
    endDate: '',
    initiationWeeks: '1',
    allocationPercent: '100',
    sprints: '2',
    initialEffort: '100',
    midEffort: '75',
    finalEffort: '20',
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockCandidates: AICandidate[] = [
        {
          id: '1',
          name: 'Lisa Martinez',
          role: 'Frontend Developer',
          compatibilityScore: 95,
          reasoning: 'Extensive experience with React and TypeScript. Successfully delivered 3 similar projects.',
          availabilityConflicts: [],
        },
        {
          id: '2',
          name: 'Bruno Costa',
          role: 'Frontend Developer',
          compatibilityScore: 88,
          reasoning: 'Strong frontend skills and good customer relationship history. Familiar with the tech stack.',
          availabilityConflicts: ['Allocated 50% to E-Commerce Platform until Mar 15'],
        },
        {
          id: '3',
          name: 'André Medeiros',
          role: 'Engineering',
          compatibilityScore: 82,
          reasoning: 'Full-stack capabilities and leadership experience. Can guide junior developers.',
          availabilityConflicts: ['Currently on Atlas Platform, available from Mar 1'],
        },
        {
          id: '4',
          name: 'Sarah Johnson',
          role: 'Design',
          compatibilityScore: 75,
          reasoning: 'Cross-functional skills with design and basic frontend. Good for UI-heavy projects.',
          availabilityConflicts: ['50% allocated to VV New Mobile App'],
        },
      ];
      setCandidates(mockCandidates);
      setIsGenerating(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 flex flex-col">

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#a3c9ea] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gray-700" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">AI Allocation Assistant</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">

          <div>
            <p className="text-sm text-gray-500">
              Configure your allocation requirements and let AI find the best candidates.
            </p>
          </div>

          {/* Resource Types (full width) */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Resource Types</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
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

          {/* Project + Customer */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Project</Label>
              <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atlas">Atlas Platform</SelectItem>
                  <SelectItem value="mobile">VV New Mobile App</SelectItem>
                  <SelectItem value="ecom">E-Commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Customer</Label>
              <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
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

          {/* Start Date + End Date */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="h-10"
              />
            </div>
          </div>

          {/* Initiation Weeks + Allocation % */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Initiation Weeks</Label>
              <Input
                type="number"
                value={formData.initiationWeeks}
                onChange={(e) => setFormData({ ...formData, initiationWeeks: e.target.value })}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Initiation Allocation (%)</Label>
              <Input
                type="number"
                value={formData.allocationPercent}
                onChange={(e) => setFormData({ ...formData, allocationPercent: e.target.value })}
                className="h-10"
              />
            </div>
          </div>

          {/* Number of Sprints */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Number of Sprints</Label>
            <Input
              type="number"
              value={formData.sprints}
              onChange={(e) => setFormData({ ...formData, sprints: e.target.value })}
              className="h-10"
            />
          </div>

          {/* Dynamic Effort Configurator */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Dynamic Effort Configurator</Label>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Initial</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={formData.initialEffort}
                    onChange={(e) => setFormData({ ...formData, initialEffort: e.target.value })}
                    className="h-10"
                  />
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Mid</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={formData.midEffort}
                    onChange={(e) => setFormData({ ...formData, midEffort: e.target.value })}
                    className="h-10"
                  />
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-500">Final</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={formData.finalEffort}
                    onChange={(e) => setFormData({ ...formData, finalEffort: e.target.value })}
                    className="h-10"
                  />
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#a3c9ea] hover:bg-[#8db8df] text-gray-900 h-10"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Recommendations
              </>
            )}
          </Button>

          {/* Results */}
          {candidates.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Recommended Candidates</h3>
              </div>

              <div className="space-y-3">
                {candidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-500 text-white text-xs">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-gray-900 text-sm">{candidate.name}</p>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-full flex-shrink-0">
                            <span className="text-xs font-semibold text-green-700">
                              {candidate.compatibilityScore}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{candidate.role}</p>
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">{candidate.reasoning}</p>
                        {candidate.availabilityConflicts.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-xs font-medium text-[#ff534c] mb-1">Availability Notes:</p>
                            {candidate.availabilityConflicts.map((conflict, idx) => (
                              <p key={idx} className="text-xs text-[#ff534c] ml-3">• {conflict}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9">
                        Assign
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-9">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                AI analyzed {candidates.length + 12} team members based on skills, availability, and past performance
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}