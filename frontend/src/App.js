import React, { useState} from 'react';
import { Container } from 'react-bootstrap';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';
import './index.css';
import FooterDisplay from './components/footer';
import GradientText from './blocks/TextAnimations/GradientText/GradientText.jsx';


import Aurora from './blocks/Backgrounds/Aurora/Aurora.jsx';

const mockResults = {
  facial_emotion: "Happy",
  speech_emotion: "Calm",
  wpm: 120,
  wpm_category: "Normal",
  sentiment: "Positive",
  compound_score: 0.75,
  grammar_score: 8,
  suggestions: "Consider using more formal words.",
  wpm_suggestion: "Try to slow down a bit.",
  text: "This is an example of a transcribed paragraph.\nIt should appear on multiple lines now.",
  grammar_errors: 2
};

function App() {
  const [results, setResults] = useState(mockResults);

  return (
<>

  <Aurora
    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
    blend={0.5}
    amplitude={1.0}
    speed={1.2}
  />
  
  <GradientText
    colors={["#3A29FF","#FF94B4", "#FF3232","#FF94B4", "#3A29FF"]}
    animationSpeed={8}
    showBorder={false}
    className="impact-heading"
  >
    IMPACT
  </GradientText>

  <Container className="impact">
    <h4>Interview Monitoring with Posture, Audio, and Confidence Tracking</h4>
  </Container>

  <Container className='results-container'>
    <FileUpload setResults={setResults} />
    {results && <ResultDisplay results={results} />}
  </Container>
  
  <Container className="footer-container">
    <FooterDisplay />
  </Container>

</>
)
}

export default App;
