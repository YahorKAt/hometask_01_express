import type { ValidationError } from "../../core/types/validation-error";
import type { CreateVideoInputModel, UpdateVideoInputModel } from "../dto/video.input.dto";
import { Resolution } from "../types/video";

// Вспомогательная функция для строк
const isInvalidString = (value: unknown, min: number, max: number): boolean => {
    return typeof value !== "string" || value.trim().length < min || value.trim().length > max;
};

// Проверка валидности значения Resolution
const isValidResolution = (value: unknown): boolean => {
    return Object.values(Resolution).includes(value as Resolution);
};

// Проверка валидности даты (ISO-строка)
const isValidDateTime = (value: unknown): boolean => {
    if (typeof value !== "string") return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
};

// Валидация для CREATE
export const validateCreateVideoInputDto = (data: CreateVideoInputModel): ValidationError[] => {
    const errors: ValidationError[] = [];

    // title: string, maxlength 40
    if (isInvalidString(data.title, 1, 40)) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }

    // author: string, maxlength 20
    if (isInvalidString(data.author, 1, 20)) {
        errors.push({ message: 'Invalid author', field: 'author' });
    }

    // availableResolutions: массив, минимум 1 элемент, только валидные enum значения
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
    } else if (data.availableResolutions.length < 1) {
        errors.push({
            message: 'Invalid availableResolutions, at least one resolution should be added',
            field: 'availableResolutions'
        });
    } else {
        const invalidResolutions = data.availableResolutions.filter(r => !isValidResolution(r));
        if (invalidResolutions.length > 0) {
            errors.push({
                message: 'Invalid availableResolutions, must be one of: P144, P240, P360, P480, P720, P1080, P1440, P2160',
                field: 'availableResolutions'
            });
        }
    }

    return errors;
};

// Валидация для UPDATE
export const validateUpdateVideoInputDto = (data: UpdateVideoInputModel): ValidationError[] => {
    const errors: ValidationError[] = [];

    // title: string, maxlength 40
    if (isInvalidString(data.title, 1, 40)) {
        errors.push({ message: 'Invalid title', field: 'title' });
    }

    // author: string, maxlength 20
    if (isInvalidString(data.author, 1, 20)) {
        errors.push({ message: 'Invalid author', field: 'author' });
    }

    // availableResolutions: массив, минимум 1 элемент, только валидные enum значения
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
    } else if (data.availableResolutions.length < 1) {
        errors.push({
            message: 'Invalid availableResolutions, at least one resolution should be added',
            field: 'availableResolutions'
        });
    } else {
        const invalidResolutions = data.availableResolutions.filter(r => !isValidResolution(r));
        if (invalidResolutions.length > 0) {
            errors.push({
                message: 'Invalid availableResolutions, must be one of: P144, P240, P360, P480, P720, P1080, P1440, P2160',
                field: 'availableResolutions'
            });
        }
    }

    // canBeDownloaded: boolean
    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ message: 'Invalid canBeDownloaded, must be boolean', field: 'canBeDownloaded' });
    }

    // minAgeRestriction: integer от 1 до 18, либо null (no restriction)
    if (data.minAgeRestriction !== null) {
        if (
            typeof data.minAgeRestriction !== 'number' ||
            !Number.isInteger(data.minAgeRestriction) ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18
        ) {
            errors.push({
                message: 'Invalid minAgeRestriction, must be integer from 1 to 18 or null',
                field: 'minAgeRestriction'
            });
        }
    }

    // publicationDate: string($date-time) — валидная ISO-дата
    if (!isValidDateTime(data.publicationDate)) {
        errors.push({ message: 'Invalid publicationDate, must be valid date-time string', field: 'publicationDate' });
    }

    return errors;
};