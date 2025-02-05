import { useState } from "react";
import { useRouter } from 'next/router'
import { useRequestEngine } from '@/contexts/requestEngineContext'; 
import CryptoJS from 'crypto-js';
import { Button, HStack } from "@chakra-ui/react"

export default function Home() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const router = useRouter()
  const requestEngine = useRequestEngine();

  function handleLoginClick() {
    setLogin(true);
  }

  function handleRegisterClick() {
    setRegister(true);
  }

  async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;
    const passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const userData = {
      mail: mail,
      password: passwordHash
    }

    await requestEngine.login(userData)
    .then((response) => {
        console.log(response);
        if(response.status === 401) {
          alert('Email or password not valide');
        }
        else{
          router.push("/menu");
        }
    });
  }

  function handleRegisterFormSubmit(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;
    const passwordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const userData = {
      mail: mail,
      password: passwordHash
    }

    requestEngine.addUser(userData)
    .then((response) => {
        console.log(response);
        if(response === 201) {
            alert('User added successfully');
            setRegister(false);
        }
        if(response === 200) {
          alert('User with this mail already exist !');
      }
    });
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
        <HStack>
        <Button onClick={handleLoginClick}>
          Login
        </Button>
        <Button onClick={handleRegisterClick}>
          Register
        </Button>
        </HStack>
      </div>
      )}

    </div>
  );
}
