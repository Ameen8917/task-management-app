import { CheckCircle2, Clock } from "lucide-react";
import KanbanCard from "./KanbanCard";

function KanbanBoard({ tasks, isAdmin, onEdit, onDelete, onStatusChange }) {
  const columns = [
    { 
      id: 'todo', 
      title: 'To Do', 
      icon: <div className="w-5 h-5 border-2 border-orange-500 rounded-full"></div>,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        
        return (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className={`${column.bgColor} ${column.borderColor} border-2 rounded-t-xl p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h3 className="font-bold text-gray-900">{column.title}</h3>
                </div>
                <span className="px-2.5 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            {/* Column Body */}
            <div className="flex-1 bg-gray-50 border-x-2 border-b-2 border-gray-200 rounded-b-xl p-4 min-h-[400px]">
              <div className="space-y-3">
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <KanbanCard
                      key={task._id}
                      task={task}
                      isAdmin={isAdmin}
                      onEdit={() => onEdit(task)}
                      onDelete={() => onDelete(task._id)}
                      onStatusChange={onStatusChange}
                      columns={columns}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      {column.icon}
                    </div>
                    <p className="text-sm text-gray-500">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;