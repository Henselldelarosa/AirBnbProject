import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'
import DemoUser from '../Demo/DemoUser';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  return (
    <div className='loginBody'>

    <form className='login_form'onSubmit={handleSubmit}>
      <img className='login_logo'src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt=''/>
      <h1>Login Form</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <div className='username_email'>
        Username or Email
        </div>
        <input
          type="text"
          className="input-box"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <div className='passWord'>
        Password
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='login_buton'type="submit">Log In</button>
      <DemoUser/>
    </form>
    </div>
  );
}

export default LoginFormPage;
