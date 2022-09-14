const router = require("express").Router();
const Project = require("../models/Project");
const Review = require("../models/Review");
const Request = require("../models/Request");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");
const fileUploader = require("../config/cloudinary.config");

// @desc    Get all projects
// @route   GET /api/v1/projects/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const projects = await Project.find({}).populate("leader").populate("collaborators.users");
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
    const project = await Project.findById(id).populate("leader").populate("collaborators.users");
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
  const leader = req.payload._id;
  const likes = 0;
  const status = "Open";

  let projectImg;
  if (req.file) {
    projectImg = req.file.path;
  } else {
    projectImg = "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663150913/app3-project/projectspictures/defaultproject_zojuvf.png";
  }

  try {
    const project = await Project.create({
      collaborators,
      leader,
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
    status,
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
          status
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
      await Request.deleteMany({project: id});
      await Review.deleteMany({project: id});
      const deleted = await Project.findByIdAndDelete(id);
      res.status(202).json({ data: deleted });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
