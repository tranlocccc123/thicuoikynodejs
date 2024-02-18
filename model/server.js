const express = require("express");
const path = require("path");
const { connectDB, UserModel } = require("./conect");


const app = express();
app.use(express.json());
connectDB();
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login");
});

// Tạo route GET /signup
app.get("/signup", (req, res) => {
  res.render("signup"); // Hiển thị trang đăng ký
});


//signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem password có được gửi không
    if (!password) {
      return res.status(400).send("Password is required.");
    }

    // Kiểm tra xem user đã tồn tại chưa
    const existingUser = await UserModel.findOne({ name: username });
    if (existingUser) {
      return res.status(400).send("User already exists. Please choose a different username.");
    }

    // Tạo một bản ghi mới trong cơ sở dữ liệu
    const newUser = new UserModel({ name: username, password });
    await newUser.save();

    // Thông báo đăng ký thành công và chuyển hướng về trang login
    res.send("Signup successful! <a href='/'>Go to Login</a>");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



//login
app.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.username });
    if (!user) {
      return res.send("Username not found!");
    }
    if (user.password !== req.body.password) {
      return res.send("Wrong password. Please try again !");
    }
    res.render("home");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
