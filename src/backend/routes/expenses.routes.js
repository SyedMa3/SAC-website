const express = require("express");
const router = express.Router();

const {
    fetchAllExpense, fetchExpensebyClubID, deleteExpenseById , deleteExpenseByClub_Id , Insert_expense, edit_expense
} = require("../controllers/expense.controllers");

const {
  isLoggedIn, authRole
} = require("../controllers/auth.controllers");

//routes for fetching all announcements and announcement by id
router.route("/").get(fetchAllExpense, isLoggedIn);
router.route("/club_id").get(fetchExpensebyClubID, isLoggedIn,);
router.route("/delete/:id").get(deleteExpenseById, isLoggedIn, authRole(["Admin","Club Head", "Secretary"]));
router.route("/delete/:club_id").get(deleteExpenseByClub_Id, isLoggedIn, authRole(["Admin","Club Head", "Secretary"]));
router.route("/expenseCreate").get(Insert_expense, isLoggedIn, authRole(["Admin","Club Head", "Secretary"]));
router.route("/expenseUpdate").get(edit_expense, isLoggedIn, authRole(["Admin","Club Head", "Secretary"]));
module.exports = router;