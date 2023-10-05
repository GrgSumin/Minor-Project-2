const mongoose =require ("monoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
		required: true,
    },
    cartItems:[{
        productId:{
				type: mongoose.Schema.Types.ObjectId,
                ref:"Product",

        },
        Quantity:{
            type:Number,
            required:true,
        },
        Image:{
            type:String,
            required:true
        }
    }],
    orderDate:{
        type:Date,
        default:Date.now(),
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    expectedTime:{
        type:Date,
        default:Date.now(),
    },
    status:{
        type:String,
        default:"unpaod"
    }
});
let collectionname = "Order";
module.exports = mongoose.model(collectionname,orderSchema)