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
const port = process.env.PORT || 5000;

// Routes

app.use(signUpRoute);
app.use("/api/v1/notes", notesRoute);

// Listener
app.listen(port, () => {
  console.log(`App Listening On ${port}`);
});
