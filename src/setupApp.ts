import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {testingRouter} from "./testing/routers/testing.router";
import {videosRouter} from "./videos/routers/videos.router";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("Hello world!");
    });

    app.use('/testing', testingRouter);
    app.use('/videos', videosRouter);

    return app;
};