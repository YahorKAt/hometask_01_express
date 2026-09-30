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
        res.status(HttpStatus.Ok).json(db.videos);
    })

    .get('/:id', (req: Request<{ id: string }>, res: Response) => {
        const video = db.videos.find((video) => video.id === +req.params.id);
        if (!video) {
            return res.sendStatus(HttpStatus.NotFound);
        }
        res.status(HttpStatus.Ok).json(video);
    })

    .post('', (req: Request<{}, {}, CreateVideoInputModel>, res: Response) => {
        const errors = validateCreateVideoInputDto(req.body);

        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
        }

        const lastVideo = db.videos[db.videos.length - 1]

        const newVideo: Video = {
            id: lastVideo ? lastVideo.id + 1 : 1,
            author: req.body.author,
            title: req.body.title,
            availableResolutions: req.body.availableResolutions,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            minAgeRestriction: null,
            canBeDownloaded: false,
        }

        db.videos.push(newVideo);
        res.status(HttpStatus.Created).json(newVideo);
    })

    .put('/:id', (req: Request<{ id: string }, {}, UpdateVideoInputModel>, res: Response) => {
        const index = db.videos.findIndex(video => video.id === +req.params.id);

        if (index === -1) {
            return res.status(HttpStatus.NotFound).json(createErrorMessages([{field: 'id', message: 'Video not found'}]));
        }

        const errors = validateUpdateVideoInputDto(req.body);

        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
        }


        db.videos[index] = {...db.videos[index], ...req.body};
        res.sendStatus(HttpStatus.NoContent)
    })

    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const index = db.videos.findIndex(video => video.id === +req.params.id);
        if (index === -1) {
            return res.sendStatus(HttpStatus.NotFound);

        }
        db.videos.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent)
    })