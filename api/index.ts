import express from "express";
import {setupApp} from "../src/setup-app";

const app = express();
setupApp(app);

// ВАЖНО: НЕ вызывай app.listen() здесь!
// Vercel сам запускает сервер

export default app;