import express from "express"
import cardController from "../controller/cardData.controller.js"
const router = express.Router()

router.post("/saveData",cardController.saveCardData)
router.get("/getData",cardController.getCardData)



export default router 