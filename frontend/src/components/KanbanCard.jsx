import { Calendar, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

function KanbanCard({ task, isAdmin, onEdit, onDelete, onStatusChange, columns }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getPriorityBadge = (priority) => {
    const badges = {
      'low': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Low' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium' },
      'high': { bg: 'bg-red-100', text: 'text-red-700', label: 'High' }
    };
    return badges[priority] || badges.medium;
  };

  const priorityBadge = getPriorityBadge(task.priority);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition group">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 flex-1 pr-2">{task.title}</h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button 
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`px-2 py-1 ${priorityBadge.bg} ${priorityBadge.text} rounded text-xs font-medium`}>
          {priorityBadge.label}
        </span>
        {isOverdue && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
            Overdue
          </span>
        )}
      </div>

      {task.dueDate && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <Calendar className="w-3 h-3" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* Status Change Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded text-xs font-medium transition flex items-center justify-between"
        >
          <span>Move to...</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowDropdown(false)}
            ></div>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
              {columns
                .filter(col => col.id !== task.status)
                .map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      onStatusChange(task._id, col.id);
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    {col.icon}
                    {col.title}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>

      {isAdmin && task.user && (
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
          {task.user.name}
        </p>
      )}
    </div>
  );
}

export default KanbanCard;