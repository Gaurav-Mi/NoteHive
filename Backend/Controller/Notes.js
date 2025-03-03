const notesModel = require("../Model/Notes");
const { body, validationResult, header } = require("express-validator");

async function getAllNotes(req, res) {
  try {
    const notes = await notesModel.find({ user: req.user.ID });
    res.status(200).json(notes);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).send("Error while fetchin notes, Internal Server Error!!!");
  }
}

async function addNote(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, tag } = req.body;

    const newNote = new notesModel({
      title,
      description,
      tag,
      user: req.user.ID,
    });

    newNote.save();
    res.status(201).json({ data: newNote, message: "success" });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).send("Error while adding note, Internal Server Error!!!");
  }
}

const validateAddNote = [
  body("title").notEmpty().withMessage("title is required"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("description must be at least 6 characters long"),
];

async function updateNote(req, res) {
  try {
    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.send("Note Not Found!");
    }

    if (note.user.toString() !== req.user.ID) {
      return res.status(401).send("Unauthorized: No user information");
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update",
      });
    }

    const { title, description, tag } = req.body;

    const updateNote = {};

    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (tag) {
      updateNote.tag = tag;
    }

    const noteUpdate = await notesModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true }
    );

    console.log(updateNote);
    res
      .status(200)
      .json({ data: noteUpdate, message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteNote(req, res) {
  try {
    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.send("Note Not Found!");
    }

    if (note.user.toString() !== req.user.ID) {
      return res.status(401).send("Unauthorized: No user information");
    }

    const deletedNote = await notesModel.findByIdAndDelete(req.params.id);

    console.log(updateNote);
    res
      .status(200)
      .json({ data: deletedNote, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllNotes,
  addNote,
  validateAddNote,
  updateNote,
  deleteNote,
};
