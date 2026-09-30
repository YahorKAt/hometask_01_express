import type {Resolution} from "../types/video";

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions: Array<Resolution>,
}

export type UpdateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions: Array<Resolution>,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: string,
}