import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Authcontext = createContext();

const Authstate = (props) => {
  const [isAuthorised, setisAuthorised] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const Login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
        email: email,
        password: password,
      });
      console.log(response);
      const token = response.data.authToken;
      if (token) {
        localStorage.setItem("authToken", token);
        setisAuthorised(true);
        setAlertMessage("Login successful!");
        setAlertType("success");
        navigate("/");
      }
    } catch (error) {
      console.log("error:", error.message);
      setAlertMessage("Login failed. Please check your credentials.");
      setAlertType("danger");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setisAuthorised(true);
    }
  }, []);

  const Logout = () => {
    try {
      localStorage.removeItem("authToken");
      setisAuthorised(false);
      setAlertMessage("You have logged out successfully.");
      setAlertType("info");
      navigate("/");
    } catch (error) {
      console.log("error:", error.message);
      setAlertMessage("Logout failed.");
      setAlertType("danger");
    }
  };

  const Signup = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/signup", {
        name: name,
        email: email,
        password: password,
      });

      console.log(response);
      const token = response.data.authToken;
      if (token) {
        localStorage.setItem("authToken", token);
        setisAuthorised(true);
        setAlertMessage("Sign Up successful!");
        setAlertType("success");
        navigate("/");
      }
    } catch (error) {
        setAlertMessage("Sign Up failed. Please try again later.");
        setAlertType("danger");
    }
  };
  return (
    <Authcontext.Provider
      value={{
        Login,
        isAuthorised,
        Logout,
        setAlertMessage,
        alertMessage,
        alertType,
        Signup,
        setAlertType,
      }}
    >
      {props.children}
    </Authcontext.Provider>
  );
};

export { Authcontext, Authstate };
