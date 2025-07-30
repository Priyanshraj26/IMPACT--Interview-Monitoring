# IMPACT: Interview Monitoring with Posture Accuracy and Confidence Tracking 
An interview monitoring system to review a candidate’s speech, facial expressions, and posture. This tool will provide objective insights to help 
recruiters assess candidates' non-verbal and verbal communication skills from an interviewer’s perspective.

The feature includes:

- __Facial Emotion__: It works similar to speech emotion analysi. Uses HuggingFace for a model.
- __Speech Emotion__: It categorizes the speech emotion into three major emotions i.e. *Neutral, Happy and Nervous*. Nervous contains all the emotions such as surprise, grief, sadness, angry etc. A custom emotion model was made for this analysis using tensorflow/ keras and librosa for feature extraction. Link to the repo [https://github.com/Priyanshraj26/Emotion-Detection]
- __WPM__: Words per minute count. Tells the speech fluency rate of the person. Can be quatified for categorizing the person is confident or not.
- __Sentiment__: Defines the positive and negative sentiment ratio in the speech analysis of the audio. This works on the loudness, pitch etc. features on the backend.
- __Grammar Score__: Grammar score based on Transcription and speech analysis on the backend.
- __AI Suggestions__: Gemini powered AI suggestions on *Fluency and WPM suggestion*.

Feel free to download and experiment thise code. This uses backend code in python extracted with FLASK and frontend being made on good old fashioned React :)
*PS: The code is still not optimized and does not support parallel processing. The video analysis takes too much time and sometimes crash the whole backend. So constantly monitor the backend on terminal while running. The project is not being developed for future as I m working on similar project in a research paper.*


<img width="1901" height="797" alt="Screenshot 2025-04-25 041619" src="https://github.com/user-attachments/assets/c1d3f1d7-6c9a-453e-91d9-b83f446bf3c0" />
<img width="1920" height="1044" alt="Screenshot (213)" src="https://github.com/user-attachments/assets/803d426b-746a-4383-959c-439a8e238357" />

<img width="1012" height="949" alt="image" src="https://github.com/user-attachments/assets/e55e5a9c-4565-4695-a5a2-807582a2003c" />
