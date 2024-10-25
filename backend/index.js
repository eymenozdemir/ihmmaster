const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const fileCategoryRouter = require("./routes/fileCategoryRoute");
const documentRouter = require("./routes/documentRoute");
const vesselRouter = require("./routes/vesselRoute");
const companyRouter = require("./routes/companyRoute");
const uploadRouter = require("./routes/uploadRoute");
const bodyParser = require("body-parser");
//const cors = require("cors");

dbConnect();
//app.use(cors());
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://ihmmaster-admin.onrender.com"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
//FIXME Add companyRouter, vessel........
app.use("/api/upload", uploadRouter);
app.use("/api/file-category", fileCategoryRouter);
app.use("/api/document", documentRouter);
app.use("/api/vessel", vesselRouter);
app.use("/api/company", companyRouter);

app.use("/", (req, res) => {
    res.send("Hello from other side");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT} `);
});