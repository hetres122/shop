import express from 'express';
import {check, sanitizeBody, validationResult} from "express-validator";

export namespace productValidations {
    const currencies: Array<string> = ['EUR', 'PLN', 'USD'];
    const categories: Array<string> = ['flowerpot', 'vases', 'mirrors', 'candles', 'glasses'];

    export const addValidators: Array<any> = [
        check('currency')
            .trim()
            .isIn(currencies)
            .withMessage('Invalid currency')
            .optional(),
        check('price')
            .trim()
            .not().isEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be numeric'),
        check('name')
            .trim()
            .not().isEmpty()
            .withMessage('Name is required')
            .isLength({min: 3, max: 20})
            .withMessage('Name must be at least 3 characters long and less than 20 characters'),
        check('category')
            .trim()
            .not().isEmpty()
            .withMessage('Category is required')
            .isLowercase()
            .isIn(categories)
            .withMessage('Invalid category'),
        check('description')
            .trim()
            .not().isEmpty()
            .withMessage('Description is required')
            .isLength({min: 3, max: 200})
            .withMessage('Description must be at least 3 characters long and less than 200 characters'),
        check('image')
            .not().isEmpty()
            .withMessage('Image is required')
    ];

    export function checkAddValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                success: false,
                data: req.body,
                errors: errors.mapped()
            });
        }
        next();
    }
}