const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//Add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const { category, amount, date, icon } = req.body;
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newExpense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

//Get all expenses
exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Download excel
exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user.id;
    try {
        const expenses = await Expense.find();
        const data = expenses.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: new Date(item.date).toLocaleDateString("en-GB"),
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

