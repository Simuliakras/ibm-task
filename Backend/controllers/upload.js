const uploadFile = require("../middleware/upload");
const vision = require("@google-cloud/vision");
const imageSchema = require("../models/imageModel");

//Creating empty array for storing uploaded image labels
let imageLabels = [];

//Function for detecting and saving image labels to empty array
async function detectLabels(imagePath) {
  //Creating client and importing json API key
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "./perfect-aura-326617-d02607de3239.json",
  });

  //Performs label detection on the image file and pushing description elements to empty array
  const [result] = await client.labelDetection(imagePath);
  const labels = result.labelAnnotations;
  labels.forEach((label) => imageLabels.push(label.description));
  console.log(imageLabels);
}

//Controller function for saving uploaded image details to database
const uploadImageData = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const uploadedImagePath = req.file.path;
    detectLabels(uploadedImagePath);

    const uploadedImage = new imageSchema({
      name: req.file.name,
      labels: imageLabels,
      path: uploadedImagePath,
    });

    uploadedImage
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
    
    imageLabels = [];

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

const getImageData = (req, res) => {
  
  imageSchema.find() 
  .then(result=>{ 
  console.log('result: ',result) 
  res.send(result.length>0?result:'No image details'); 
  }) 
  .catch(err=>{ 
  console.log(err); 
  }) 
 } 

module.exports = {
  uploadImageData,
  getImageData,
};
