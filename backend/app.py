from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from analysis_utils import process_file

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    result = process_file(filepath)

    os.remove(filepath)  # Clean up
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
