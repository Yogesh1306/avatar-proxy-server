import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("Url is required");
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"];
    res.setHeader("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
