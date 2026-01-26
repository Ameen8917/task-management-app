import { Calendar, CheckSquare, Clock, Edit2, Trash2 } from "lucide-react";

function TaskCard({ task, isAdmin, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const badges = {
      'todo': {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: <div className="w-3 h-3 border-2 border-orange-600 rounded-full"></div>,
        label: 'To Do'
      },
      'in-progress': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: <Clock className="w-3 h-3" />,
        label: 'In Progress'
      },
      'completed': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: <CheckSquare className="w-3 h-3" />,
        label: 'Completed'
      }
    };
    return badges[status] || badges.todo;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'low': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Low' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium' },
      'high': { bg: 'bg-red-100', text: 'text-red-700', label: 'High' }
    };
    return badges[priority] || badges.medium;
  };

  const statusBadge = getStatusBadge(task.status);
  const priorityBadge = getPriorityBadge(task.priority);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg flex-1">{task.title}</h3>
        <div className="flex gap-2 ml-2">
          <button onClick={onEdit} className="p-1.5 text-gray-400 hover:text-blue-600 transition">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 text-gray-400 hover:text-red-600 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${statusBadge.bg} ${statusBadge.text} rounded-full text-xs font-medium`}>
            {statusBadge.icon}
            {statusBadge.label}
          </span>
          <span className={`px-2.5 py-1 ${priorityBadge.bg} ${priorityBadge.text} rounded-full text-xs font-medium`}>
            {priorityBadge.label}
          </span>
          {isOverdue && (
            <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              Overdue
            </span>
          )}
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-gray-100">
        {isAdmin && task.user && (
          <p className="text-xs text-orange-600 font-medium">
            Created by {task.user.name} • {new Date(task.createdAt).toLocaleDateString()}
          </p>
        )}
        {!isAdmin && (
          <p className="text-xs text-gray-500">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}


export default TaskCard