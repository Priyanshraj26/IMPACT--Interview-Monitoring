import React from 'react';
import { Table, Accordion, Row, Col } from 'react-bootstrap';



const ResultDisplay = ({ results }) => {

  return (
    <>
      {results.facial_emotion && (
        <div className="mt-4">
          <h5>📷 Facial Emotion:</h5>
          <p>{results.facial_emotion}</p>
        </div>
      )}

      <div className="mt-4">
        <h5>🔍 Segment-based Emotion Analysis (Your Model)</h5>
        {results.emotion_df.length > 0 ? (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {Object.keys(results.emotion_df[0]).map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.emotion_df.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>✅ Final Emotion (Segment-wise): <strong>{results.speech_emotion}</strong></p>
            <p>Segments processed: {results.segments_processed}</p>
          </>
        ) : (
          <p>Model files not found.</p>
        )}
      </div>


      {/* <div className="mt-4">
        <h5>🔍 Segment-based Emotion Analysis (Your Model)</h5>
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {Object.keys(results.emotion_df[0]).map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.emotion_df.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>✅ Final Emotion (Segment-wise): <strong>{results.speech_emotion}</strong></p>
            <p>Segments processed: {results.segments_processed}</p>
          </>
         </div> */}



      <Row className="mt-4">
        <Col md={4}>
          <h5>📝 Words Per Minute</h5>
          <p><strong>{results.wpm}</strong> ({results.wpm_category})</p>
        </Col>
        <Col md={4}>
          <h5>💬 Sentiment Analysis</h5>
          <p>Sentiment: <strong>{results.sentiment}</strong></p>
          <p>Compound Score: {results.compound_score}</p>
        </Col>
        <Col md={4}>
          <h5>🧠 Grammar Score</h5>
          <p>{results.grammar_score} / 10</p>
        </Col>
      </Row>

      <div className="mt-4">
        <h5>🛠 Grammar Suggestions</h5>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Fluency Suggestions</Accordion.Header>
            <Accordion.Body>
              <pre>{results.suggestions}</pre>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Transcribed Text</Accordion.Header>
            <Accordion.Body>
              <pre>{results.text}</pre>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Error Messages</Accordion.Header>
            <Accordion.Body>
              <p>Total Grammar Errors: {results.grammar_errors}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default ResultDisplay;
