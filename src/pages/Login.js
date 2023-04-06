import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);  //firebase method for authentication
      navigate("/")  //if currect navigate to home page
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">CHATIFY  BOOK</span>
        <span className="title">   Sign In    </span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
          {err && <span className="incorrect">Incorrect Details</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>

        
      </div>
    </div>
  );
};

export default Login;