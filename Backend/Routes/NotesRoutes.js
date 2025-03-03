const {
  getAllNotes,
  addNote,
  validateAddNote,
  updateNote,
  deleteNote,
} = require("../Controller/Notes");
const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

router.route("/allnotes").get(fetchUser, getAllNotes);
router.route("/addnote").post(fetchUser, validateAddNote, addNote);
router.route("/updatenote/:id").put(fetchUser, updateNote);
router.route("/deletenote/:id").delete(fetchUser, deleteNote);

module.exports = router;
