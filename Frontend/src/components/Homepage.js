import React, { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import Notes from "./Notes";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { isAuthorised } = useContext(Authcontext);

  return (
    <>
      {isAuthorised ? (
        <div className="container my-2">
          <Notes />
        </div>
      ) : (
        <div className="px-4 pt-5 my-5 text-center border-bottom">
          <h1 className="display-4 fw-bold text-body-emphasis">
            Welcome to NoteHive
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              NoteHive is your personal space to create, manage, and keep track
              of all your important notes. Whether you're organizing tasks,
              ideas, or reminders, NoteHive makes it easy to stay on top of your
              work.
            </p>
            <p className="lead mb-4">
              Join our community and start taking control of your notes. Log in
              or sign up to get started!
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
              <Link
                type="button"
                className="btn btn-primary btn-lg px-4 me-sm-3"
                to="/login"
              >
                Login
              </Link>
              <Link
                type="button"
                className="btn btn-outline-success btn-lg px-4"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
            <div className="container px-5">
              <img
                src="NoteHive.png"
                className="img-fluid border rounded-3 shadow-lg mb-4 "
                alt="NoteHive"
                width="50"
                loading="lazy"
              />
              <footer className="text-center mt-4">
                <p>
                  © {new Date().getFullYear()} NoteHive(Gaurav Mishra). All rights
                  reserved.
                </p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
