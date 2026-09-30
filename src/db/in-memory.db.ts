import {Resolution, type Video} from "../videos/types/video";

export const db: { videos: Video[] } = {
    videos: [{
        id: 1,
        title: "Test Video",
        author: "Test Author",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2026-09-30T12:45:00.000Z",
        publicationDate: "2026-10-01T12:45:00.000Z",
        availableResolutions: [Resolution.P1440, Resolution.P240]
    }]
};

