import express, {Express, Request, Response} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {db} from "./db/in-memory.db";
import {testingRouter} from "./testing/routers/testing.router";
import {videosRouter} from "./videos/routers/videos.router";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("Hello world!");
    });

    // app.use('/testing', testingRouter);
    app.use('/videos', videosRouter);


    app.delete("/testing/all-data", (req: Request, res: Response) => {
        db.videos = []
        res.sendStatus(HttpStatus.NoContent)
    });

    return app;
};