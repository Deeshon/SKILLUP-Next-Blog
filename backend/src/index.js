import cors from 'cors';
import express  from 'express';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'


// Load env variables
dotenv.config()

const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.use('/api/posts', postRoutes)

// Basic route
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: "Welcome to the NEXT Blog App"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});