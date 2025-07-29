const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    addExpense,
    getAllExpenses,
    downloadExpenseExcel,
    deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add",protect, addExpense);
router.get("/get",protect, getAllExpenses);
router.get("/downloadexcel",protect, downloadExpenseExcel);
router.delete("/:id",protect, deleteExpense);

module.exports = router;