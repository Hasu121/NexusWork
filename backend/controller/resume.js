const Resume = require('../models/resume');

// Get all available templates (static for now)
exports.getTemplates = (req, res) => {
  const templates = [
    { id: 'basic', name: 'Basic', preview: '/public/resume/basic.png' },
    { id: 'modern', name: 'Modern', preview: '/public/resume/modern.png' },
    { id: 'professional', name: 'Professional', preview: '/public/resume/professional.png' }
  ];
  res.json({ templates });
};

// Save or update resume for user
exports.saveResume = async (req, res) => {
  try {
    const { template, data } = req.body;
    const userId = req.user._id;
    let resume = await Resume.findOne({ user: userId });
    if (resume) {
      resume.template = template;
      resume.data = data;
      resume.updatedAt = Date.now();
      await resume.save();
    } else {
      resume = await Resume.create({ user: userId, template, data });
    }
    res.json({ message: 'Resume saved', resume });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

// Get user's resume
exports.getResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const resume = await Resume.findOne({ user: userId });
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

// Get resume by user id (for profile showcase)
exports.getResumeByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ user: id });
    res.json({ resume });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};
