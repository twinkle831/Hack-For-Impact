import React, { useRef, useState } from "react";
import axios from "axios";

function AIVideoConsultation() {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [careerAdvice, setCareerAdvice] = useState("");
    const [videoBlob, setVideoBlob] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoRef.current.srcObject = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);

            let chunks = [];
            mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                setVideoBlob(blob);
            };

            mediaRecorderRef.current.start();
            setRecording(true);

            setTimeout(() => stopRecording(), 60000); // Auto-stop after 1 min
        } catch (error) {
            console.error("Error accessing camera", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
    };

    const uploadVideo = async () => {
        if (!videoBlob) return alert("No recorded video");

        const formData = new FormData();
        formData.append("video", videoBlob, "video.webm");

        try {
            const response = await axios.post("http://localhost:5000/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setCareerAdvice(response.data.careerSuggestions);
        } catch (error) {
            console.error("Upload error", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>AI Career Guidance</h1>
            <video ref={videoRef} autoPlay muted style={{ width: "500px", border: "2px solid black" }}></video>
            <div style={{ margin: "20px" }}>
                {!recording ? (
                    <button onClick={startRecording} style={{ padding: "10px 20px", fontSize: "16px" }}>Start Recording</button>
                ) : (
                    <button onClick={stopRecording} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "red" }}>Stop Recording</button>
                )}
            </div>
            <button onClick={uploadVideo} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "green" }}>Analyze Career</button>
            {careerAdvice && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray" }}>
                    <h2>Career Suggestions:</h2>
                    <p>{careerAdvice}</p>
                </div>
            )}
        </div>
    );
}

export default AIVideoConsultation;

