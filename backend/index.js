const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const geminiRouter = require("./routes/gemini");

dotenv.config();
console.log("🔑 Loaded API KEY:", process.env.GEMINI_API_KEY);
console.log("🧠 Loaded MODEL:", process.env.MODEL_NAME);

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/api/gemini", geminiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
