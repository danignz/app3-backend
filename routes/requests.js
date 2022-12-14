const router = require("express").Router();
const Request = require("../models/Request");
const Project = require("../models/Project");
const User = require("../models/User");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");

// @desc    Get all requests
// @route   GET /api/v1/requests/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const requests = await Request.find({})
      .populate("user")
      .populate("project")
      .populate({
        path: "project",
        populate: {
          path: "leader",
          model: "User",
        },
      })
      .populate({
        path: "project",
        populate: {
          path: "collaborators.users",
          model: "User",
        },
      });

    if (!requests.length) {
      return next(new ErrorResponse("No requests found", 404));
    }
    res.status(200).json({ data: requests });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single request
// @route   GET /api/v1/requests/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id)
      .populate("user")
      .populate("project")
      .populate({
        path: "project",
        populate: {
          path: "leader",
          model: "User",
        },
      })
      .populate({
        path: "project",
        populate: {
          path: "collaborators.users",
          model: "User",
        },
      });

    if (!request) {
      return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
    }
    res.status(200).json({ data: request });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a request
// @route   POST /api/v1/requests/:projectID
// @access  Private
router.post("/:projectID", isAuthenticated, async (req, res, next) => {
  const { projectID } = req.params;
  const userID = req.payload._id;
  const status = "Pending";

  try {
    const project = await Project.findById(projectID);
    if (!project) {
      return next(
        new ErrorResponse(`Project not found by id: ${projectID}`, 404)
      );
    }
    // Check if project is Open and accepting requests
    if (project.status === "Closed") {
      return next(
        new ErrorResponse(`Project "${project.name}" is closed`, 400)
      );
    }
    // Check if user had done a previous request for this project
    const requests = await Request.find({ user: userID, project: projectID });
    if (requests.length) {
      return next(
        new ErrorResponse("You already did a request for this project", 400)
      );
    }

    // Check if user is not a member of that project
    const enumValuesProfession = User.schema.path("profession").enumValues;
    const user = await User.findById(userID);
    const indexCollaborator = enumValuesProfession.indexOf(user.profession);

    if (
      project.collaborators[indexCollaborator].users.indexOf(user._id) !== -1
    ) {
      return next(
        new ErrorResponse(
          `Unauthorized: ${user.fullName} is already a member of this project.`,
          401
        )
      );
    }
    // Check if there are places avariable for that role
    if (
      !(
        project.collaborators[indexCollaborator].users.length <
        project.collaborators[indexCollaborator].quantity
      )
    ) {
      return next(
        new ErrorResponse(
          `Unauthorized: This project don't admit more ${enumValuesProfession[indexCollaborator]}.`,
          401
        )
      );
    }

    // Check if user is the project leader
    if (userID !== project.leader.toString()) {
      const request = await Request.create({
        user: userID,
        project: projectID,
        status,
      });
      if (!request) {
        return next(
          new ErrorResponse("An error ocurred while creating the request", 500)
        );
      }
      res.status(201).json({ data: request });
    } else {
      return next(
        new ErrorResponse(
          `Unauthorized: you already are the leader of this project.`,
          401
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Edit a request
// @route   PUT /api/v1/requests/:id
// @access  Private
router.put("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return next(
        new ErrorResponse(
          `Request not found! Maybe it was canceled? Reload the page.`,
          404
        )
      );
    } else {
      if (status === "Accepted") {
        const enumValuesProfession = User.schema.path("profession").enumValues;
        const user = await User.findById(request.user);
        const indexCollaborator = enumValuesProfession.indexOf(user.profession);
        const project = await Project.findById(request.project);
        // Check if user is not a member of that project
        if (
          project.collaborators[indexCollaborator].users.indexOf(user._id) !==
          -1
        ) {
          return next(
            new ErrorResponse(
              `Unauthorized: ${user.fullName} is already a member of this project.`,
              401
            )
          );
        }
        // Check if there are places avariable for that role
        if (
          project.collaborators[indexCollaborator].users.length <
          project.collaborators[indexCollaborator].quantity
        ) {
          project.collaborators[indexCollaborator].users.push(user._id);
          project.save();
        } else {
          return next(
            new ErrorResponse(
              `Unauthorized: This project don't admit more ${enumValuesProfession[indexCollaborator]}.`,
              401
            )
          );
        }
      }
      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      res.status(202).json({ data: updatedRequest });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a request
// @route   DELETE /api/v1/requests/:id
// @access  Private
router.delete(
  "/:id",
  isAuthenticated,
  isOwner("request"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const request = await Request.findById(id);
      if (!request) {
        return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
      } else if (request.status === "Pending") {
        const deleted = await Request.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
        //Protection: Only allow to delete requests that not had been processed
      } else {
        return next(
          new ErrorResponse(
            `Only can be deleted requests in Pending. Maybe it was processed? Reload the page.`,
            400
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
