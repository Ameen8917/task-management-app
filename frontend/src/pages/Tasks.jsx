import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  ListTodo, 
  LayoutDashboard, 
  CheckSquare, 
  LogOut, 
  Crown, 
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Calendar,
  User
} from 'lucide-react';

function Tasks() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Check if user is admin
  const isAdmin = user?.email?.includes('admin') || user?.role === 'admin';

  // Mock tasks data - replace with API call
  const allTasks = [
    {
      id: 1,
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for the weekly team sync',
      status: 'todo',
      dueDate: 'Jan 25, 2026',
      isOverdue: true,
      createdAt: 'Jan 21, 2026',
      createdBy: 'Admin User'
    },
    {
      id: 2,
      title: 'Complete project proposal',
      description: 'Finish the Q1 project proposal and send it to the team',
      status: 'todo',
      dueDate: 'Feb 1, 2026',
      isOverdue: false,
      createdAt: 'Jan 20, 2026',
      createdBy: 'Admin User'
    },
    {
      id: 3,
      title: 'Review code changes',
      description: 'Review pull requests from the development team',
      status: 'completed',
      dueDate: 'Jan 22, 2026',
      isOverdue: false,
      createdAt: 'Jan 19, 2026',
      completedAt: 'Jan 22, 2026',
      createdBy: 'Regular User'
    }
  ];

  // Filter tasks based on user role
  const tasks = isAdmin 
    ? allTasks 
    : allTasks.filter(task => task.createdBy === user?.name);

  // Filter tasks based on active filter
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'todo') return task.status === 'todo';
    if (activeFilter === 'completed') return task.status === 'completed';
    return true;
  }).filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Nav Links */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TaskFlow</span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </button>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                {isAdmin ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{isAdmin ? 'Admin' : 'User'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
              <p className="text-gray-600 mt-1">
                {isAdmin ? 'Manage all tasks in the system' : 'Create and manage your tasks'}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('todo')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === 'todo'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                To Do
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === 'completed'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Task Count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing <span className="font-medium">{filteredTasks.length}</span> task{filteredTasks.length !== 1 ? 's' : ''}
        </p>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              isAdmin={isAdmin}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating a new task'}
            </p>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// Task Card Component
function TaskCard({ task, isAdmin }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg flex-1">{task.title}</h3>
        <div className="flex gap-2 ml-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-600 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          {task.status === 'completed' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              <CheckSquare className="w-3 h-3" />
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
              <div className="w-3 h-3 border-2 border-orange-600 rounded-full"></div>
              To Do
            </span>
          )}
          {task.isOverdue && task.status === 'todo' && (
            <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
              Overdue
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        {isAdmin && task.createdBy && (
          <p className="text-xs text-orange-600 font-medium mb-1">
            Viewing as admin • Created {task.createdAt}
          </p>
        )}
        {!isAdmin && (
          <p className="text-xs text-gray-500">Created {task.createdAt}</p>
        )}
      </div>
    </div>
  );
}

// Task Modal Component
function TaskModal({ onClose, task = null }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    dueDate: task?.dueDate || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to create/update task
    console.log('Task data:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="todo">To Do</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tasks;