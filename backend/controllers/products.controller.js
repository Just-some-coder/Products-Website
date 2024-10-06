import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success : true, message : products});
    }catch (err){
        res.status(500).json({success : false, message : "Server Error"});
    }
}

export const updateProduct = async (req, res)=>{
    const {id} = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({
            success : false,
            message : "No Products Found"
        })
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({
            success : true,
            message : updatedProduct
        })
    }catch (err){
        res.status(500).json({
            success : false,
            message : "Server Error"
        })
    }
}

export const addProduct = async (req,res)=> {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image){
        res.status(400).json({success : false, message : "Please Provide all fields" });
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(200).json({success:true, data:newProduct});
    }catch (err){

        console.error("Error in product creation : ", err.message);
        res.send(500).json({success : false, message : "Server Error"});
    }
}

export const deleteProduct = async (req, res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({
            success : false,
            message : "No Products Found"
        })
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message : "Product has been deleted"})
    }catch (err){
        res.status(500).json({success : false, message : "Server Error"})
    }
}