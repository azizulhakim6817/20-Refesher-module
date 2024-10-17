import express from "express";
const router = express.Router();

import * as FileController from "../app/controllers/FileController.js";

router.post("/upload-single-file", FileController.uploadSingleFile);
router.post("/upload-multiple-file", FileController.uploadMultipleFile);
router.get("/read-file/:fileName", FileController.getUploadFile);
router.delete("/delete-single-file/:fileName", FileController.deleteSingleFile);
router.delete("/delete-multiple-file", FileController.deleteMultipleFile);

export default router;
