import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        email: '',
        password:'',
    });

    function handleSubmit (e) {
        e.preventDefault();
        login();
        console.log(formState);
    }

    function handleChange(e) {
        const changedFieldName = e.target.name;


        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        })
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
          <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="email"

          />
          <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="wachtwoord"
          />
        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;