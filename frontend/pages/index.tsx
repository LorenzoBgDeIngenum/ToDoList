import { useState } from "react";
import { useRouter } from 'next/router'

export default function Home() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const router = useRouter()

  function handleLoginClick() {
    setLogin(true);
  }

  function handleRegisterClick() {
    setRegister(true);
  }

  function handleLoginFormSubmit() {
     setLogin(false);
     //connexion logic 
     //if ok
     router.push('/menu');
     //if not ok
  }

  function handleRegisterFormSubmit() {
    //register logic 
    setRegister(false);
 }

  return (
    <div>
      {login &&(
      <div className="register">
        <h2>Login</h2>
        <form onSubmit={handleLoginFormSubmit}>
          <label>Mail : <input type="text" name="mail" /></label>
          <label>Password : <input type="text" name="password" /></label>
          <input type="submit" name="Submit" />
        </form>
      </div>
      )}

      {register &&(
      <div className="login">
        <h2>Register</h2>
        <form onSubmit={handleRegisterFormSubmit}>
          <label>Mail : <input type="text" name="mail" /></label>
          <label>Password : <input type="text" name="password" /></label>
          <input type="submit" name="Submit" />
        </form>
      </div>
      )}

      {!login && !register &&(
      <div className="login">
        <button onClick={handleLoginClick}>
          Login
        </button>
        <button onClick={handleRegisterClick}>
          Register
        </button>
      </div>
      )}

    </div>
  );
}
