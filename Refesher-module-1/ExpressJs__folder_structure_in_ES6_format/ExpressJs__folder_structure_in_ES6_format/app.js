import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";

const app = express();

// App Use Default Middleware
app.use(cors());
// app.use(cors({ credentials: true, origin: [process.env.ORIGIN_HOST, more......host add ] }));

app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(cookieParser());
app.use(helmet());
/* app.use(
  helmet.contentSecurityPolicy({
    directives: {
      default: ["self"],
      imgSrc: ["self", "http://localhost:5000/api"],
    },
  })
); */

// App Use Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// Database Connect
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("MongoDB disconnected");
  });

//api.............................
app.use("/api", router);

//upload..............
/* app.use("/upload", express.static("uploads"));

router.get("/upload/:filename", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.filename);
}); */

//listent...........................
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
