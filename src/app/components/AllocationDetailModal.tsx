import { useState } from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { Allocation } from '../types/allocation';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AllocationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: Allocation | null;
  memberName: string;
  day: Date;
}

// Change 2: new allocation form state type
interface NewAllocationForm {
  customer: string;
  project: string;
  startDate: string;
  endDate: string;
  reservedForProject: boolean;
  // 0.5 = half day, 1.0 = full day (default)
  allocationAmount: '0.5' | '1.0';
}

export function AllocationDetailModal({
  isOpen,
  onClose,
  allocation,
  memberName,
  day,
}: AllocationDetailModalProps) {
  // Change 2: form state for creating a new allocation from a free day
  const [newForm, setNewForm] = useState<NewAllocationForm>({
    customer: '',
    project: '',
    startDate: format(day, 'yyyy-MM-dd'),
    endDate: '',
    reservedForProject: false,
    allocationAmount: '1.0', // default is 1.0
  });

  // Reset the form whenever the modal opens for a new day
  const handleClose = () => {
    setNewForm({
      customer: '',
      project: '',
      startDate: format(day, 'yyyy-MM-dd'),
      endDate: '',
      reservedForProject: false,
      allocationAmount: '1.0',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Allocation Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              {memberName} • {format(day, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">

          {/* Existing allocation view */}
          {allocation && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Allocations</h3>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{allocation.projectName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {allocation.client || 'A-TO-BE'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-[#ff534c]" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Period: {format(allocation.startDate, 'MMM d')} - {format(allocation.endDate, 'MMM d, yyyy')}</p>
                  <p>Hours per day: {allocation.hoursPerDay}h</p>
                  {allocation.isPending && (
                    <p className="text-orange-600 mt-2">Status: Pending approval</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Change 2: New allocation form shown when clicking a free/empty day */}
          {!allocation && (
            <div className="space-y-4">
              {/* Allocation amount selector — default 1.0 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Allocation</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewForm(f => ({ ...f, allocationAmount: '1.0' }))}
                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      newForm.allocationAmount === '1.0'
                        ? 'border-[#ff534c] bg-orange-50 text-[#ff534c]'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    1.0 — Full day
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewForm(f => ({ ...f, allocationAmount: '0.5' }))}
                    className={`py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                      newForm.allocationAmount === '0.5'
                        ? 'border-[#ff534c] bg-orange-50 text-[#ff534c]'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    0.5 — Half day
                  </button>
                </div>
              </div>

              {/* Customer + Project */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Customer</Label>
                  <Select
                    value={newForm.customer}
                    onValueChange={(v) => setNewForm(f => ({ ...f, customer: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="techstart">TechStart Inc</SelectItem>
                      <SelectItem value="globaltech">GlobalTech</SelectItem>
                      <SelectItem value="nexus">Nexus Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Project</Label>
                  <Select
                    value={newForm.project}
                    onValueChange={(v) => setNewForm(f => ({ ...f, project: v }))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nexus">Nexus Platform</SelectItem>
                      <SelectItem value="pulse">Pulse Mobile App</SelectItem>
                      <SelectItem value="orbit">Orbit Commerce</SelectItem>
                      <SelectItem value="stratos">Stratos Migration</SelectItem>
                      <SelectItem value="helix">Helix API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start Date + End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                  <Input
                    type="date"
                    className="h-9"
                    value={newForm.startDate}
                    onChange={(e) => setNewForm(f => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">End Date</Label>
                  <Input
                    type="date"
                    className="h-9"
                    value={newForm.endDate}
                    onChange={(e) => setNewForm(f => ({ ...f, endDate: e.target.value }))}
                  />
                </div>
              </div>

              {/* Reserved for a project toggle */}
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Reserved for a project
                </Label>
                <Switch
                  checked={newForm.reservedForProject}
                  onCheckedChange={(checked) => setNewForm(f => ({ ...f, reservedForProject: checked }))}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button variant="outline" onClick={handleClose} className="flex-1 h-9">
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#ff534c] hover:bg-[#e64840] text-white h-9"
                  onClick={handleClose}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}