const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    addIncome,
    getAllIncomes,
    downloadIncomeExcel,
    deleteIncome
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/add",protect, addIncome);
router.get("/get",protect, getAllIncomes);
router.get("/downloadexcel",protect, downloadIncomeExcel);  
router.delete("/:id",protect, deleteIncome);

module.exports = router;