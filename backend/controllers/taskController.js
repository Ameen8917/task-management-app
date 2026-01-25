import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title'
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = { isDeleted: false };
    
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const tasks = await Task.find(query)
      .populate('user', 'name email')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email');

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (req.user.role !== 'admin' && task.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

    task = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    task.isDeleted = true;
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const query = { isDeleted: false };
    
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    const totalTasks = await Task.countDocuments(query);
    const todoTasks = await Task.countDocuments({ ...query, status: 'todo' });
    const inProgressTasks = await Task.countDocuments({ ...query, status: 'in-progress' });
    const completedTasks = await Task.countDocuments({ ...query, status: 'completed' });

    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    const overdueTasks = await Task.countDocuments({
      ...query,
      status: { $ne: 'completed' },
      dueDate: { $lt: new Date() }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        todoTasks,
        inProgressTasks,
        completedTasks,
        completionRate,
        overdueTasks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

