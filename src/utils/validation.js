const validator = require("validator");

const validateSignUpApi = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileApi = (req) => {
  const ALLOWED_KEYS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "photo",
    "photoUrl",
    "about",
    "_id",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_KEYS.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpApi, validateEditProfileApi };
