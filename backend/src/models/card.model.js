import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String
    },
    flavour:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number
    }
})

const cardModel = mongoose.model("Cards",cardSchema)

export default cardModel