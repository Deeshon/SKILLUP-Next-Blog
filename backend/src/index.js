import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

// Load env variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: "Welcome to the NEXT Blog App",
  });
});

const users = [];

// Testing user creation
app.post("/api/users", async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);

    const user = { name: req.body.name, password: hashedPwd };
    users.push(user);
    res.status(201).json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  // user authentication
  const user = users.find((user) => user.name === req.body.name);

  if (!user) {
    return res.status(400).json({ response: "User not found" });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // generate jwt token
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);

      res.status(200).json({
          success: true,
          result: {
            response: "Successfully logged in!",
            accessToken: accessToken,
          },
        });
    } else {
      res.status(500).json({ response: "Please check your password again." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    req.headers
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
