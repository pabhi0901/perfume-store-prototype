import cardModel from "../models/card.model.js"

const saveCardData = async(req,res)=>{

    const {imageUrl,title,description,flavour,category,price} = req.body
    
     if (!imageUrl || !category) {
      return res.status(400).json({ message: "imageUrl and category are required" });
    }

    const card = await cardModel.create({
        imageUrl,title,description,flavour,category,price
    })


    res.status(200).json({
        "mess":"Data saved successfully",
        card
    })

}
const getCardData = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);
    

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const data = await cardModel.find({ category });

    if (data.length === 0) {
      return res.status(404).json({ message: "No cards found for this category" });
    }

    return res.status(200).json({
      message: "Here is your data",
      data,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export default {saveCardData,getCardData}