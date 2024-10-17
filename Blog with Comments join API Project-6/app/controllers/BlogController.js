import { CreateBlogService, ReadBlogService } from "../service/BlogService.js";



export const CreateBlog = async (req, res) => {
    let result = await CreateBlogService(req);
    return res.status(200).json(result);
};

export const ReadBlog = async (req, res) => {
    let result = await ReadBlogService(req);
    return res.status(200).json(result);
};