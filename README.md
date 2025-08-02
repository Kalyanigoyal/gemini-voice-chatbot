# Revolt Voice Chatbot

Replicates Revolt Motors' voice assistant using Gemini API with live speech input/output.

## ✅ Features

- Voice input using browser's Web Speech API
- Gemini 1.5 model response with TTS output
- Interruptions supported via `speechSynthesis.cancel()`
- Built with Node.js/Express backend

## 🚀 How to Run

1. Clone the repo or extract the ZIP.
2. Replace your Gemini API key in `.env`
3. Install backend dependencies:

```bash
cd backend
npm install express cors dotenv axios
node index.js
```

4. Open `frontend/index.html` in your browser (use Live Server if needed)

## 📦 Stack

- Node.js + Express
- Vanilla JS + Web Speech API
- Gemini API

## 📽️ Demo Requirements

- Show conversation flow
- Interrupt mid-speech
- Fast response turnaround (1–2 seconds)
