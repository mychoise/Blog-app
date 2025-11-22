import express from "express";
import dotenv from "dotenv"
import connectToMongoDB from "./config/mongodb.config.js";
import authRouter from "./router/authRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import blogRouter from "./router/blogRouter.js";
import commentRouter from "./router/commentRouter.js";
dotenv.config()
connectToMongoDB()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRouter)
app.use("/api/blog",blogRouter)
app.use("/api/comment",commentRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});