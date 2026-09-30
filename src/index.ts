import express from "express";
import { setupApp } from "./setup-app";

// создание приложения
const app = express();
setupApp(app);

// порт приложения
const PORT = process.env.PORT;
if (!PORT) {
    console.error('PORT environment variable is not set');
    process.exit(1);
}
// запуск приложения
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});