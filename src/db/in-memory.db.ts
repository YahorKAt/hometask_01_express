import {Resolution, type Video} from "../videos/types/video";

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Tom Rider',
            author: "Egor",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [Resolution.P240, Resolution.P720, Resolution.P1440]
        },
        {
            id: 2,
            title: 'Mikimaus',
            author: "Abba",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
            availableResolutions: [Resolution.P240, Resolution.P720, Resolution.P1440]
        }
    ]
}