import { X } from 'lucide-react';
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

export function NewAllocationModal({ isOpen, onClose }: NewAllocationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">New Allocation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-8 py-6 overflow-y-auto flex-1">
          <div className="space-y-6">

            {/* Row 1: Name + Role */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andre">André Medeiros</SelectItem>
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

            {/* Row 2: Project + Customer */}
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

            {/* RetailCo (full width) */}
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

            {/* Start Date + End Date */}
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

            {/* Start Time + End Time */}
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

            {/* Number of days to allocate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Number of days to allocate</Label>
              <Input type="number" defaultValue="18" className="h-10" />
            </div>

            {/* Number of sprints */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Number of sprints</Label>
              <Input type="number" defaultValue="5" className="h-10" />
            </div>

            {/* Sprint 1, 2, 3 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sprint 1 (number days)</Label>
                <Input type="number" defaultValue="5" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sprint 2 (number days)</Label>
                <Input type="number" defaultValue="5" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sprint 3 (number days)</Label>
                <Input type="number" className="h-10" />
              </div>
            </div>

            {/* Sprint 4, 5 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sprint 4 (number days)</Label>
                <Input type="number" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Sprint 5 (number days)</Label>
                <Input type="number" defaultValue="2" className="h-10" />
              </div>
            </div>

            {/* UAT */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">UAT (number days)</Label>
              <Input type="number" defaultValue="2" className="h-10" />
            </div>

            {/* AI note */}
            <p className="text-sm text-gray-400 bg-gray-50 p-4 rounded-lg border border-gray-100">
              AI will analyze the team availability and suggest best fit resources based on the skills you've indicated.
            </p>

          </div>
        </div>

        {/* Footer */}
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