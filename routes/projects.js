const router = require("express").Router();
const Project = require("../models/Project");
const Review = require("../models/Review");
const Request = require("../models/Request");
const User = require("../models/User");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");
const fileUploader = require("../config/cloudinary.config");

// @desc    Get all projects
// @route   GET /api/v1/projects/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const projects = await Project.find({})
      .populate("leader")
      .populate("collaborators.users");
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
    const project = await Project.findById(id)
      .populate("leader")
      .populate("collaborators.users");
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
router.post("/", isAuthenticated, async (req, res, next) => {
  const {
    collaborators,
    name,
    startDate,
    endDate,
    description,
    projectUrl,
    projectImage,
    onCampus,
  } = req.body;

  const parseStartDate = Date.parse(startDate);
  const parseEndDate = Date.parse(endDate);
  const enumValuesProfession = User.schema.path("profession").enumValues;

  //these fields do not arrive by form
  const leader = req.payload._id;
  const likes = 0;
  const status = "Open";

  let projectImg;
  if (projectImage) {
    projectImg = projectImage;
  } else {
    projectImg =
      "https://res.cloudinary.com/ddvgumbyu/image/upload/v1663150913/app3-project/projectspictures/defaultproject_zojuvf.png";
  }

  const projectUrlRegex =
    /^$|[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;

  if (!projectUrlRegex.test(projectUrl)) {
    return next(
      new ErrorResponse(
        "Url invalid format! - Example: http://deliveryfoodapp.net",
        400
      )
    );
  }

  let numberMembers = 0;
  for (let i = 0; i < enumValuesProfession.length; i++) {
    numberMembers += collaborators[i].quantity;
  }
  if (numberMembers < 1) {
    return next(
      new ErrorResponse(
        `Project with 0 vacancies not allowed. Minimum 1 person needed.`,
        400
      )
    );
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
      onCampus,
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
router.put(
  "/:id",
  isAuthenticated,
  isOwner("project"),
  async (req, res, next) => {
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
      projectImage,
    } = req.body;

    const parseStartDate = startDate && Date.parse(startDate);
    const parseEndDate = endDate && Date.parse(endDate);
    const enumValuesProfession = User.schema.path("profession").enumValues;

    try {
      const project = await Project.findById(id);
      if (!project) {
        return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
      } else {
        if (collaborators) {
          for (let i = 0; i < enumValuesProfession.length; i++) {
            if (
              project.collaborators[i].users.length > collaborators[i].quantity
            ) {
              return next(
                new ErrorResponse(
                  `Incorrect value for ${enumValuesProfession[i]}. There are ${project.collaborators[i].users.length} members subscribed in your group.`,
                  400
                )
              );
            }
          }

          let numberMembers = 0;
          for (let i = 0; i < enumValuesProfession.length; i++) {
            numberMembers += collaborators[i].quantity;
          }
          if (numberMembers < 1) {
            return next(
              new ErrorResponse(
                `Project with 0 vacancies not allowed. Minimum 1 person needed.`,
                400
              )
            );
          }
        }
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          {
            collaborators,
            name,
            projectImage,
            startDate: parseStartDate,
            endDate: parseEndDate,
            description,
            projectUrl,
            onCampus,
            status,
          },
          { new: true }
        );
        res.status(202).json({ data: updatedProject });
      }
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:id
// @access  Private
router.delete(
  "/:id",
  isAuthenticated,
  isOwner("project"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
      } else {
        await Request.deleteMany({ project: id });
        await Review.deleteMany({ project: id });
        const deleted = await Project.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/projects/project-image-upload
// @access  Private
router.post(
  "/project-image-upload",
  isAuthenticated,
  fileUploader.single("projectImage"),
  (req, res, next) => {
    if (!req.file) {
      next(new ErrorResponse("Error uploading the image", 500));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

module.exports = router;
