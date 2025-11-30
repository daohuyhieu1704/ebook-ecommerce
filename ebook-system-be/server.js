import dotenv from "dotenv";
import app from "./src/app.js";
import HttpResponse from "./src/utils/HttpResponse.js";

const { config } = dotenv;

config();
const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.setTimeout(0);

// Ctrl+C to stop the server
process.on("SIGINT", () => {
  server.close(() => console.log("Server has been stopped."));
});
