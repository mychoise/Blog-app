import express from "express"
import { addComment, deleteComment, listAllComments, listComment, toggleComment } from "../controllers/comment.controller.js"
const commentRouter = express.Router()

commentRouter.post("/addComment",addComment)
commentRouter.post("/listComment",listComment)
commentRouter.get("/listAllComments",listAllComments)
commentRouter.post("/toggle",toggleComment)
commentRouter.post("/delete",deleteComment)
export default commentRouter