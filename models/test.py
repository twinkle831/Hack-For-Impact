import requests

url = " http://127.0.0.1:5000/predict"
file_path = "models\Abuse001_x264.mp4"

with open(file_path, "rb") as f:
    files = {"video": f}
    response = requests.post(url, files=files)

print(response.json())
