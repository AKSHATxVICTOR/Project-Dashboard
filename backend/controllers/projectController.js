const Project = require('../models/Project');

// @desc    Get all projects for logged-in user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Please provide title and description' });
    }

    const project = await Project.create({
      title,
      description,
      status: status || 'pending',
      createdBy: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, description, status } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete project error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
