const { expressjwt: jwt } = require("express-jwt");
const Project = require("../models/Project");
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

const isProjectOwner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new ErrorResponse(`Project not found by id: ${id}`, 404));
    }
    if (req.payload._id === project.lead.toString()) {
      next();
    } else {
      return next(new ErrorResponse(`Unauthorized`, 401));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuthenticated,
  isProjectOwner,
};
