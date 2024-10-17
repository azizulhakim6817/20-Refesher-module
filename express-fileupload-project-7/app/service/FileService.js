import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//! for single file upload
export const uploadSingleFileService = async (req) => {
  //console.log(req.files.file);

  try {
    // 'file' is the name attribute in the form
    const uploadedFile = req.files.file;

    
    // Set upload path
    const uploadPath = path.join(
      __dirname,
      "../../uploads",
      Date.now() + "-" + uploadedFile.name
    );

    // Use the mv() method to place the file on the server
    await uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        return {
          status: true,
          data: "Error occurred while uploading the file.",
        };
      }
    });
    return { status: true, data: "File uploaded successfully!" };
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

//! upload multiple images..................
export const uploadMultipleFileService = async (req) => {
  console.log(req.files.file);

  try {
    let files = req.files.file;
    // Set upload path
    for (let i = 0; i < files.length; i++) {
      const uploadPath = path.join(
        __dirname,
        "../../uploads",
        Date.now() + "-" + files[i].name
      );

      // Use the mv() method to place the file on the server
      files[i].mv(uploadPath, (err) => {
        if (err) {
          return {
            status: true,
            data: "Error occurred while uploading the file.",
          };
        }
      });
    }
    return { status: true, data: "File uploaded successfully!" };
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

//! getUploadFileService.................
export const getUploadFileService = (req, res) => {
  try {
    const filename = req.params.fileName;
    const filePath = path.join(__dirname, "../../uploads", filename);
    return filePath;
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

//! deleteSingleFileService...........
export const deleteSingleFileService = (req, res) => {
  try {
    const filename = req.params.fileName;

    const filePath = path.join(__dirname, "../../uploads", filename);
    //delet => fs.unlink...........
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).send("Error Deleting File");
      }
    });
    return { status: true, data: "File deleted successfully!" };
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};

//! deleteMultipleFileService...........
export const deleteMultipleFileService = (req, res) => {
  try {
    let files = req.body.file;

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(__dirname, "../../uploads", files[i]);
      //delet => fs.unlink...........
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err.toString());
        }
      });
    }
    return { status: true, data: "File deleted successfully!" };
  } catch (err) {
    return { status: false, data: err.toString() };
  }
};
