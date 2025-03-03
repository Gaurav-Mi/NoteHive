const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
   },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now},
});

const notesModel = mongoose.model("Notes", NoteSchema);

module.exports = notesModel;
