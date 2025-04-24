import React, { useState} from 'react';
import { Container } from 'react-bootstrap';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';
import './index.css';


import Aurora from './blocks/Backgrounds/Aurora/Aurora.jsx';



function App() {
  const [results, setResults] = useState(null);

  return (
<>

  <Aurora
    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
    blend={0.5}
    amplitude={1.0}
    speed={1.2}
  />

  <Container className="mt-4">
    <h2 className="text-center impact-heading">IMPACT</h2>
    <FileUpload setResults={setResults} />
    {results && <ResultDisplay results={results} />}
  </Container>
</>
)
}

export default App;
