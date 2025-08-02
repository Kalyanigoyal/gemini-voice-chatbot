const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");

let recognition;
let isRecognizing = false;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.continuous = false;
} else {
  alert("Speech Recognition not supported in this browser.");
}

startBtn.onclick = () => {
  if (!recognition || isRecognizing) return;
  status.textContent = "Listening...";
  recognition.start();
  isRecognizing = true;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    status.textContent = "You said: " + transcript;

    const response = await fetch("http://localhost:3000/api/gemini/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textPrompt: transcript }),
    });

    const data = await response.json();
    console.log("Gemini API raw reply:", data);

    let reply = "";
    if (Array.isArray(data)) {
      data.forEach((chunk) => {
        const part = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
        if (part) reply += part;
      });
    }

    if (reply) {
      const utterance = new SpeechSynthesisUtterance(reply);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
      status.textContent = "Bot: " + reply;
    } else {
      status.textContent = "No reply from Gemini.";
    }
  };

  recognition.onerror = (event) => {
    status.textContent = "Speech error: " + event.error;
    isRecognizing = false;
  };

  recognition.onend = () => {
    status.textContent += " (Recognition ended)";
    isRecognizing = false;
  };
};

stopBtn.onclick = () => {
  if (recognition && isRecognizing) {
    recognition.stop();
    isRecognizing = false;
  }
  speechSynthesis.cancel(); // 🛑 stop voice immediately
  status.textContent = "Stopped listening and speaking.";
};


