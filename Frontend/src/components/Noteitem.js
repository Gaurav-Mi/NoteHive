import React, { useContext, useState } from "react";
import Notecontext from "../context/context";
import { Authcontext } from "../context/Authcontext";

function Noteitem({ note }) {
  const { deleteNote, editNote } = useContext(Notecontext);
  const [newTitle, setNewtitle] = useState(note.title);
  const [newDescription, setnewDescription] = useState(note.description);
  const [newTag, setNewTag] = useState(note.tag);
  const [isEditing, setIsEditing] = useState(false);
  const { setAlertMessage, setAlertType } = useContext(Authcontext);

  const handleDelete = () => {
    deleteNote(note._id);
    setAlertMessage("Note Deleted!!!");
    setAlertType("danger");
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editNote(note._id, newTitle, newDescription, newTag);
    setIsEditing(false);
    setAlertMessage("Note Updated!!!");
    setAlertType("info");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewtitle(note.title);
    setnewDescription(note.description);
    setNewTag(note.tag);
  };
  return (
    <>
      <div className="col-sm-3 my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewtitle(e.target.value)}
                />
                <textarea
                  className="form-control mt-2"
                  value={newDescription}
                  onChange={(e) => setnewDescription(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <div className="mt-2 d-flex justify-content-between">
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <small>
                  <b>Tag</b>:{note.tag}
                </small>
                <div className="mt-3 d-flex justify-content-between">
                  <i class="fa-solid fa-trash" onClick={handleDelete}></i>
                  <i class="fa-solid fa-file-pen" onClick={handleEdit}></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Noteitem;
