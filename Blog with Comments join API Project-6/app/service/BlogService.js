import mongoose from "mongoose";
import BlogModel from "../model/BlogModel.js";
const { ObjectId } = mongoose.Types;

//! CreateBlogService
export const CreateBlogService = async (req) => {
    try {
        let ReqBody = req.body;
        const data = await BlogModel.create(ReqBody);
        return { status: true, data: data };
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};

//! ReadBlogService
export const ReadBlogService = async (req) => {
    try {
        let id = new ObjectId(req.params.id);

        let matchingStage = {
            $match: { _id: id },
        }

        let joinStage = {
            $lookup: {
                from: "comments",  // যার সাথে জয়েন হবে।
                localField: "_id",  // লোকাল ফিল্ড যার সাথে ফরেনফিল্ড ম্যাচ করবে।  -- blogs model
                foreignField: "blogID",  // ফরেন ফিল্ড যার সাথে লোকাল ফিল্ড ম্যাচ করবে। -- comments model
                as: "comments", // যে নামে আমাদের ডাটাগুলো পাব। 
            },
        }
        const data = await BlogModel.aggregate(
            [
                matchingStage,
                joinStage
            ]
        );
        return { status: true, data: data };
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};