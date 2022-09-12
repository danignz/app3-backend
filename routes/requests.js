const router = require("express").Router();
const Request = require("../models/Request");
const Project = require("../models/Project");
const ErrorResponse = require("../utils/error");
const { isAuthenticated, isOwner } = require("../middlewares/jwt");

// @desc    Get all requests
// @route   GET /api/v1/requests/
// @access  Private
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const requests = await Request.find({});
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
    const request = await Request.findById(id);
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
    // Check if user had done a previous request for this project
    const requests = await Request.find({user: userID, project: projectID});
    if (requests.length) {
      return next(new ErrorResponse("You already did a request for this project", 404));
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
router.put(
  "/:id",
  isAuthenticated,
  isOwner("request"),
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const request = await Request.findById(id);
      if (!request) {
        return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
      } else {
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
  }
);

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
      } else {
        const deleted = await Request.findByIdAndDelete(id);
        res.status(202).json({ data: deleted });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
