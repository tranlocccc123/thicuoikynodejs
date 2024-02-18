const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");
    await mongoose.connect(
      "mongodb+srv://ttranloc2004:diNWwZcU5yTdESaH@cluster-mongo-exam.ynioii6.mongodb.net/?retryWrites=true&w=majority"
      );
    console.log("Database connected Successfully");
  } catch (error) {
    console.error("Database connection Failed", error);
    process.exit(1);
  }
};

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", loginSchema);

module.exports = {
  connectDB,
  UserModel,
};
