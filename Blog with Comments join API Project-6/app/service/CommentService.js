import CommentModel from "../model/CommentModel.js";

//! CreateCommentService
export const CreateCommentService = async (req) => {
  try {
    let ReqBody = req.body;
    const data = await CommentModel.create(ReqBody);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
