const express = require("express");
const connectDB = require("./Utils/DB");
const signUpRoute = require("./Routes/UserRoutes");
const notesRoute = require("./Routes/NotesRoutes");
const cors = require("cors");
// Initilize .env
require("dotenv").config({ path: "../.env" });

// Initilize app
const app = express();
app.use(cors());
app.use(express.json());

// Initilize MongoDB Connection

connectDB(process.env.MONGO_URI);

// Fallback for PORT env
const port = process.env.MongoPORT || 5000;

// Routes

app.use(signUpRoute);
app.use("/api/v1/notes", notesRoute);

// Listener
app.listen(port, () => {
  console.log(`App Listening On ${port}`);
});

setInterval(() => {
  console.log("Restarting service...");
  process.exit(1); // Forces the service to restart
}, 1000 * 60 * 60 * 1); // 1 HOUR
