import express from "express";
import {setupApp} from "../src/setupApp";

const app = express();
setupApp(app);

// ВАЖНО: НЕ вызывай app.listen() здесь!
// Vercel сам запустит сервер

export default app;