import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner } from 'react-bootstrap';

const FileUpload = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file...", file);

      const res = await axios.post("http://localhost:5000/analyze", formData);
      console.log("Response from backend:", res.data);

      if (res.data.error) {
        console.error("Backend error:", res.data.error);
        alert("Backend error: " + res.data.error);
        setResults({
          emotion_df: [],
          speech_emotion: "N/A",
          segments_processed: "0 / 0",
          ...res.data
        });
        return;
      }

      setResults(res.data);
    } catch (err) {
      alert("Upload or analysis failed.");
      console.error("Request error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload an audio or video file (wav, mp4, avi, mov)</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      <Button variant="primary" onClick={handleUpload} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Analyze'}
      </Button>
    </>
  );
};

export default FileUpload;
