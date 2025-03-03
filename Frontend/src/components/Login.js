import React, { useContext, useState } from 'react';
import { Authcontext } from '../context/Authcontext';

function Login(){
    const { Login } = useContext(Authcontext);
    const [credential, setcredential] = useState({email:"", password:""});
    const handlLogin = (e) => {
        e.preventDefault();
        Login(credential.email, credential.password)
         setcredential({ email: "", password: "" });
    }
    
    return (
      <div className="container my-3">
        <form onSubmit={handlLogin}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={(e) => {
                setcredential({ ...credential, email: e.target.value });
              }}
                        value={credential.email}
                        required
            />
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
              onChange={(e) => {
                setcredential({ ...credential, password: e.target.value });
              }}
                        value={credential.password}
                        required
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
}

export default Login
