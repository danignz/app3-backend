const router = require("express").Router();
const Project = require("../models/Project");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");
const fileUploader = require("../config/cloudinary.config");

// @desc    Get all projects
// @route   GET /api/v1/projects/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (!projects.length) {
      return next(new ErrorResponse("No projects found", 404));
    }
    res.status(200).json({ data: projects });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    }
    res.status(200).json({ data: project });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a project
// @route   POST /api/v1/projects
// @access  Private
router.post("/", isAuthenticated, fileUploader.single("projectImage"), async (req, res, next) => {
  const {
    collaborators,
    name,
    startDate,
    endDate,
    description,
    projectUrl,
    onCampus,
  } = req.body;

  const parseStartDate = Date.parse(startDate);
  const parseEndDate = Date.parse(endDate);
  const parseBoolean = onCampus === "Yes";
  //these fields do not arrive by form
  const lead = req.payload._id;
  const likes = 0;
  const status = "Open";

  let projectImg;
  if (req.file) {
    projectImg = req.file.path;
  } else {
    projectImg = "https://res.cloudinary.com/ddvgumbyu/image/upload/v1662891453/app3-project/projectdefault_cpr1kv.jpg";
  }

  try {
    const project = await Project.create({
      collaborators,
      lead,
      name,
      projectImage: projectImg,
      startDate: parseStartDate,
      endDate: parseEndDate,
      description,
      projectUrl,
      onCampus: parseBoolean,
      likes,
      status,
    });
    if (!project) {
      return next(
        new ErrorResponse("An error ocurred while creating the project", 500)
      );
    }
    res.status(201).json({ data: project });
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a project
// @route   PUT /api/v1/projects/:id
// @access  Private
router.put("/:id", isAuthenticated, isOwner("project"), fileUploader.single("projectImage"), async (req, res, next) => {
  const { id } = req.params;
  const {
    collaborators,
    name,
    startDate,
    endDate,
    description,
    projectUrl,
    onCampus,
    existingImage
  } = req.body;

  const parseStartDate = Date.parse(startDate);
  const parseEndDate = Date.parse(endDate);
  const parseBoolean = onCampus === "Yes";

  let projectImg;
  if (req.file) {
    projectImg = req.file.path;
  } else {
    projectImg = existingImage;
  }

  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    } else {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
          collaborators,
          name,
          projectImage: projectImg,
          startDate: parseStartDate,
          endDate: parseEndDate,
          description,
          projectUrl,
          onCampus: parseBoolean,
        },
        { new: true }
      );
      res.status(202).json({ data: updatedProject });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:id
// @access  Private
router.delete("/:id", isAuthenticated, isOwner("project"), async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    } else {
      const deleted = await Project.findByIdAndDelete(id);
      res.status(202).json({ data: deleted });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
