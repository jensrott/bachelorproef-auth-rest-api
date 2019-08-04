/* Api is deployed to heroku, frontend to netlify */

const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");

const connectDB = require("./config/db");

const auth = require("./auth"); // Authentication routes
const data = require("./data"); // Demonstrator Components

const host = "0.0.0.0";
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE,OPTIONS",
  allowedHeaders:
    "X-Auth-Token, Content-Type, Origin, Authorization, Content-Length, X-Requested-With, Content-Disposition, Access-Control-Allow-Origin, Access-Control-Allow-Methods"
};
const app = express();

connectDB().catch(err => console.log(err));

app.use(cors(corsOptions));
app.use(express.json());
app.use(volleyball);

app.get("/", (req, res) => {
  res.send("go to /data for the demonstrator components");
});

app.use("/auth", auth);
app.use("/data", data);

app.listen(port, host, () =>
  console.log(`Server started on http://localhost:${port}!`)
);
