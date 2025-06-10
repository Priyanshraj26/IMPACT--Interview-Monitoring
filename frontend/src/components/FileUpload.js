import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner } from 'react-bootstrap';
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText'; // Adjust path if needed
import '../blocks/TextAnimations/ShinyText/ShinyText.css';

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
  <Form.Label className="text-light">Upload an audio or video file (wav, mp4, avi, mov)</Form.Label>
  <Form.Control
    type="file"
    onChange={handleFileChange}
    style={{ backgroundColor: 'rgba(18, 18, 18, 0)', borderColor: 'white' ,color: 'white'}}
  />
</Form.Group>

      <Button
        variant="dark"
        onClick={handleUpload}
        disabled={loading}
        style={{ backgroundColor: 'rgba(18, 18, 18, 0)', borderColor: 'white' ,color: 'white', marginTop: '0.5rem'}}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <ShinyText text="Analyze" speed={3} />
        )}
      </Button>
    </>
  );
};

export default FileUpload;
