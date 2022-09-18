const { expressjwt: jwt } = require("express-jwt");
const Project = require("../models/Project");
const Request = require("../models/Request");
const Review = require("../models/Review");
const User = require("../models/User");
const ErrorResponse = require("../utils/error");

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Ejemplo: Bearer kdjekdncewnoeiñfewf
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders, //token
});

const isOwner = (model) => async (req, res, next) => {
  const { id } = req.params;

  try {
    if (model === "project") {
      const project = await Project.findById(id);
      if (!project) {
        return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
      }
      if (req.payload._id === project.leader.toString()) {
        next();
      } else {
        return next(
          new ErrorResponse(
            `Unauthorized: you are not the owner of this project.`,
            401
          )
        );
      }
    } else if (model === "request") {
      const request = await Request.findById(id);
      if (!request) {
        return next(new ErrorResponse(`Request not found by id: ${id}`, 404));
      }
      if (req.payload._id === request.user.toString()) {
        next();
      } else {
        return next(
          new ErrorResponse(
            `Unauthorized: you are not the owner of this request.`,
            401
          )
        );
      }
    } else if (model === "review") {
      const review = await Review.findById(id);
      if (!review) {
        return next(new ErrorResponse(`Review not found by id: ${id}`, 404));
      }
      if (req.payload._id === review.user.toString()) {
        next();
      } else {
        return next(
          new ErrorResponse(
            `Unauthorized: you are not the owner of this review.`,
            401
          )
        );
      }
    } else if (model === "user") {
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorResponse(`User not found by id: ${id}`, 404));
      }
      if (req.payload._id === user._id.toString()) {
        next();
      } else {
        return next(
          new ErrorResponse(
            `Unauthorized: you are not the owner of this profile.`,
            401
          )
        );
      }
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthenticated,
  isOwner,
};
