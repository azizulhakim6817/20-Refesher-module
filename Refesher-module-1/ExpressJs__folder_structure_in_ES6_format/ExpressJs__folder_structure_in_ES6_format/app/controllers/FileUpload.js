const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, res, cd) => {
    cd(null, "./uploads");
  },

  filename: (req, file, cd) => {
    cd(null, Date.now() + "__" + file.originalname);
  },
});

module.exports.upload = multer({ storage: fileStorageEngine });
