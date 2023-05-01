import express from "express";
import cors from "cors";

const apiKey = process.env.OPENWEATHER_APIKEY;
const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).send("Weather app server is running");
});

app.post("/weather", (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((weatherData) => res.status(200).send(weatherData))
        .catch((err) => res.status(400).json(err));
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
