const file = require("../../e-FILEUPLOAD/models/file");
const File = require("../model/fileUpload");
const cloudinary = require("cloudinary").v2;

//Without cloudinary
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const { file } = req.files;
    console.log("file", file);

    //define path to store file
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path", path);

    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).send({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "failed to send the data",
      error: err.message,
    });
  }
};

// upload image to cloudinary

function isFileTypeSupported(reqFileType, supportTypes) {
  return supportTypes.includes(reqFileType);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options); //filepath of cloudinary
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, instaLink, githubLink } = req.body;
    const { file } = req.files;

    //validations check for valid file
    let supportTypes = ["png", "jpg", "jpeg"];
    let reqFileType = file.name.split(".").pop().toLowerCase();

    console.log("fetch file type", reqFileType);

    if (!isFileTypeSupported(reqFileType, supportTypes)) {
      return res.status(400).send({
        success: false,
        message: "file type not supported",
      });
    }

    //if file supported upload to cloudinary
    const response = await uploadFileToCloudinary(file, "lmsfolder");
    console.log("response", response);

    //save enrty in db
    const dbSave = await File.create({
      name,
      instaLink,
      githubLink,
      imageURL: response.secure_url,
    });

    res.status(200).send({
      succes: true,
      data: dbSave,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      succes: false,
      message: "Failed to upload data",
      error: error.message,
    });
  }
};
