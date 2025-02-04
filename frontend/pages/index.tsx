import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  function handleLoginClick() {
    setLogin(true);
  }

  function handleRegisterClick() {
    setRegister(true);
  }

  function handleLoginFormSubmit() {
     //connexion logic 
     setLogin(false);
  }

  function handleRegisterFormSubmit() {
    //register logic 
    setRegister(false);
 }

  return (
    <div>
      {login &&(
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleRegisterFormSubmit}>
          <label>Mail : <input type="text" name="mail" /></label>
          <label>Password : <input type="text" name="password" /></label>
          <input type="submit" name="Submit" />
        </form>
      </div>
      )}

      {register &&(
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleLoginFormSubmit}>
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
