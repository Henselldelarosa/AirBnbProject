// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history= useHistory()
  const [firstName, setFirstName]=useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser){
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email,password, username,firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          console.log(data.errors)
          const err = []
          if (data && data.errors){
            for(let error in data.errors){

              err.push(data.errors[error])
            }
            setErrors([err])
          };
        });
      }
      return setErrors(['Confirm Password field must be the same as the Password field']);

        // return <Redirect to="/" />
  };

  return (
    <div className='signup_body'>
    <form className='signup_form'onSubmit={handleSubmit}>
      <img className='signup_logo'src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt=''/>
      <h1 >New User</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <div>
        Email
        </div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
      <div>
        Password
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <div>
          Confirm Password
        </div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </label>
        <label>
          <div>Username</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
      <div>
        First Name
      </div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
         </label>
             <label>
             <div>
              Last Name
             </div>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

      </label>

      <button className='signup_button' type="submit">Sign Up</button>

      <button className='signup_button'type="submit">Sign Up</button>

    </form>
    </div>
  );
}

export default SignupFormPage;
