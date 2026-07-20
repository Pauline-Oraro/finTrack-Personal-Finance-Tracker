import express, { Application } from "express";

const app: Application = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TS + Express");

});

app.listen(PORT, () => {
    console.log(`Server is running onnnn http://localhost:${PORT}`);
});