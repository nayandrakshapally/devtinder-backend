const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    console.log("Admin authenticated!");
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized");
  } else {
    console.log("User authenticated!");
    next();
  }
};

module.exports = { adminAuth, userAuth };
