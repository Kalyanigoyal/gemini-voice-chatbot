const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/message", async (req, res) => {
  const { textPrompt } = req.body;

  if (!textPrompt) {
    return res.status(400).json({ error: "Missing text prompt." });
  }

  console.log("Received prompt:", textPrompt);
try {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/${process.env.MODEL_NAME}:streamGenerateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are a helpful assistant from Revolt Motors. Only discuss topics related to Revolt bikes and services. " +
                    "Now answer this user query: " + textPrompt,
            },
          ],
        },
      ]
    }
  );

  // ✅ Log the full Gemini response
  console.log("Gemini raw response:", JSON.stringify(response.data, null, 2));

  res.json(response.data);
} catch (error) {
  console.error("Gemini API error:");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else {
    console.error("Message:", error.message);
  }
  res.status(500).json({ error: "Failed to communicate with Gemini." });
}

});

module.exports = router;
