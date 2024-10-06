import express from "express";
import {addProduct, deleteProduct, getProducts, updateProduct} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.put("/:id", updateProduct);

router.post("/", addProduct);

router.delete("/:id", deleteProduct);


export default router;