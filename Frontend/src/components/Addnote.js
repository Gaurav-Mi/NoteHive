import React, { useContext, useState } from "react";
import Notecontext from "../context/context";
import { Authcontext } from "../context/Authcontext";

export default function Addnote({ key }) {
  const { addNotes } = useContext(Notecontext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { setAlertMessage, setAlertType } = useContext(Authcontext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };
  const handleAddnote = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    setAlertMessage("Note Added!!!");
    setAlertType("success");
  };

  return (
    <>
      <div className="container my-2">
        <h2>Add Note</h2>
        <form onSubmit={handleAddnote}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              name="title"
              onChange={handleChange}
              value={note.title}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              name="description"
              onChange={handleChange}
              value={note.description}
              required
              minLength={5}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
              value={note.tag}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
