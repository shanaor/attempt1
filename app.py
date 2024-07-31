from flask import Flask, request, jsonify
import face_recognition
import requests
from io import BytesIO
from PIL import Image
import numpy as np

app = Flask(__name__)

# Placeholder function to simulate web scraping and face recognition
def find_faces_on_web(uploaded_image):
    # For demonstration, returning static results
    return [
        {
            'imageUrl': 'https://example.com/matched_image.jpg',
            'profileUrl': 'https://socialmedia.com/profile',
            'accuracy': 95
        }
    ]

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    image = face_recognition.load_image_file(file)
    uploaded_face_encodings = face_recognition.face_encodings(image)
    
    if len(uploaded_face_encodings) == 0:
        return jsonify({'error': 'No face found in the image'}), 400
    
    uploaded_face_encoding = uploaded_face_encodings[0]
    results = find_faces_on_web(uploaded_face_encoding)
    
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
