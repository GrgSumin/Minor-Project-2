const { json } = require("express");
const Brand = require("../model/Brand");
// const validateMongoDbId = require("../Utils/ValidateMongoDbid")




const createBrand = async(req,res)=>{
    try{
        const newBrand = await Brand.create(req.body);
        res.status(200).json(newBrand)
        res.status(200).json("created sucessfully");
    }
    catch(error){
        console.log(error)
    }
}
const updateBrand = async(req,res)=>{
    const BrandId = req.body.BrandId
    const updates = req.body.updates

    try {

       res.status(200).json(await Brand.findByIdAndUpdate(BrandId, updates, {new: true}))
       
    } catch(error){
        console.log(error)
        res.status(500).json({message:"There is an issues"})
    }
   
}
const deleteBrand = async (req, res) => {
    const BrandId = req.body.BrandId
    

    try {

        res.status(200).json({message:"deleted sucesfully"})
        res.status(200).json(await Brand.findByIdAndDelete(BrandId,{new: true}))
    } catch(error){
        console.log(error)
        res.status(500).json({message:"There is an issues"})
    }
   
}
const getBrand = async (req, res)=>{
    try{

        const BrandId = req.params.BrandId
        if(!BrandId){
            return res.status(400).json({message: 'Brand Id should be define'})
        }
        
        const getBrand = await Brand.findById(BrandId)
        if(!Brand){
            return res.status(400).json({message: "Brand not found!"})
        }
        return res.json(getBrand)
    } 
    catch(error){
        return res.status(400).json({message: error.message})
    }
}
const getallBrands = async (req, res)=>{
    try{
        const allBrand = await Brand.find()
        res.json(allBrand)
    }
    catch(error){
        console.log(error)
    }
}



module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getallBrands};