import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';
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
  User,
  Shield,
  AlertCircle,
  Clock
} from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

function Tasks() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get('/tasks');
      setTasks(response.data.tasks);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleTaskSaved = () => {
    fetchTasks();
    handleCloseModal();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'todo' && task.status === 'todo') ||
      (activeFilter === 'in-progress' && task.status === 'in-progress') ||
      (activeFilter === 'completed' && task.status === 'completed');
    
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
                {isAdmin && (
                  <button
                    onClick={() => navigate('/users')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    <Shield className="w-4 h-4" />
                    Users
                  </button>
                )}
              </div>
            </div>

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
                onClick={() => setActiveFilter('in-progress')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === 'in-progress'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                In Progress
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : (
          <>
            {/* Task Count */}
            <p className="text-sm text-gray-600 mb-4">
              Showing <span className="font-medium">{filteredTasks.length}</span> task{filteredTasks.length !== 1 ? 's' : ''}
            </p>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  isAdmin={isAdmin}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => handleDeleteTask(task._id)}
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
          </>
        )}
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal 
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleTaskSaved}
        />
      )}
    </div>
  );
}

export default Tasks;