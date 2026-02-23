import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

export function TopNavigation() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center text-white font-semibold">
            V
          </div>
          <span className="text-gray-900 font-semibold">Allocation Map</span>
        </div>
        
        <nav className="flex items-center gap-6">
          <button className="text-gray-900 font-medium pb-1 border-b-2 border-orange-500">
            Dashboard
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-orange-500 text-white">JS</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-900">John Smith</span>
        </div>
      </div>
    </div>
  );
}