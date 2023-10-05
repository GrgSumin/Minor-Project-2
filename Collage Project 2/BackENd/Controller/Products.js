const { default: mongoose } = require("mongoose");
const Product = require("../model/Product");
const fs = require("fs").promises;
const path = require("path");
const slugify = require("slugify");//URL-friendly version of a string, often used in URLs to represent the title of a resource.


const addProduct = async (req,res) => {
    try{
        if(req.body.Title){
            req.body.slug = slugify(req.body.Title);
        }
        console.log(req.body);
        if(!req.file){
            return res.status(200).json({message:"Please upload valid file"})
        }
        const {Title, Brand,Category,Price,Quantity,Image,Description}= req.body;

        const newProduct = new Product({
            title:Title,
            Brand,
            Category,
            Price,
            Quantity,
            Description,
            Image:req.file.filename,
        })

        await newProduct.save();

        res.status(200).json({
            message:"product added sucessfully",
        });

    }
    catch (error){
        console.log(error);
        res.status(500).json({
            error: "Internal issue"
        });
    }
};

const getProduct = async (req, res)=>{
    try{

        const productId = req.params.productId
        if(!productId){
            return res.status(400).json({messae: 'Product Id should be define'})
        }
        
        const product = await Product.findById(productId)
        if(!product){
            return res.status(400).json({message: "Product not found!"})
        }
        return res.json(product)
    } catch(error){
        return res.status(400).json({message: error.message})
    }
}
const getallProduct = async (req,res) =>{
    try{
        return res.json(await Product.find())
    } catch(err){
        return res.status(400).json({message: err.message})
    }
}
const updateProduct = async (req, res) => {
    const productId = req.body.productId
    const updates = req.body.updates

    try {

        res.status(200).json(await Product.findByIdAndUpdate(productId, updates, {new: true}))
    } catch(error){
        console.log(error)
        res.status(500).json({message:"There is an issues"})
    }
   
}

const deleteProduct = async(req,res)=>{
    try{

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"product has been deleted"}) 
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {addProduct,getProduct,getallProduct,updateProduct,deleteProduct};