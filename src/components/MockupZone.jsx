import React, { useState } from "react";

const MockupZone = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUploadClick = () => {
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewURLs);
  };

  const renderMediaPreviews = () => {
    return previews.map((preview, index) => {
      const fileExtension = preview.split(".").pop().toLowerCase();
      if (["mp4", "webm", "ogg"].includes(fileExtension)) {
        return (
          <video
            key={index}
            src={preview}
            controls
            className="mt-4"
            width="500"
          />
        );
      } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        return (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="mt-4"
            width="500"
          />
        );
      } else {
        return (
          <p key={index} className="mt-4">
            Unsupported file type.
          </p>
        );
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Media Files for Mockup Zone</h1>
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUploadClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Upload
      </button>
      <div className="mt-4">{renderMediaPreviews()}</div>
    </div>
  );
};

export default MockupZone;
