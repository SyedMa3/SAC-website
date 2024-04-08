const express = require("express");
const router = express.Router();

const {
    fetchExpense_AttachmentbyExpense_id, Insert_expense_attachment, edit_Attachment,deleteExpense_attachmentByExpense_id , 
    deleteAttachmentById
} = require("../controllers/expense_attachment.controllers");

const {
    isLoggedIn, authRole
} = require("../controllers/auth.controllers");

//routes for fetching all announcements and announcement by id
router.route("/:id").get(fetchExpense_AttachmentbyExpense_id, isLoggedIn);
router.route("/createExpressAttachment").get(Insert_expense_attachment, isLoggedIn, authRole(["Admin", "Club Head", "Secretary"]));
router.route("/updateExpenseAttachment").get(edit_Attachment, isLoggedIn, authRole(["Admin", "Club Head", "Secretary"]));
router.route("/delete/:expense_id").get(deleteExpense_attachmentByExpense_id, isLoggedIn, authRole(["Admin", "Club Head", "Secretary"]));
router.route("/delete/:id").get(deleteAttachmentById, isLoggedIn, authRole(["Admin", "Club Head", "Secretary"]));

module.exports = router;