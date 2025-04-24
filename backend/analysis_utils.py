import nltk
import whisper
import language_tool_python
from nltk.tokenize import sent_tokenize
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os
import librosa
from deepface import DeepFace
from moviepy import VideoFileClip
import cv2
import json
import numpy as np
import pandas as pd
from custom_emotion_analyzer import analyze_emotion_from_audio
from dynamic_suggestions import get_grammar_suggestions
from flask import jsonify

nltk.download('punkt')

whisper_model = whisper.load_model("medium")
analyzer = SentimentIntensityAnalyzer()
tool = language_tool_python.LanguageTool('en-US')

def classify_wpm(wpm):
    if wpm < 100:
        return "Slow"
    elif 100 <= wpm <= 150:
        return "Normal"
    else:
        return "Fast"

def process_file(filepath):
    file_extension = filepath.split(".")[-1]
    is_video = file_extension in ["mp4", "avi", "mov"]

    audio_path = "temp_audio.wav"
    facial_emotion = None

    if is_video:
        video_path = filepath

        # Extract frames for facial emotion detection
        cap = cv2.VideoCapture(video_path)
        frame_rate = int(cap.get(cv2.CAP_PROP_FPS))
        os.makedirs("frames", exist_ok=True)
        frame_count = 0
        frame_sample_rate = max(1, frame_rate // 2)
        emotions = []

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            if frame_count % frame_sample_rate == 0:
                frame_path = f"frames/frame_{frame_count}.jpg"
                cv2.imwrite(frame_path, frame)
                try:
                    analysis = DeepFace.analyze(img_path=frame_path, actions=['emotion'], enforce_detection=False)
                    emotions.append(analysis[0]['dominant_emotion'])
                except:
                    continue
            frame_count += 1
        cap.release()

        emotion_mapping = {
            "happy": "Happy",
            "neutral": "Neutral",
        }

        dominant_facial_emotion = max(set(emotions), key=emotions.count) if emotions else "No Face Detected"
        facial_emotion = emotion_mapping.get(dominant_facial_emotion, "Nervous")

        # Extract audio
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path)
        video.close()

        for img in os.listdir("frames"):
            os.remove(f"frames/{img}")

    else:
        with open(audio_path, "wb") as out:
            with open(filepath, "rb") as f:
                out.write(f.read())

    # Transcription and Analysis
    y, sr = librosa.load(audio_path, sr=16000)
    text = whisper_model.transcribe(audio_path)["text"]
    duration_seconds = len(y) / sr
    wpm = round(len(text.split()) / (duration_seconds / 60), 2)
    wpm_category = classify_wpm(wpm)

    # Grammar
    sentences = sent_tokenize(text)
    grammar_errors = sum(len(tool.check(sentence)) for sentence in sentences)
    final_grammar_score = max(0, 10 - ((grammar_errors / max(len(text.split()), 1)) * 100))

    # Sentiment
    sentiment_score = analyzer.polarity_scores(text)
    compound_score = sentiment_score['compound']
    sentiment = "Positive" if compound_score > 0.05 else "Negative" if compound_score < -0.05 else "Neutral"

    # Segment-based Emotion
    model_json_path = "./model/CNN_model.json"
    model_weights_path = "./model/best_model.keras"
    model_path = "./model/final_model.h5"

    emotion_df = []
    final_custom_emotion = None
    stats = {}

    if os.path.exists(model_path):
        try: 
            df_custom_emotion, final_custom_emotion, stats = analyze_emotion_from_audio(
                audio_path=audio_path,
                model_path=model_path
                # ,model_weights_path=model_weights_path
            )
            emotion_df = df_custom_emotion.to_dict(orient="records")
        except Exception as e:
            return jsonify({
                "error": str(e),
                "emotion_df": [],
                "speech_emotion": "N/A",
                "segments_processed": 0
        })
    else:
        final_custom_emotion = "Model Not Found"
        stats = {"valid_segments": 0, "total_segments": 0}

    # Cleanup
    # if os.path.exists(audio_path):
    #     os.remove(audio_path)

    suggestions = get_grammar_suggestions(final_grammar_score)

    return {
        "wpm": wpm,
        "wpm_category": wpm_category,
        "sentiment": sentiment,
        "compound_score": compound_score,
        "grammar_score": round(final_grammar_score, 2),
        "grammar_errors": grammar_errors,
        "text": text,
        "suggestions": suggestions,
        "facial_emotion": facial_emotion if is_video else None,
        "speech_emotion": final_custom_emotion,
        "segments_processed": f"{stats.get('valid_segments', 0)} / {stats.get('total_segments', 0)}",
        "emotion_df": emotion_df
    }
