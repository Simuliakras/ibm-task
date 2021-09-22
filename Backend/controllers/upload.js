const uploadFile = require("../middleware/upload");
const baseUrl = "http://localhost:8080/files/";
const vision = require("@google-cloud/vision");
const imageSchema = require("../models/imageModel");

let imageLabels = [];

async function detectLabelsGCS(imagePath) {
  // Creating client and importing json API key
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./perfect-aura-326617-d02607de3239.json",
  });

  // Performs label detection on the image file
  const [result] = await client.labelDetection(imagePath);
  imageLabels = result.labelAnnotations;
  console.log(imageLabels);
}

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const uploadedImagePath = req.file.path;
    detectLabelsGCS(uploadedImagePath);

    const uploadedImage = new imageSchema({
      name: req.file.name,
      labels: imageLabels.description,
      path: uploadedImagePath
    });

    uploadedImage.save()
    .then(data => {
        res.json(data)
    })
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: "Could not upload the file",
    });
  }
};

module.exports = {
  upload
};
