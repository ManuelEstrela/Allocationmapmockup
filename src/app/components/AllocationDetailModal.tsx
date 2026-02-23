import { X, Edit2, Trash2 } from 'lucide-react';
import { Allocation } from '../types/allocation';
import { format } from 'date-fns';

interface AllocationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocation: Allocation | null;
  memberName: string;
  day: Date;
}

export function AllocationDetailModal({
  isOpen,
  onClose,
  allocation,
  memberName,
  day,
}: AllocationDetailModalProps) {
  if (!isOpen || !allocation) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={onClose}>
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
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Allocations</h3>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{allocation.projectName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      A-TO-BE • {(allocation.hoursPerDay / 8 * 100).toFixed(0)}%
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
          </div>

          <button className="w-full py-3 bg-[#ff534c] hover:bg-[#e64840] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <span className="text-lg">+</span>
            New Allocation
          </button>
        </div>
      </div>
    </div>
  );
}
