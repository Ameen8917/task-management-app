import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ListTodo, LayoutDashboard, CheckSquare, LogOut, Crown, Calendar, TrendingUp } from 'lucide-react';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTasks: 6,
    todoTasks: 4,
    completedTasks: 2,
    completionRate: 33
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const upcomingTasks = [
    {
      id: 1,
      title: 'Sample User Task',
      description: 'Do not display sensitive data. Clear feedback for authentication errors. No exposure of secrets or tokens in UI Visual in...',
      dueDate: 'Today',
      status: 'todo'
    },
    {
      id: 2,
      title: 'Node JS Deployment',
      description: 'Design a modern, responsive frontend UI for a task management web application with authentication, role-based...',
      dueDate: 'Tomorrow',
      status: 'todo'
    },
    {
      id: 3,
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for the weekly team sync',
      dueDate: 'Jan 25',
      status: 'todo'
    },
    {
      id: 4,
      title: 'Complete project proposal',
      description: 'Finish the Q1 project proposal and send it to the team',
      dueDate: 'Feb 1',
      status: 'todo'
    }
  ];

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
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/tasks')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </button>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Crown className="w-5 h-5 text-yellow-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Admin</p>
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
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Admin
            </span>
          </div>
          <p className="text-gray-600">Here's an overview of your tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Total Tasks</span>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalTasks}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">To Do</span>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-orange-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.todoTasks}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Completed</span>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.completedTasks}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Completion Rate</span>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.completionRate}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Tasks */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className="mt-1">
                    <div className="w-5 h-5 border-2 border-orange-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>

              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-red-900">Overdue Tasks</span>
                    <span className="text-2xl font-bold text-red-600">1</span>
                  </div>
                  <p className="text-xs text-red-700">Requires immediate attention</p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">Active Tasks</span>
                    <span className="text-2xl font-bold text-gray-900">4</span>
                  </div>
                  <p className="text-xs text-gray-600">Tasks in progress</p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Admin View</span>
                  </div>
                  <p className="text-xs text-yellow-700">You're viewing all tasks in the system</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/tasks')}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Manage Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;