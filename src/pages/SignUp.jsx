import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        userName: '',
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const changedFieldName = e.target.name;


        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        })
    }

   async function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
        try {
            const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/users', {
                email: `${formState.email}`,
                password: `${formState.password}`,
                roles: [
                    'user'
                ],
            }, {
                headers: {
                    'novi-education-project-id' : '2767c1c3-13ff-45b7-a2b7-6870077651b3',
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            setFormState(response.data);
            navigate('/signin');
        } catch (e) {
            console.error(e);
        }

    }


    return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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

          <input
              type="text"
              name="userName"
              value={formState.userName}
              onChange={handleChange}
              placeholder="gebruikersnaam"
          />
          <button type="submit">
              Verzenden
          </button>

      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;