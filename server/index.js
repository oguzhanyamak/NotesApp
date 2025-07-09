require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const apiLimiter = require('./middlewares/rateLimiter');

const app = express();
connectDB();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(apiLimiter);

// Route'ları ekle
app.use("/api/auth", require("./routes/auth.routes"));
//app.use("/api/auth", apiLimiter, require("./routes/auth.routes"));
app.use("/api/notes", require("./routes/note.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.get("/healthcheck", (req, res) => {
    res.json({status: "ok"});
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});
