from flask import Flask, request, jsonify
import torch
import cv2
from PIL import Image
from collections import Counter
import torchvision.transforms as transforms
import os
import time

app = Flask(__name__)

RESOLUTION = 224 

CLASS_MAPPING = {
    0: "Abuse",
    1: "Arrest",
    2: "Arson",
    3: "Assault",
    4: "Burglary",
    5: "Explosion",
    6: "Fighting",
    7: "Normal"
}

transformer = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5]),
    transforms.Resize((RESOLUTION, RESOLUTION))
])

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# repo_id = "namban4123/crimemodel"  
# filename = "crime_tcn_jit.pt" 
# scripted_model_path = hf_hub_download(repo_id=repo_id, filename=filename)

# Load the model from local file
scripted_model_path = "crime_tcn_jit.pt"
model = torch.jit.load(scripted_model_path, map_location=device)
model.to(device)
model.eval()

def preprocess_frame(frame):
    frame_yuv = cv2.cvtColor(frame, cv2.COLOR_BGR2YUV)
    Y_channel, _, _ = cv2.split(frame_yuv)
    pil_frame = Image.fromarray(Y_channel)
    input_tensor = transformer(pil_frame)
    return input_tensor.unsqueeze(0)

def infer_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frame_predictions = []
    start_time = time.time()
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        input_tensor = preprocess_frame(frame)
        with torch.no_grad():
            output = model(input_tensor.to(device))
            predicted = output.argmax(dim=1).item()
            frame_predictions.append(predicted)
    
    cap.release()
    
    if not frame_predictions:
        return "Unknown", time.time() - start_time
    
    final_prediction = Counter(frame_predictions).most_common(1)[0][0]
    inference_time = time.time() - start_time
    
    return CLASS_MAPPING.get(final_prediction, "Unknown"), inference_time

@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files['video']
    temp_video_path = "temp_video.mp4"
    video_file.save(temp_video_path)
    
    prediction, inference_time = infer_video(temp_video_path)
    os.remove(temp_video_path)
    
    return jsonify({
        "predicted_class": prediction,
        "inference_time": inference_time
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
