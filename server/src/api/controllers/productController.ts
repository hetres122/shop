import express from 'express';
import IProduct from "../../models/IProduct";
import ProductService from "../../services/ProductService";

export namespace productController {
    export async function getAllProducts(req: express.Request, res: express.Response): Promise<express.Response<any>> {
        try {
            const response: Array<IProduct> = await ProductService.getAllProducts();

            if (!response) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Not Found"
                });
            }

            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            })
        }
    }

    export async function getProduct(req: express.Request, res: express.Response): Promise<express.Response<any>> {
        try {
            const {id} = req.params;
            const response: IProduct = await ProductService.getProduct(id);

            if (!response) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Not Found"
                });
            }

            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            });
        }
    }

    export async function createProduct(req: express.Request, res: express.Response): Promise<express.Response<any>> {
        try {
            const {name, price, category, description, image, currency} = req.body;

            const isGood: boolean = [name, price, category, description, image].every(value => !!value);

            if (isGood) {
                const response: IProduct = await ProductService.addProduct({
                    name,
                    price,
                    category,
                    description,
                    image,
                    currency
                });

                if (!response) {
                    return res.status(404).send({
                        success: false,
                        status: 404,
                        message: 'Product not found'
                    })
                }

                return res.status(200).send(response);
            }

            return res.status(400).send({
                success: false,
                status: 400,
                message: 'Invalid request'
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            });

        }
    }

    export async function deleteProduct(req: express.Request, res: express.Response): Promise<express.Response<any>> {
        try {
            const {id} = req.params;

            const response: IProduct = await ProductService.deleteProduct(id);

            if (!response) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Not Found"
                });
            }

            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({
                success: false,
                error
            });
        }
    }
}
