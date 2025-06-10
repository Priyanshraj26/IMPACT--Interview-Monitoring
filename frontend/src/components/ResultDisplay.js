import React from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';

const ResultDisplay = ({ results }) => {
  return (
    <>
      {/* Facial and Speech Emotion in One Row */}
      <Row className="card-spotlight mt-5 justify-content-evenly text-center ">
        {results.facial_emotion && (
          <Col md={2} className="">
            <h5>Facial Emotion</h5>
            <p><strong>{results.facial_emotion}</strong></p>
          </Col>
        )}
        {results.speech_emotion && (
          <Col md={2}>
            <h5>Speech Emotion</h5>
            <p><strong>{results.speech_emotion}</strong></p>
          </Col>
        )}
          <Col md={2}>
          <h5>WPM📝</h5>
          <p><strong>{results.wpm}</strong> ({results.wpm_category})</p>
        </Col>

        <Col md={2}>
          <h5>Sentiment💬</h5>
          <p><strong>{results.sentiment}/{results.compound_score} </strong></p>
        </Col>

        <Col md={2}>
          <h5>Grammar Score🧠</h5>
          <p>{results.grammar_score} / 10</p>
        </Col>
      </Row>



      {/* Accordion Section */}
      <div className="mt-4">
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1" className='mb-3 rounded'>
            <Accordion.Header>Fluency Suggestions</Accordion.Header>
            <Accordion.Body className="bg-dark text-light">
              <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {results.suggestions}
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className='mb-3 rounded'>
            <Accordion.Header>WPM Suggestions</Accordion.Header>
            <Accordion.Body className="bg-dark text-light">
              <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {results.wpm_suggestion}
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className='mb-3 rounded'>
            <Accordion.Header>Transcribed Text</Accordion.Header>
            <Accordion.Body className="bg-dark text-light">
              <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {results.text}
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4" className='mb-2 rounded'>
            <Accordion.Header>Error Messages</Accordion.Header>
            <Accordion.Body className="bg-dark text-light">
              <p>Total Grammar Errors: {results.grammar_errors}</p>
            </Accordion.Body>
          </Accordion.Item>
          
        </Accordion>
      </div>
    </>
  );
};

export default ResultDisplay;
