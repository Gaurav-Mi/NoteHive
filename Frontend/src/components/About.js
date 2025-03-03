import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container my-4">
      <h2 className="text-center">About NoteHive</h2>
      <p className="text-center mb-4">
        NoteHive is your ultimate tool for organizing and managing your notes.
        Whether it's for work, personal tasks, or creative ideas, NoteHive keeps
        everything neatly organized.
      </p>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              What is NoteHive?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              NoteHive is a platform designed to help you create, store, and
              manage notes. It provides a user-friendly interface with features
              that make organizing your thoughts and tasks a breeze.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How do I use NoteHive?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Simply <span><Link to="/login">log in</Link></span> or <span><Link to="/signup">Sign Up</Link></span> to a new account, and you can start creating new
              notes, organizing them into categories, and editing or deleting
              them as needed.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Is NoteHive secure?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Yes, NoteHive uses industry-standard encryption and security
              practices to keep your notes safe and protected.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
