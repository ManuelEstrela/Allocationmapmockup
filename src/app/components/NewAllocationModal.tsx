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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">New Allocation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
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

              <div>
                <Label htmlFor="name">Name</Label>
                <Select>
                  <SelectTrigger id="name">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corp</SelectItem>
                    <SelectItem value="techstart">TechStart</SelectItem>
                    <SelectItem value="global">GlobalTech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="project">Project</Label>
                <Select>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atlas">Atlas Platform</SelectItem>
                    <SelectItem value="mobile">VV New Mobile App</SelectItem>
                    <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="retailco">RetailCo</Label>
              <Select>
                <SelectTrigger id="retailco">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security Audit</SelectItem>
                  <SelectItem value="migration">Cloud Migration</SelectItem>
                  <SelectItem value="optimization">Performance Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" defaultValue="2024-10-01" />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" defaultValue="2024-11-02" />
              </div>
            </div>

            <div>
              <Label htmlFor="initiationWeeks">Number of days to allocate</Label>
              <Input id="initiationWeeks" type="number" defaultValue="18" />
            </div>

            <div>
              <Label htmlFor="sprints">Number of sprints</Label>
              <Input id="sprints" type="number" defaultValue="5" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sprint1">Sprint 1 (number days)</Label>
                <Input id="sprint1" type="number" defaultValue="5" />
              </div>

              <div>
                <Label htmlFor="sprint2">Sprint 2 (number days)</Label>
                <Input id="sprint2" type="number" defaultValue="5" />
              </div>

              <div>
                <Label htmlFor="sprint3">Sprint 3 (number days)</Label>
                <Input id="sprint3" type="number" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sprint4">Sprint 4 (number days)</Label>
                <Input id="sprint4" type="number" />
              </div>

              <div>
                <Label htmlFor="sprint5">Sprint 5 (number days)</Label>
                <Input id="sprint5" type="number" defaultValue="2" />
              </div>
            </div>

            <div>
              <Label htmlFor="uat">UAT (number days)</Label>
              <Input id="uat" type="number" defaultValue="2" />
            </div>

            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-200">
              AI will analyze the team availability and suggest best fit resources based on the skills you've indicated.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
