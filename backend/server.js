const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors"); // <-- Import cors

dotenv.config();

const app = express();
connectDB();

// Use CORS middleware
app.use(cors()); // <-- Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api", userRoutes); // So /api/form maps correctly

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
