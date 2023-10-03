const express = require("express")
const router = express.Router()
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "./uploads/")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "- " + file.originalname)
    },
})

const fileFilter = (req, file, cb) =>{
    const allowedfileTypes = /jpeg|jpg|png/
    const extname = allowedfileTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedfileTypes.test(file.mimetype)
    
    if(extname && mimetype){
        cb(null, true);
    }
    else{
        cb(new Error("invalid file type "),false);
    }
};


const upload = multer({
    storage:storage,
    limit:{
        filesize:25 * 1024 *1024 ,
    },
    fileFilter:fileFilter,
})



const {addProduct, getProduct, getallProduct, updateProduct, deleteProduct} = require("../Controller/Products")
router.post("/addProduct", upload.single(
    "Image"
),addProduct);
router.get("/getProduct/:productId", getProduct);
router.post("/getallProduct", getallProduct);
router.post("/updateProduct",upload.single(
    "Image"
), updateProduct);
router.delete("/deleteProduct", deleteProduct);





module.exports = router;