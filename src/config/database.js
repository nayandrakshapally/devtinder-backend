const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://nayandrakshapally95:fDj8XekzXwG5MpRe@devcluster.m7f8d.mongodb.net/devtinder"
  );
};
module.exports = connectDb;
