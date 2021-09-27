import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";

function UploadInput() {
  const [selectedImage, setSelectedImage] = useState("");

  const handleCapture = ({ target }) => {
    setSelectedImage(target.files[0]);
    console.log(selectedImage);
  };

  const handleSubmit = () => {};
  return (
    <div className="image-input-container">
       <label htmlFor="contained-button-file">
      <input
        accept="image/*"
        id="contained-button-file"
        className="hidden"
        type="file"
        onChange={handleCapture}
      />
      <Button variant="contained" component="span" size="large">
        Upload
      </Button>
      </label>
      <label>{selectedImage ? selectedImage.name : "Select image. . ."}</label>
      <Button variant="contained" size="large" color="success">
        Identify image
      </Button>
    </div>
  );
}
export default UploadInput;
