import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const { login } = useContext(AuthContext);
    const [formState, setFormState] = useState({
        email: '',
        password:'',
    });

    async function handleSubmit (e) {
        e.preventDefault();
        console.log(formState);
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/login', {
                email: formState.email,
                password: formState.password,
            }, {
                headers: {
                    'novi-education-project-id': '2767c1c3-13ff-45b7-a2b7-6870077651b3'
                }
            });
            // console.log(response);
            login(response.data);
        } catch(e) {
            console.error(e);
        }
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