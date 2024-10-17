import { CreateCommentService } from "../service/CommentService.js";

export const CreateComment = async (req, res) => {
  let result = await CreateCommentService(req);
  return res.status(200).json(result);
};
