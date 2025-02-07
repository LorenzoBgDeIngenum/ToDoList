import React, { useState } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button, HStack } from "@chakra-ui/react";

import { useRequestEngine } from '@/contexts/requestEngineContext';
import { useUser } from "@/contexts/userContext";
import { User } from "@/models/user";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const router = useRouter();
  const requestEngine = useRequestEngine();
  const { user, setUser } = useUser();

  function handleLoginClick() {
    setLogin(true);
  }

  function handleRegisterClick() {
    setRegister(true);
  }

  function loginUser(userData) {
    const userToSet: User = {
      id: userData.id,
      mail: userData.mail,
      password: userData.password,
    };
    setUser(userToSet); 
    router.push("/list");
  }

  async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    const userData = {
      mail: mail,
      password: password
    };

    try {
      const response = await requestEngine.login(userData); 
      const data = response; 
      if (response.status === 401) {
        alert("Email or password not valid");
      } else {
        loginUser(data);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong during login.");
    }
  }

  function handleRegisterFormSubmit(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    const userData = {
      mail: mail,
      password: password
    };

    requestEngine.addUser(userData)
      .then((response) => {
        if (response === 201) {
          alert("User added successfully");
          setRegister(false);
        }
        if (response === 200) {
          alert("User with this mail already exists!");
        }
      });
  }

  function handleLogout() {
    setUser(null); 
  }

  return (
    <div>
      <Head>
        <title>To Do List Maker</title>
      </Head>
      {user ? ( 
          <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          {login && (
            <div className="login">
              <h2>Login</h2>
              <form onSubmit={handleLoginFormSubmit}>
                <label>Mail: <input type="text" name="mail" /></label>
                <label>Password: <input type="password" name="password" /></label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          )}

          {register && (
            <div className="register">
              <h2>Register</h2>
              <form onSubmit={handleRegisterFormSubmit}>
                <label>Mail: <input type="text" name="mail" /></label>
                <label>Password: <input type="password" name="password" /></label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          )}

          {!login && !register && (
            <div className="login">
              <HStack>
                <Button onClick={handleLoginClick}>Login</Button>
                <Button onClick={handleRegisterClick}>Register</Button>
              </HStack>
            </div>
          )}
        </>
      )}
    </div>
  );
}
