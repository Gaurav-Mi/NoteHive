import React, {useContext, useState} from "react";
import { Authcontext } from "../context/Authcontext";

function SignUp() {
  const { Signup } = useContext(Authcontext);
  const [credential, setcredential] = useState({ name: "", email: "", password:""})
  const handleSignup = (e) => {
   e.preventDefault();
    Signup(credential.name, credential.email, credential.password)
    setcredential({ name: "", email:"", password:"" })
  }
  return (
    <div className="container my-3">
      <form onSubmit={handleSignup}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            name="name"
            value={credential.name}
            onChange={(e) => {
              setcredential({ ...credential, name: e.target.value });
            }}
            required
            
          />
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={(e) => {
              setcredential({ ...credential, email: e.target.value });
            }}
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credential.password}
            onChange={(e) => {
              setcredential({ ...credential, password: e.target.value });
            }}
            required
            minLength={6}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
