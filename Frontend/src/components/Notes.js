import React, { useContext, useEffect } from "react";
import Notecontext from "../context/context";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

function Notes() {
  const { notes, getnotes } = useContext(Notecontext);

  useEffect(() => {
    getnotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <>
      <div className="row">
        <Addnote />
        <h2>Your Notes</h2>
        {notes.length === 0 && <span className="mx-1">No Notes Available</span>}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
