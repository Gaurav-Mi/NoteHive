import { useState } from "react";
import Notecontext from "./context";

const host = process.env.REACT_APP_HOST;

const Notestate = (props) => {
  const [notes, setNotes] = useState([]);

  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/v1/notes/allnotes`, {
        method: "get",
        headers: {
          "Content-Type": "application/json", // For JSON data
          "auth-token": `${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNotes = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/v1/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (response.ok) {
        const data = await response.json();

        setNotes((prevNotes) => {
          return [...prevNotes, data.data];
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/v1/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => note._id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/v1/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const data = await response.json();

        setNotes((prevNotes) => {
          return prevNotes.map((note) =>
            note._id === id ? { ...note, ...data.data } : note
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Notecontext.Provider
      value={{ notes, addNotes, setNotes, deleteNote, editNote, getnotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
