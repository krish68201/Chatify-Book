// Register.js
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db , auth , storage} from "../firebase";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate ,Link } from 'react-router-dom';


const Register = () => {
  const [error, setError] = useState(false); //to check error 
  const navigate=useNavigate(); //after register to navigate on home page

  const handleSubmit = async (event) =>{
    event.preventDefault();  //to avoid refreshing
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);  //using firebase for creating authentication

      const storageRef = ref(storage, displayName);  //to store image of the person
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         (err) => {
        setError(true);   //if error 
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {  //downloadURL is the url of that photo
          await updateProfile(res.user , {
            displayName,
            photoURL: downloadURL
          });
          await setDoc(doc(db, "users", res.user.uid), {  //creating a database named users and storing following data
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });

            await setDoc(doc(db , "userChats" , res.user.uid) , {});  // cresting database named userChats and it is empty for now

            navigate("/");  //if authentication created navigate to home page

        });
      }
      );

    } catch (err) {
      setError(true);
    }
  };
  
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'> CHATIFY BOOK</span>
        <span className='title'> REGISTER</span>
        <form onSubmit={handleSubmit}> 
          <input type='text' placeholder='Display Name' />
          <input type='email' placeholder='Email Address' />
          <input type='password' placeholder='Password' />
          <input style={{display: "none"}} type='file' id='file' />
          <label htmlFor='file'>
            <img src='data:image/png;base64,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' alt='Avatar placeholder' />
            <span> Add an Avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span> Click Again</span>}
        </form>
        <p>Already Registered?<Link to="/login"> Login </Link></p>
      </div>
    </div>
  );
}

export default Register;
