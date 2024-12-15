import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware for JSON responses
app.use(express.json());

import mangaRoute from "./routes/mangaRoute";
app.use(mangaRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
