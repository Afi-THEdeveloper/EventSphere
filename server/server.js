const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// to use (.env file access)
require("dotenv").config();
const dbConfig = require("./config/db");

// to destructure json type data from user as request
app.use(express.json());

//routes configuration ( when ever this kind of end points come it will search in specific routes)
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

// const eventRoute = require("./routes/EventsRoutes");
// app.use("/api/event", eventRouteventRoute);

const adminRoutes = require("./routes/AdminRoutes");
app.use("/api/admin", adminRoutes);


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("server running");
}); 
