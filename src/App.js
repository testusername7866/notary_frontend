import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://notary-backend-yfwb.onrender.com"; // Updated API URL

export default function NotaryTool() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [step, setStep] = useState(1);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload/`, formData);
      alert("File uploaded successfully: " + response.data.filename);
      setStep(2);
    } catch (error) {
      alert("Upload failed");
    }
  };

  const extractText = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/extract_text/`, formData);
      setText(response.data.extracted_text);
      setStep(3);
    } catch (error) {
      alert("Text extraction failed");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Notary Tool</h1>

      {step === 1 && (
        <div>
          <input type="file" onChange={handleFileChange} className="my-4" />
          <button onClick={uploadFile} className="bg-blue-500 text-white p-2 rounded">Upload</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <button onClick={extractText} className="bg-green-500 text-white p-2 rounded">Extract Text</button>
        </div>
      )}

      {step === 3 && text && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold">Extracted Text</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
