const validator = require("validator");

const validateSignUpApi = (req) => {
  const { firstName, passWord, emailId } = req.body;
  if (!firstName) {
    throw new Error("FirstName is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("emailId is not valid");
  } else if (!validator.isStrongPassword(passWord)) {
    throw new Error("password is not strong");
  }
};

module.exports = validateSignUpApi;
