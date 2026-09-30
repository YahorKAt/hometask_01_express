import {Router, Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {createErrorMessages} from "../../core/utils/error.utils";
import {db} from "../../db/in-memory.db";
import type {CreateVideoInputModel, UpdateVideoInputModel} from "../dto/video.input.dto";
import type {Video} from "../types/video";
import {validateCreateVideoInputDto, validateUpdateVideoInputDto} from "../validation/video-input-dto.validation";

export const videosRouter = Router({})

videosRouter
    .get('', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send(db.videos);
    })

    .get('/:id', (req: Request<{ id: number }>, res: Response) => {
        const video = db.videos.find((video) => video.id === +req.params.id);
        if (!video) {
            res.status(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.Ok).send(video);
    })

    .post('', (req: Request<{}, {}, CreateVideoInputModel>, res: Response) => {
        const errors = validateCreateVideoInputDto(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

        const lastVideo = db.videos[db.videos.length - 1]

        const newVideo: Video = {
            id: lastVideo ? lastVideo.id + 1 : 1,
            author: req.body.author,
            title: req.body.author,
            availableResolutions: req.body.availableResolutions,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            minAgeRestriction: null,
            canBeDownloaded: false,
        }

        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    })

    .put('/:id', (req: Request<{ id: number }, {}, UpdateVideoInputModel>, res: Response) => {
        const index = db.videos.findIndex(video => video.id === +req.params.id);

        if (index === -1) {
            res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'Driver not found'}]));
            return;
        }

        const errors = validateUpdateVideoInputDto(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }


        db.videos[index] = {...db.videos[index], ...req.body};
        res.status(HttpStatus.NoContent)
    })

    .delete('/:id', (req: Request<{ id: number }>, res: Response) => {
        const index = db.videos.findIndex(video => video.id === +req.params.id);
        if (index === -1) {
            res.status(HttpStatus.NotFound);
            return
        }

        db.videos.splice(index, 1);
        res.status(HttpStatus.NoContent)
    })